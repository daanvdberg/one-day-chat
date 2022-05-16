import React from 'react';
import { IMessage } from '../message-list/message-list';

type MessageProps = {
    message: IMessage
}

function Message({ message }: MessageProps) {
    return (
        <div>
            {message.text}
        </div>
    );
}

export default Message;
