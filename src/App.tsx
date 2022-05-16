/** @jsxImportSource @emotion/react */
import React from 'react';
import { css, Global } from '@emotion/react'
import { createStyles } from './types/emotion-styles';

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
    return (
        <div css={styles.container}>
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
            <div css={styles.sidebar}>
                Settings
            </div>
            <div css={styles.main}>
                Chat
            </div>
        </div>
    );
}

export default App;
