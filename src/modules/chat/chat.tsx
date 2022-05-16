/** @jsxImportSource @emotion/react */
import React from 'react';
import { createStyles } from '../../types/emotion-styles';
import MessageList from '../message-list/message-list';
import ChatForm from '../chat-form/chat-form';
import { GlobalState, GlobalStateInterface, Channel } from '../../globalContext';
import styled from '@emotion/styled';
import variables from '../../assets/css/style-variables';

const styles = createStyles({
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        overflowY: 'scroll',
        height: '100%'
    },
    list: {
        flex: 1
    },
    form: {
        height: '100px',
        flexShrink: 1
    }
});

function getChannelName (id: Channel) {
    switch (id) {
        case Channel.General:
            return 'General Channel';
        case Channel.Technology:
            return 'Technology Channel';
        case Channel.LGTM:
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

type ChannelNameProps = {
    id: Channel
}

const ChannelName = ({ id }: ChannelNameProps) => {
    return <ChannelNameWrapper>{getChannelName(id)}</ChannelNameWrapper>;
};

function Chat() {

    const { chatContainer, list, form } = styles;

    const { channel } = React.useContext(GlobalState) as GlobalStateInterface;

    return (
        <div css={chatContainer}>
            <div>
                <ChannelName id={channel} />
            </div>
            <div css={list}>
                <MessageList id={channel} />
            </div>
            <div css={form}>
                <ChatForm />
            </div>
        </div>
    );
}

export default Chat;
