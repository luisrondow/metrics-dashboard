import { ResponsiveBar } from '@nivo/bar';

import { BarChartData } from '@/app/types/charts';

type BarsProps = {
  data: BarChartData[];
  maxValue?: number;
  valueFormatter?: (value: number) => string;
  layout?: 'vertical' | 'horizontal';
};

const Bars = ({ data, maxValue, valueFormatter, layout }: BarsProps) => (
  <ResponsiveBar
    data={data}
    keys={data[0] ? Object.keys(data[0]).filter((key) => key !== 'metric') : []}
    indexBy="metric"
    valueFormat={valueFormatter}
    maxValue={maxValue ?? 'auto'}
    layout={layout ?? 'vertical'}
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.3}
    valueScale={{ type: 'linear' }}
    indexScale={{ type: 'band', round: true }}
    colors={{ scheme: 'nivo' }}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'metric',
      legendPosition: 'middle',
      legendOffset: 32,
      truncateTickAt: 0,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: 'color',
      modifiers: [['darker', 1.6]],
    }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
    role="application"
  />
);

export default Bars;
