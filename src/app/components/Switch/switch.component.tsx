import { SwitchContainer, SwitchLabel, SwitchInput, SwitchSlider } from './switch.styles';

type SwitchProps = {
  checked: boolean;
  onChange: () => void;
};

const Switch = ({ checked, onChange }: SwitchProps) => {
  return (
    <SwitchContainer>
      <SwitchLabel checked={checked}>
        <SwitchInput type="checkbox" checked={checked} onChange={onChange} />
        <SwitchSlider checked={checked} />
      </SwitchLabel>
    </SwitchContainer>
  );
};

export default Switch;
