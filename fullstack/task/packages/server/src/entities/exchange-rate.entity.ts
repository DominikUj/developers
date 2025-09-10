import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber, IsPositive, IsString } from 'class-validator';
import { Column, Entity, Unique } from 'typeorm';
import { EntityWithMeta } from '../common/entities/entity-with-meta';
import { Locale } from '../common';
import { VAR_CHAR } from './constants';

@ObjectType()
@Entity()
@Unique(['currencyCode', 'validFor', 'language'])
export class ExchangeRate extends EntityWithMeta {
    @IsString()
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public country!: string;

    @IsString()
    @Field(() => String)
    @Column({ ...VAR_CHAR })
    public currency!: string;

    @IsNumber()
    @IsPositive()
    @Field(() => Int)
    @Column({ type: 'int' })
    public amount!: number;

    @IsString()
    @Field(() => String)
    @Column({ type: 'char', length: 3 })
    public currencyCode!: string;

    @IsNumber()
    @Field(() => Float)
    @Column({ type: 'decimal', precision: 10, scale: 6 })
    public rate!: number;

    @IsDate()
    @Field(() => Date)
    @Column({ type: 'date' })
    public validFor!: Date;

    @IsDate()
    @Field(() => Date)
    @Column({ type: 'timestamptz' })
    public fetchedAt!: Date;

    @IsString()
    @Field(() => Locale)
    @Column({ type: 'char', length: 2, default: Locale.EN })
    public language!: Locale;
}
