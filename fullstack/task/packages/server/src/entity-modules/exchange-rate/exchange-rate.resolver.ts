import { Query, Resolver } from '@nestjs/graphql';
import { ExchangeRate } from '../../entities/exchange-rate.entity';
import { ExchangeRateService } from './exchange-rate.service';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => [ExchangeRate])
    async exchangeRates(): Promise<ExchangeRate[]> {
        return await this.exchangeRateService.getExchangeRates();
    }
}
