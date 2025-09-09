import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './routing/Router';
import './style.css';
import ThemeContext from './context/ThemeContext';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ThemeContext.ContextProvider>
                <RouterProvider router={router} />
            </ThemeContext.ContextProvider>
        </ApolloProvider>
    </React.StrictMode>
);
