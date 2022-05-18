/** @jsxImportSource @emotion/react */
import React from 'react';
import { ChannelId } from '../../../types/global-types';
import styled from '@emotion/styled';
import variables from '../../../assets/css/style-variables';
import { useGlobalState } from '../../../store';

function getChannelName (id: ChannelId) {
    switch (id) {
        case ChannelId.General:
            return 'General Channel';
        case ChannelId.Technology:
            return 'Technology Channel';
        case ChannelId.LGTM:
            return 'LGTM Channel';
        default:
            return 'Channel Name';
    }
}

const ChannelNameWrapper = styled.h1`
  margin: 0;
  padding: 25px 15px;
  font-size: 18px;
  border-bottom: 1px solid ${variables.borderColor};
`;

export const ChannelName = () => {
    const { state: { channel = ChannelId.General } } = useGlobalState();
    return <ChannelNameWrapper>{getChannelName(channel)}</ChannelNameWrapper>;
};