import * as React from "react";

type Props = {
    children?: React.ReactNode;
};

export enum UserId { Joyse, Russel, Sam,}
export enum Channel { General, LGTM, Technology}

export interface GlobalStateInterface {
    userId: UserId;
    setUserId: (user: UserId) => void;
    channel: Channel;
    setChannel: (channel: Channel) => void;
}

export const GlobalState = React.createContext<GlobalStateInterface | null>(null);

const StateProvider: React.FC<Props> = ({ children }) => {

    const [userId, changeUserId] = React.useState<UserId>(UserId.Joyse);
    const [channel, changeChannel] = React.useState<Channel>(Channel.General);

    const setUserId = (userId: UserId) => {
        changeUserId(userId);
    };

    const setChannel = (channel: Channel) => {
        changeChannel(channel);
    };

    return <GlobalState.Provider value={{ userId, setUserId, channel, setChannel }}>{children}</GlobalState.Provider>;
};

export default StateProvider