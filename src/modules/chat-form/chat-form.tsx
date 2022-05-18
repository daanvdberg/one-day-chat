/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from "react-icons/fa";
import { useMutation } from '@apollo/client';
import { POST_MESSAGE } from './graphql/post-message';
import { FailedMessage, useGlobalState } from '../../store';
import { ChannelId, UserId } from '../../types/global-types';
import { useLocalStorage } from 'usehooks-ts';
import { createStyles } from '../../types/emotion-styles';
import variables from '../../assets/css/style-variables';
import { Button } from '../../components/button/button';

const styles = createStyles({
    form: {
        display: 'flex',
        padding: 15
    },
    textarea: {
        minHeight: 50,
        width: 'calc(100% - 110px)',
        padding: '12px 15px',
        margin: '0 10px 0 0',
        borderRadius: 4,
        border: `1px solid ${variables.borderColor}`,
        boxSizing: 'border-box',
        resize: 'none',
        fontSize: 18,
        lineHeight: '21px'
    },
    button: {
        width: 100
    }
});

function ChatForm() {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const { form, textarea, button } = styles;

    const { state: { messages = [] }, state, setState } = useGlobalState();
    const [input, setInput] = useState('');
    const [getExistingInput, saveInputToStorage] = useLocalStorage('message', '');
    const [postMessage, { loading }] = useMutation(POST_MESSAGE);

    useEffect(() => {
        if (getExistingInput.length) {
            setInput(getExistingInput);
        }
    }, []);

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [input]);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
        saveInputToStorage(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const channelId = state.channel || ChannelId.General;
        const userId = state.userId || UserId.Joyse;
        postMessage({
            variables: { channelId: ChannelId[channelId], userId: UserId[userId], text: input },
            onCompleted: (data) => {
                if (data && data.MessagePost) {
                    setState((prev) =>
                        ({ ...prev, messages: [...(prev.messages || []), data.MessagePost] }))
                }
                setInput('');
                saveInputToStorage('');
            },
            onError: () => {
                const message: FailedMessage = {
                    channelId: ChannelId[channelId],
                    text: input,
                    datetime: new Date().toISOString(),
                    userId: UserId[userId],
                    messageId: (Date.now() + Math.random()).toString()
                }
                setState((prev) =>({
                    ...prev,
                    failedMessages: [...(prev.failedMessages || []), message]
                }));
                setInput('');
                saveInputToStorage('');
            }
        });
    }

    return (
        <form css={form} onSubmit={handleSubmit}>
            <textarea ref={textareaRef} css={textarea} value={input} onChange={handleInputChange} disabled={loading} />
            <Button css={button} icon={<FaPaperPlane />} disabled={loading}>
                Send
            </Button>
        </form>
    );
}

export default ChatForm;
