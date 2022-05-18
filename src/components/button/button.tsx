/** @jsxImportSource @emotion/react */
import React, { ReactNode } from "react";
import styled from '@emotion/styled';
import variables from '../../assets/css/style-variables';
import { createStyles } from '../../types/emotion-styles';

const styles = createStyles({
    iconLeft: {
        marginRight: 8
    },
    iconRight: {
        marginLeft: 8
    },
});

const StyledButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding: 0 15px;
  background-color: ${variables.primaryColor};
  color: #fff;
  border: 1px solid ${variables.primaryColor};
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    background-color: #e6e6e6;
    color: #999999;
    border-color: #dedede;
    cursor: not-allowed;
  }

  svg {
    font-size: 14px;
  }
`;

export interface ButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,HTMLButtonElement>, React.AriaAttributes  {
    icon: ReactNode
    iconLocation?: 'left' | 'right'
}

export const Button:React.FC<ButtonProps> = (props) => {
    const { iconLeft, iconRight } = styles;
    const { children, icon, iconLocation = 'right', ...rest } = props;

    return (
        <StyledButton {...rest}>
            {iconLocation === 'left' ? <span css={iconLeft}>{icon}</span> : null}
            {children}
            {iconLocation === 'right' ? <span css={iconRight}>{icon}</span> : null}
        </StyledButton>
    )
}