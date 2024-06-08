import { Button as StyledButton } from './button.styles';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default Button;
