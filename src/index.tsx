import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from "@apollo/client";
import client from './graphql/client';
import StateProvider from './globalContext';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <StateProvider>
                <App/>
            </StateProvider>
        </ApolloProvider>
    </React.StrictMode>
);
