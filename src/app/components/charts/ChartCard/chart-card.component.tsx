import { Wrapper } from './chart-card.styles';

type ChartWrapperProps = {
  children: React.ReactNode;
  title: string;
};

const ChartWrapper = ({ children, title }: ChartWrapperProps) => {
  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <h4>{title}</h4>
      </div>
      <Wrapper>{children}</Wrapper>
    </div>
  );
};

export default ChartWrapper;
