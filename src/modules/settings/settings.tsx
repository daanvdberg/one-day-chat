/** @jsxImportSource @emotion/react */
import React from 'react';
import { createStyles } from '../../types/emotion-styles';
import { useGlobalState } from '../../store';
import variables from '../../assets/css/style-variables';
import { ChannelId, UserId } from '../../types/global-types';
import { ChannelButton } from './elements/channel-button';
import { UserSelect } from './elements/user-select';

const styles = createStyles({
    container: {
        height: '100%',
        borderRight: `1px solid ${variables.borderColor}`
    },
    section: {
        padding: '20px 15px',
        '& + &': {
            borderTop: `1px solid ${variables.borderColor}`
        }
    },
    sectionLabel: {
        display: 'block',
        marginBottom: 10,
        fontSize: 20
    }
});

const options: Option[] = [
    { value: UserId.Joyse, label: UserId[UserId.Joyse] },
    { value: UserId.Russell, label: UserId[UserId.Russell] },
    { value: UserId.Sam, label: UserId[UserId.Sam] }
];

type Option = {
    label: string;
    value: UserId;
}

function Settings() {

    const { container, section, sectionLabel } = styles;

    const { state: { channel, userId = UserId.Joyse, requestPending = false }, setState } = useGlobalState();

    const handleSetUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newUserId: UserId = UserId[event.target.value as keyof typeof UserId];
        setState((prev) => ({ ...prev, userId: newUserId }));
    };

    const handleSetChannel = (id: ChannelId) => {
        setState((prev) => ({ ...prev, channel: id }));
    };

    return (
        <div css={container}>
            <div css={section}>
                <label css={sectionLabel}>
                    Choose user
                </label>
                <UserSelect
                    name="username"
                    value={UserId[userId]}
                    onChange={handleSetUserId}
                    disabled={requestPending}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                </UserSelect>
            </div>
            <div css={section}>
                <label css={sectionLabel}>
                    Choose your Channel
                </label>
                <ChannelButton
                    onClick={() => handleSetChannel(ChannelId.General)}
                    active={channel === ChannelId.General}
                    disabled={requestPending}
                >
                    General Channel
                </ChannelButton>
                <ChannelButton
                    onClick={() => handleSetChannel(ChannelId.Technology)}
                    active={channel === ChannelId.Technology}
                    disabled={requestPending}
                >
                    Technology Channel
                </ChannelButton>
                <ChannelButton
                    onClick={() => handleSetChannel(ChannelId.LGTM)}
                    active={channel === ChannelId.LGTM}
                    disabled={requestPending}
                >
                    LGTM Channel
                </ChannelButton>
            </div>
        </div>
    );
}

export default Settings;
