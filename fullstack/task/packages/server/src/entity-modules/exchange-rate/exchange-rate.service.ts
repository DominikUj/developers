import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { PaginationInfo, PaginationInput } from '../../common/dto';
import { Locale } from '../../common/dto/language.enum';
import { ExchangeRate } from '../../entities/exchange-rate.entity';
import { InternalLocale } from '../../utils/languageCodeMap';
import { PaginatedExchangeRatesResponse } from './dto/paginated-exchange-rates.response';
import { exRateDailyRestResponseSchema } from './schemas/rate';

@Injectable()
export class ExchangeRateService {
    private readonly CACHE_TTL_MINUTES = 5;
    private readonly CNB_API_URL = process.env.CNB_API_URL || '';

    constructor(
        @InjectRepository(ExchangeRate)
        private readonly exchangeRateRepository: Repository<ExchangeRate>
    ) {}

    public getExchangeRates = async (language: Locale): Promise<ExchangeRate[]> => {
        await this.syncWithCNB();

        return this.exchangeRateRepository.find({
            where: { language },
            order: { currencyCode: 'ASC' },
        });
    };

    public getPaginatedExchangeRates = async (
        paginationInput: PaginationInput,
        locale: InternalLocale
    ): Promise<PaginatedExchangeRatesResponse> => {
        const { limit = 10, offset = 0 } = paginationInput;

        await this.syncWithCNB();

        const items = await this.exchangeRateRepository.find({
            order: { currencyCode: 'ASC' },
            take: limit,
            skip: offset,
            where: {
                language: locale as Locale,
            },
        });

        const paginationInfo: PaginationInfo = {
            totalCount: items.length,
            count: items.length,
            offset,
            limit,
            hasMore: offset + items.length < items.length,
        };

        return {
            items,
            pagination: paginationInfo,
        };
    };

    private async syncWithCNB() {
        try {
            const cachedRates = await this.exchangeRateRepository.find({
                order: { currencyCode: 'ASC' },
            });

            const now = new Date();
            const isValidCache =
                cachedRates.length > 0 &&
                cachedRates.some((rate) => {
                    const ageInMinutes = (now.getTime() - rate.fetchedAt.getTime()) / (1000 * 60);
                    return ageInMinutes < this.CACHE_TTL_MINUTES;
                });

            if (isValidCache) {
                return;
            }

            const [enResponse, csResponse] = await Promise.all([
                axios.get(`${this.CNB_API_URL}?lang=EN`),
                axios.get(`${this.CNB_API_URL}?lang=CZ`),
            ]);

            const rates: ExchangeRate[] = [];
            const fetchedAt = new Date();

            if (enResponse.data.rates && Array.isArray(enResponse.data.rates)) {
                const parseResult = exRateDailyRestResponseSchema.safeParse(enResponse.data);
                if (parseResult.success) {
                    parseResult.data.rates.forEach((rate) => {
                        const newRate = this.exchangeRateRepository.create({
                            ...rate,
                            language: Locale.EN,
                            fetchedAt,
                            updatedAtUtc: fetchedAt.toISOString(),
                            createdAtUtc: fetchedAt.toISOString(),
                        });
                        rates.push(newRate);
                    });
                }
            }

            if (csResponse.data.rates && Array.isArray(csResponse.data.rates)) {
                const parseResult = exRateDailyRestResponseSchema.safeParse(csResponse.data);
                if (parseResult.success) {
                    parseResult.data.rates.forEach((rate) => {
                        const newRate = this.exchangeRateRepository.create({
                            ...rate,
                            language: Locale.CS,
                            fetchedAt,
                            updatedAtUtc: fetchedAt.toISOString(),
                            createdAtUtc: fetchedAt.toISOString(),
                        });
                        rates.push(newRate);
                    });
                }
            }

            if (rates.length > 0) {
                await this.exchangeRateRepository.clear();
                await this.exchangeRateRepository.save(rates);
            }

            return;
        } catch (error) {
            console.error('Failed to fetch exchange rates from CNB API:', error);
            throw new Error('Failed to fetch exchange rates');
        }
    }
}
