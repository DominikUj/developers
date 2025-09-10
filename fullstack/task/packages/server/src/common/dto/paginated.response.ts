import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
    @Field(() => Int, { description: 'Total number of items' })
    totalCount!: number;

    @Field(() => Int, { description: 'Number of items returned in this response' })
    count!: number;

    @Field(() => Int, { description: 'Current offset' })
    offset!: number;

    @Field(() => Int, { description: 'Current limit' })
    limit!: number;

    @Field(() => Boolean, { description: 'Whether there are more items available' })
    hasMore!: boolean;
}

export function PaginatedResponse<T>(ItemType: new () => T) {
    @ObjectType({ isAbstract: true })
    abstract class PaginatedResponseClass {
        @Field(() => [ItemType], { description: 'List of items' })
        items!: T[];

        @Field(() => PaginationInfo, { description: 'Pagination information' })
        pagination!: PaginationInfo;
    }
    return PaginatedResponseClass;
}
