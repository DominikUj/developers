import { ObjectType } from '@nestjs/graphql';
import { ExchangeRate } from '../../../entities/exchange-rate.entity';
import { PaginatedResponse } from '../../../common/dto/paginated.response';

@ObjectType()
export class PaginatedExchangeRatesResponse extends PaginatedResponse(ExchangeRate) {}
