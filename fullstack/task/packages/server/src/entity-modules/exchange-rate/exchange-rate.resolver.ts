import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '../../common/dto';
import { Locale } from '../../common/dto/language.enum';
import { PaginatedExchangeRatesResponse } from './dto/paginated-exchange-rates.response';
import { ExchangeRateService } from './exchange-rate.service';

@Resolver()
export class ExchangeRateResolver {
    constructor(private readonly exchangeRateService: ExchangeRateService) {}

    @Query(() => PaginatedExchangeRatesResponse)
    async paginatedExchangeRates(
        @Args('pagination', { type: () => PaginationInput, nullable: true })
        pagination: PaginationInput = {},
        @Args('locale', { type: () => Locale, nullable: true })
        language: Locale = Locale.EN
    ): Promise<PaginatedExchangeRatesResponse> {
        return this.exchangeRateService.getPaginatedExchangeRates(pagination, language);
    }
}
