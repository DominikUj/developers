import { Args, Query, Resolver } from '@nestjs/graphql';
import { ExchangeRate } from '../../entities/exchange-rate.entity';
import { PaginationInput } from '../../common/dto';
import { ExchangeRateService } from './exchange-rate.service';
import { PaginatedExchangeRatesResponse } from './dto/paginated-exchange-rates.response';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => [ExchangeRate])
    async exchangeRates(): Promise<ExchangeRate[]> {
        return this.exchangeRateService.getExchangeRates();
    }

    @Query(() => PaginatedExchangeRatesResponse)
    async paginatedExchangeRates(
        @Args('pagination', { type: () => PaginationInput, nullable: true })
        pagination: PaginationInput = {}
    ): Promise<PaginatedExchangeRatesResponse> {
        return this.exchangeRateService.getPaginatedExchangeRates(pagination);
    }
}
