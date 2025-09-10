import { registerEnumType } from '@nestjs/graphql';

export enum Locale {
    EN = 'en',
    CS = 'cs',
}

registerEnumType(Locale, {
    name: 'Locale',
    description: 'Supported languages for exchange rates',
});
