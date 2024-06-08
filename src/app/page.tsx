'use client';

import ChartWrapper from './components/charts/ChartCard';
import Pie from './components/charts/Pie';
import Section from './components/Section';
import Bars from './components/charts/Bars';
import Line from './components/charts/Line';
import TimeMeasurementToggle from './components/TimeToggle';

import { PageWrapper } from './styles/responsive';

import useMetricsChartData from './hooks/useMetricsChartData';

import { percentageFormatter, timeFormatter } from './utils/formatters';

export default function Home() {
  const {
    fullyUnproductive,
    downtime,
    efficiencyDrop,
    lastAndAverageEfficiency,
    speedBalanceLoss,
    goodsBeforePalletizingLoss,
    timeMeasurement,
    setTimeMeasurement,
  } = useMetricsChartData();

  return (
    <main>
      <PageWrapper>
        <Section title="Equipment efficiency">
          <ChartWrapper title="Last sifht efficiency drop">
            <Line data={efficiencyDrop} />
          </ChartWrapper>
          <ChartWrapper title="Total Working, Cleaning Shift time and Real Efficiency time">
            <Bars data={lastAndAverageEfficiency} maxValue={100} valueFormatter={percentageFormatter} />
          </ChartWrapper>
        </Section>
        <Section
          title="Downtime analysis"
          headerSlot={
            <TimeMeasurementToggle timeMeasurement={timeMeasurement} toggleTimeMeasurement={setTimeMeasurement} />
          }
        >
          <ChartWrapper title="Fully unproductive time">
            <Pie data={fullyUnproductive} valueFormatter={(value) => timeFormatter(value, timeMeasurement)} />
          </ChartWrapper>
          <ChartWrapper title="Strict downtime">
            <Pie data={downtime} valueFormatter={(value) => timeFormatter(value, timeMeasurement)} />
          </ChartWrapper>
        </Section>
        <Section title="Losses">
          <ChartWrapper title="Equipment speed balance">
            <Bars data={speedBalanceLoss} layout="vertical" />
          </ChartWrapper>
          <ChartWrapper title="Goods produced before reaching the palletizer">
            <Bars data={goodsBeforePalletizingLoss} layout="vertical" />
          </ChartWrapper>
        </Section>
      </PageWrapper>
    </main>
  );
}
