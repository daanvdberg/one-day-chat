/** @jsxImportSource @emotion/react */
import React from 'react';
import 'normalize.css';
import { Global } from '@emotion/react'
import { createStyles } from './types/emotion-styles';
import Chat from './modules/chat/chat';
import Settings from './modules/settings/settings';
import GlobalStyles from './assets/css/global-styles';

const styles = createStyles({
    container: {
        display: 'flex',
        overflow: 'hidden'
    },
    sidebar: {
        height: '100vh',
        flexBasis: 300,
    },
    main: {
        flex: 1,
        height: '100vh'
    }
});

function App() {

    const { container, sidebar, main } = styles;

    return (
        <div css={container}>
            <Global styles={GlobalStyles}/>
            <div css={sidebar}>
                <Settings />
            </div>
            <div css={main}>
                <Chat />
            </div>
        </div>
    );
}

export default App;
