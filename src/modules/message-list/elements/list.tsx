import React from 'react';
import { IMessage } from '../message-list';
import { FailedMessage } from '../../../store';
import Message from '../../message/message';

type MessageProps = {
    messages: Array<IMessage | FailedMessage>
}

export const List = React.memo<MessageProps>(({ messages }) => {
    return (
        <div>
            {messages.map((message) => (
                <Message key={message.messageId} message={message} />
            ))}
        </div>
    );
});