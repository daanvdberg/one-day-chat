import { css } from '@emotion/react';
import variables from './style-variables';

export default css`
    body {
        margin: 0;
        padding: 0;
        min-height: 100vh;
        max-width: 100vw;
        font-family: 'Source Sans Pro', sans-serif;
        color: ${variables.textColorPrimary};
        background-color: ${variables.backgroundColor};
    }
    h1,h2,h3,h4,h5,h6 {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }
`