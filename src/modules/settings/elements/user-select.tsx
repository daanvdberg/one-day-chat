import styled from '@emotion/styled';
import variables from '../../../assets/css/style-variables';

export const UserSelect = styled.select`
  display: flex;
  align-items: center;
  height: 45px;
  width: 100%;
  padding: 0 10px;
  color: ${variables.primaryColor};
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid ${variables.borderColor};

  &:disabled {
    color: ${variables.textColorSecondary};
    background-color: #e6e6e6;
    cursor: not-allowed;
  }
`;