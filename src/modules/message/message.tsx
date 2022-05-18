/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { createStyles } from '../../types/emotion-styles';
import { IMessage } from '../message-list/message-list';
import { FailedMessage, useGlobalState } from '../../store';
import variables from '../../assets/css/style-variables';
import styled from '@emotion/styled';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

type MessageContainerProps = {
    current: boolean
}

export const MessageContainer = styled.div<MessageContainerProps>`
    display: flex;
    flex-direction: ${props => props.current ? 'row-reverse' : 'row'};
    text-align: ${props => props.current ? 'right' : 'left'};
    padding: 15px;
`;

type MessageBodyProps = {
    current: boolean
}

export const MessageBody = styled.div<MessageBodyProps>`
    position: relative;
    padding: 10px 15px;
    min-width: 160px;
    max-width: calc(100% - 254px);
    margin: ${props => props.current ? '0 20px 0 15px' : '0 15px 0 20px'};;
    font-size: 20px;
    background-color: #fff;
    border-radius: 4px;
    &::after {
        position: absolute;
        right: ${props => props.current ? 'auto' : '100%'};
        left: ${props => props.current ? '100%' : 'auto'};
        top: 25px;
        content: '';
        height: 0;
        width: 0;
        pointer-events: none;
        border: solid transparent;
        border-color: rgba(255, 255, 255, 0);
        border-left-color: ${props => props.current ? '#fff' : 'transparent'};
        border-right-color: ${props => props.current ? 'transparent' : '#fff'};
        border-width: 10px;
        margin-top: -10px;
    }
`;

const styles = createStyles({
    avatar: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: 14,
        color: variables.textColorSecondary,
        'img': {
            width: 54,
            height: 54
        }
    },
    meta: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 72,
        fontSize: 14
    },
    statusLabel: {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 14,
        color: variables.textColorSecondary
    },
    sent: {
        color: variables.successColor
    },
    error: {
        color: variables.errorColor
    }
});

const parseDate = (datetime: string) => {
    const date = new Date(datetime);
    const hoursBetweenDates = Math.abs(new Date().getTime() - date.getTime()) / (60 * 60 * 1000);

    if (hoursBetweenDates > 24) {
        return date.toLocaleTimeString(
            [],
            { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }
        );
    }

    return date.toLocaleString([], { hour: '2-digit', minute:'2-digit', hour12: false });
}

type MessageProps = {
    message: IMessage | FailedMessage,
    failed?: boolean
}

function Message({ message, failed = false }: MessageProps) {

    const { avatar, meta, statusLabel, sent, error } = styles;

    const { state, setState } = useGlobalState();
    const [avatarUrl, setAvatarUrl] = useState('');

    import(`../../assets/images/${message.userId}.png`).then((module) => {
        setAvatarUrl(module.default);
    });

    const Status = () => {
        if (state.userId !== message.userId) {
            return null;
        }

        let status = <span css={statusLabel}><FaCheckCircle css={sent} />&nbsp;Sent</span>;
        if (failed) {
            status = <span css={statusLabel}><FaExclamationCircle css={error} />&nbsp;Error</span>;
        }
        return status;
    }

    return (
        <MessageContainer current={state.userId === message.userId}>
            <div css={avatar}>
                <img src={avatarUrl} alt=""/>
                <span>{message.userId}</span>
            </div>
            <MessageBody current={state.userId === message.userId}>{message.text}</MessageBody>
            <div css={meta}>
                {parseDate(message.datetime)}
                <Status />
            </div>
        </MessageContainer>
    );
}

export default Message;
