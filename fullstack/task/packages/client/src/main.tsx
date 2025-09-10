import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import ThemeContext from './context/ThemeContext';
import router from './routing/Router';
import './style.css';
import ExchangeRatesContext from './context/ExchangeRatesContext';
import LocalizationContext from './context/LocalizationContext';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            ExchangeRate: {
                keyFields: ['id'],
            },
        },
    }),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <LocalizationContext.ContextProvider>
                <ThemeContext.ContextProvider>
                    <ExchangeRatesContext.ContextProvider>
                        <RouterProvider router={router} />
                    </ExchangeRatesContext.ContextProvider>
                </ThemeContext.ContextProvider>
            </LocalizationContext.ContextProvider>
        </ApolloProvider>
    </React.StrictMode>
);
