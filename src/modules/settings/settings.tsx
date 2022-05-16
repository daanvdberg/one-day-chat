/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { createStyles } from '../../types/emotion-styles';
import { Channel, GlobalState, GlobalStateInterface, UserId } from '../../globalContext';
import variables from '../../assets/css/style-variables';
import Select, { SingleValue } from 'react-select';

const styles = createStyles({
    container: {
        height: '100%',
        padding: '15px',
        borderRight: `1px solid ${variables.borderColor}`
    },
    section: {
        marginBottom: '15px'
    }
});

const options: Option[] = [
    { value: UserId.Joyse, label: UserId[UserId.Joyse] },
    { value: UserId.Russel, label: UserId[UserId.Russel] },
    { value: UserId.Sam, label: UserId[UserId.Sam] }
];

type Option = {
    label: string;
    value: UserId;
}

type ButtonProps = {
    active: boolean
}

const Button = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 15px;
  color: ${variables.primaryColor};
  border: 0;
  width: 100%;
  background-color: ${props => props.active ? '#e6e6e6' : 'transparent'};
  cursor: ${props => props.active ? 'default' : 'pointer'};

  &:hover {
    background-color: ${props => props.active ? '#e6e6e6' : '#f7f7f7'};
  }
`;

function Settings() {

    const { container, section } = styles;

    const { userId, setUserId, channel, setChannel } = React.useContext(GlobalState) as GlobalStateInterface;

    const handleSetUserId = (option: SingleValue<Option> | null) => {
        if (option) {
            setUserId(option.value);
        }
    };

    const handleSetChannel = (id: Channel) => {
        setChannel(id as Channel);
    };

    return (
        <div css={container}>
            <div css={section}>
                <label htmlFor="username-select">
                    1. Choose user
                </label>
                <Select
                    name="username"
                    value={options.find(item => item.value === userId)}
                    onChange={handleSetUserId}
                    options={options}
                />
            </div>
            <div css={section}>
                <label>
                    2. Choose your Channel
                </label>
                <Button onClick={() => handleSetChannel(Channel.General)} active={channel === Channel.General}>
                    General Channel
                </Button>
                <Button onClick={() => handleSetChannel(Channel.Technology)} active={channel === Channel.Technology}>
                    Technology Channel
                </Button>
                <Button onClick={() => handleSetChannel(Channel.LGTM)} active={channel === Channel.LGTM}>
                    LGTM Channel
                </Button>
            </div>
        </div>
    );
}

export default Settings;
