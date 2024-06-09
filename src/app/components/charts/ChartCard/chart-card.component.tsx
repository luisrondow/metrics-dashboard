import SpinnerLoader from '../../SpinnerLoader';
import { Content, Header, Title, Wrapper } from './chart-card.styles';

type ChartWrapperProps = {
  children: React.ReactNode;
  title: string;
  isLoading?: boolean;
};

const ChartWrapper = ({ children, title, isLoading }: ChartWrapperProps) => {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>{isLoading ? <SpinnerLoader /> : children}</Content>
    </Wrapper>
  );
};

export default ChartWrapper;
