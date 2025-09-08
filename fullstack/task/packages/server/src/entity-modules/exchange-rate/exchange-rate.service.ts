import { Injectable } from '@nestjs/common';
import { ExchangeRate } from '../../entities';

@Injectable()
export class ExchangeRateService {

    // TODO: replace with real dat fetch
    public getExchangeRates = async (): Promise<ExchangeRate[]> => {
        const currentDate = new Date();
        const validForDate = new Date();
        
        const mockRates: ExchangeRate[] = [
            {
                id: '70434563-a16b-454a-bfd4-d9d03300d771',
                country: 'USA',
                currency: 'dollar',
                amount: 1,
                currencyCode: 'USD',
                rate: 23.45,
                validFor: validForDate,
                fetchedAt: currentDate,
                createdAtUtc: new Date(),
                updatedAtUtc: new Date(),
                version: 1
            },
            {
                id: '57b18801-153f-4fc5-9007-f3bc041bbc0f',
                country: 'EMU',
                currency: 'euro',
                amount: 1,
                currencyCode: 'EUR',
                rate: 25.67,
                validFor: validForDate,
                fetchedAt: currentDate,
                createdAtUtc: new Date(),
                updatedAtUtc: new Date(),
                version: 1
            },
           
        ];

        console.log("MOCK RATES", mockRates)

        return mockRates;
    };
}
