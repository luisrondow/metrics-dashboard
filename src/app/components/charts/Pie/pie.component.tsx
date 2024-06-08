import { ChartData } from '@/app/types/charts';
import { ResponsivePie } from '@nivo/pie';

type PieProps = {
  data: ChartData[];
  valueFormatter?: (value: number) => string;
};

const Pie = ({ data, valueFormatter }: PieProps) => {
  return (
    <ResponsivePie
      data={data}
      valueFormat={valueFormatter}
      sortByValue
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0}
      activeOuterRadiusOffset={8}
      arcLabel={(d) => valueFormatter?.(d.value) ?? `${d.value}${d.data.type}`}
      arcLabelsRadiusOffset={0.75}
      arcLinkLabel={(d) => `${d.label}`}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 2]],
      }}
      colors={{ scheme: 'pastel1' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: 'rgba(255, 255, 255, 0.3)',
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      legends={[
        {
          anchor: 'bottom-left',
          direction: 'column',
          justify: false,
          translateX: -56,
          translateY: 48,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: '#999',
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: 'square',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000',
              },
            },
          ],
        },
      ]}
    />
  );
};

export default Pie;
