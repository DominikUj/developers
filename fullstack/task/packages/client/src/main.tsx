import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import App from './App';
import './style.css';
import { RouterProvider } from 'react-router';
import router from './routing/Router';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router} />           
        </ApolloProvider>
    </React.StrictMode>
);
