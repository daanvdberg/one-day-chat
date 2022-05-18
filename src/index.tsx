import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from "@apollo/client";
import client from './graphql/client';
import { GlobalStateProvider } from './store';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <GlobalStateProvider>
                <App/>
            </GlobalStateProvider>
        </ApolloProvider>
    </React.StrictMode>
);
