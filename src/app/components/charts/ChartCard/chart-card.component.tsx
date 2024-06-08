import { Content, Header, Title, Wrapper } from './chart-card.styles';

type ChartWrapperProps = {
  children: React.ReactNode;
  title: string;
};

const ChartWrapper = ({ children, title }: ChartWrapperProps) => {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
      </Header>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default ChartWrapper;
