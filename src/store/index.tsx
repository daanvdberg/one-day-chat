import React, { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import { ChannelId, UserId } from '../types/global-types';
import { IMessage } from '../modules/message-list/message-list';

export interface FailedMessage {
    channelId: ChannelId;
    text: string;
    datetime: string;
    userId: UserId;
    messageId: string;
}

export interface GlobalStateInterface {
    userId: UserId;
    channel: ChannelId;
    requestPending: boolean;
    messages: IMessage[];
    failedMessages: FailedMessage[];
}

export const GlobalStateContext = createContext({
    state: {} as Partial<GlobalStateInterface>,
    setState: {} as Dispatch<SetStateAction<Partial<GlobalStateInterface>>>,
});

const GlobalStateProvider = ({
    children,
    value = {
        userId: UserId.Joyse,
        channel: ChannelId.General,
        requestPending: false,
        messages: [],
        failedMessages: []
    } as GlobalStateInterface
}: {
    children: React.ReactNode;
    value?: Partial<GlobalStateInterface>;
}) => {

    const [state, setState] = useState(value);

    return (
        <GlobalStateContext.Provider value={{ state, setState }}>
            {children}
        </GlobalStateContext.Provider>
    );
};

const useGlobalState = () => {
    const context = useContext(GlobalStateContext);
    if (!context) {
        throw new Error("useGlobalState must be used within a GlobalStateContext");
    }
    return context;
};

export { GlobalStateProvider, useGlobalState };
