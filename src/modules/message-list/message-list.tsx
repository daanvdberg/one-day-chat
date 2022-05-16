import React from 'react';
import { useQuery } from '@apollo/client';
import { LATEST_MESSAGES } from './graphql/fetch-latest-messages';
import { Channel, UserId } from '../../globalContext';
import Message from '../message/message';

type MessageListProps = {
    id: Channel
}

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
    channelId: string;
}

function MessageList({ id }: MessageListProps) {

    const { loading, error, data } = useQuery<MessageListData, MessageListVars>(LATEST_MESSAGES, {
        variables: { channelId: Channel[id] },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div>
            {data && data.MessagesFetchLatest.map(message => (
                <Message key={message.messageId} message={message} />
            ))}
        </div>
    );
}

export default MessageList;
