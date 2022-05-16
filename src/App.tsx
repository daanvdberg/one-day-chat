/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, Global } from '@emotion/react'
import { createStyles } from './types/emotion-styles';
import Chat from './modules/chat/chat';
import Settings from './modules/settings/settings';

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
            <Global
                styles={css`
                    body {
                        margin: 0;
                        padding: 0;
                        min-height: 100vh;
                        max-width: 100vw;
                        font-family: 'Source Sans Pro', sans-serif;
                    }
                    h1,h2,h3,h4,h5,h6 {
                        font-family: 'Montserrat', sans-serif;
                        font-weight: bold;
                    }
                `}
            />
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
