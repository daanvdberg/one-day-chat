/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from 'react';
import { createStyles } from '../../types/emotion-styles';
import MessageList from '../message-list/message-list';
import ChatForm from '../chat-form/chat-form';
import { useGlobalState } from '../../store';
import { ChannelName } from '../chat-form/elements/channel-name';

const styles = createStyles({
    chatContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    channelName: {
        height: '73px'
    },
    list: {
        flex: 1,
        overflowX: 'hidden',
        overflowY: 'scroll'
    },
    form: {
        minHeight: '74px',
        flexShrink: 1
    }
});

function Chat() {

    const listRef = useRef<HTMLDivElement | null>(null);

    const { chatContainer, channelName, list, form } = styles;

    const { state: { messages, failedMessages } } = useGlobalState();

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages, failedMessages]);

    return (
        <div css={chatContainer}>
            <div css={channelName}>
                <ChannelName />
            </div>
            <div css={list} ref={listRef}>
                <MessageList />
            </div>
            <div css={form}>
                <ChatForm />
            </div>
        </div>
    );
}

export default Chat;
