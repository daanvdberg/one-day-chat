import styled from '@emotion/styled';
import variables from '../../../assets/css/style-variables';

type ButtonProps = {
    active: boolean
}

export const ChannelButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 15px;
  color: ${variables.primaryColor};
  border: 0;
  width: 100%;
  background-color: ${props => props.active ? '#fff' : 'transparent'};
  cursor: ${props => props.active ? 'default' : 'pointer'};

  &:hover {
    background-color: ${props => props.active ? '#fff' : '#f7f7f7'};
  }

  &:disabled {
    color: ${variables.textColorSecondary};
    cursor: not-allowed;
    opacity: 0.75;
  }
`;
