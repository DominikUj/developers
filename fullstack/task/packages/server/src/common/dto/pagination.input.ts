import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsPositive, Max, Min } from 'class-validator';

@InputType()
export class PaginationInput {
    @Field(() => Int, { nullable: true, description: 'Number of items to return (max 100)' })
    @IsOptional()
    @IsPositive()
    @Max(100)
    limit?: number = 10;

    @Field(() => Int, { nullable: true, description: 'Number of items to skip' })
    @IsOptional()
    @Min(0)
    offset?: number = 0;
}
