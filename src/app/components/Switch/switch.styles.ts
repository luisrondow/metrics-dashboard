import styled from 'styled-components';

type SwitchLabelProps = {
  checked?: boolean;
}

export const SwitchContainer = styled.div`
  display: inline-block;
  position: relative;
`;

export const SwitchLabel = styled.label<SwitchLabelProps>`
  display: inline-block;
  width: 50px;
  height: 24px;
  background-color: ${props => (props.checked ? '#4caf50' : '#ccc')};
  border-radius: 34px;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
`;

export const SwitchInput = styled.input`
  display: none;
`;

export const SwitchSlider = styled.span<SwitchLabelProps>`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s;
  transform: ${props => (props.checked ? 'translateX(26px)' : 'translateX(0)')};
`;