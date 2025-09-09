import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { exRateDailyRestResponseSchema } from './schemas/rate';
import { ExchangeRate } from '../../entities/exchange-rate.entity';

@Injectable()
export class ExchangeRateService {
    private readonly CACHE_TTL_MINUTES = 1;
    private readonly CNB_API_URL = 'https://api.cnb.cz/cnbapi/exrates/daily';

    constructor(
        @InjectRepository(ExchangeRate)
        private readonly exchangeRateRepository: Repository<ExchangeRate>,
    ) {}

    public getExchangeRates = async (): Promise<ExchangeRate[]> => {
        const cachedRates = await this.exchangeRateRepository.find({
            order: { currencyCode: 'ASC' }
        });

        const now = new Date();
        const isValidCache = cachedRates.length > 0 && 
            cachedRates.some(rate => {
                const ageInMinutes = (now.getTime() - rate.fetchedAt.getTime()) / (1000 * 60);
                return ageInMinutes < this.CACHE_TTL_MINUTES;
            });

        if (isValidCache) {
            console.log('Returning cached exchange rates');
            return cachedRates;
        }

        const freshRates = await this.fetchFromCNBApi();
        
        await this.exchangeRateRepository.clear();
        await this.exchangeRateRepository.save(freshRates);
        
        console.log('Returning fresh exchange rates from CNB API');
        return freshRates;
    };

    private async fetchFromCNBApi(): Promise<ExchangeRate[]> {
        try {
            const response = await axios.get(this.CNB_API_URL);
            const apiData = response.data;
            
            if (!apiData.rates || !Array.isArray(apiData.rates)) {
                throw new Error('Invalid API response format');
            }

            const currentDate = new Date();
            const rates: ExchangeRate[] = [];

            const parseResult = exRateDailyRestResponseSchema.safeParse(apiData)
            if(parseResult.error) {
                console.error('Schema validation error:', parseResult.error);
                throw new Error('Invalid API response schema');
            }

            const validatedRates = parseResult.data;
            const fetchedAt = new Date()

            validatedRates.rates.forEach(async (rate) => {
                const _rate = await this.exchangeRateRepository.create({...rate, fetchedAt, updatedAtUtc: fetchedAt.toISOString(), createdAtUtc: fetchedAt.toISOString() });
                rates.push(_rate);
            })


            return rates;
        } catch (error) {
            console.error('Failed to fetch exchange rates from CNB API:', error);
            throw new Error('Failed to fetch exchange rates');
        }
    }

}
