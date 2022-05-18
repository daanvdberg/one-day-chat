/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { LATEST_MESSAGES } from './graphql/fetch-latest-messages';
import Message from '../message/message';
import { ChannelId, UserId } from '../../types/global-types';
import { FETCH_MORE_MESSAGES } from './graphql/fetch-more-messages';
import { useGlobalState } from '../../store';
import { Button } from '../../components/button/button';
import { FaArrowUp } from 'react-icons/fa';
import { createStyles } from '../../types/emotion-styles';
import variables from '../../assets/css/style-variables';

const styles = createStyles({
    messageList: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        minHeight: '100%'
    },
    loadingMessage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        color: variables.textColorSecondary
    },
    errorMessage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        color: variables.errorColor
    },
    button: {
        display: 'flex',
        margin: '15px auto'
    }
});

export interface IMessage {
    messageId: string;
    text: string;
    datetime: string;
    userId: UserId;
}

interface MessageListData {
    MessagesFetchLatest: IMessage[];
}

interface MessageListVars {
    channelId: ChannelId;
}

interface MoreMessagesListData {
    MessagesFetchMore: IMessage[];
}

interface MoreMessagesListVars {
    channelId: ChannelId;
    messageId: string;
    old: boolean
}

function MessageList() {

    const { messageList, loadingMessage, errorMessage, button } = styles;

    const { state: { channel = ChannelId.General, messages = [], failedMessages = [] }, setState } = useGlobalState();
    const [resultIsEmpty, setResultIsEmpty] = useState(false);

    const { loading, error } = useQuery<MessageListData, MessageListVars>(LATEST_MESSAGES, {
        variables: { channelId: ChannelId[channel] },
        onCompleted: (data) => {
            if (data && data.MessagesFetchLatest) {
                setState((prev) =>
                    ({ ...prev, messages: data.MessagesFetchLatest.slice().reverse(), requestPending: false }));
            }
        }
    });

    const [ getMoreMessages, { loading: loadingFM, error: errorFM }] = useLazyQuery<MoreMessagesListData, MoreMessagesListVars>(FETCH_MORE_MESSAGES);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        getMoreMessages({
            variables: {
                channelId: channel,
                messageId: messages[0].messageId,
                old: true
            },
            onCompleted: (data) => {
                if (data && data.MessagesFetchMore) {
                    setState((prev) => ({
                        ...prev,
                        messages: [...data.MessagesFetchMore.slice().reverse(), ...(prev.messages || [])],
                        requestPending: false
                    }));
                    if (data.MessagesFetchMore.length < 10) {
                        setResultIsEmpty(true);
                    }
                }
            }
        });
    }

    useEffect(() => {
        if (loading || loadingFM) {
            setState((prev) => ({ ...prev, requestPending: true }));
        }
    }, [loading, loadingFM])

    if (loading) return <div css={loadingMessage}>Loading...</div>;
    if (error) return <div css={errorMessage}>Something went wrong. Please refresh the page.</div>;

    return (
        <div css={messageList}>
            {(!resultIsEmpty && messages.length >= 10) ? (
                <Button
                    onClick={handleClick}
                    icon={<FaArrowUp />}
                    css={button}
                >
                    Read More
                </Button>
            ) : null}

            {messages.map(message => <Message key={message.messageId} message={message} />)}

            {failedMessages.map(message => <Message key={message.messageId} message={message} failed={true} />)}

        </div>
    );
}

export default MessageList;
