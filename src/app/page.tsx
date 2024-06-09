'use client';

import { useState } from 'react';

import { PageWrapper } from './styles/responsive';

import ChartWrapper from './components/charts/ChartCard';
import Pie from './components/charts/Pie';
import Section from './components/Section';
import Bars from './components/charts/Bars';
import Line from './components/charts/Line';
import TimeMeasurementToggle from './components/TimeToggle';
import Modal from './components/Modal';
import Table from './components/Table';

import useMetricsChartData from './hooks/useMetricsChartData';
import useTableData from './hooks/useTableData';

import { percentageFormatter, timeFormatter } from './utils/formatters';

import { DOWNTIME_METRICS_IDS, EFFICIENCY_METRICS_IDS, LOSS_METRICS_IDS } from './utils/metrics';

export default function Home() {
  const {
    fetchedMetrics,
    fullyUnproductive,
    downtime,
    efficiencyDrop,
    lastAndAverageEfficiency,
    speedBalanceLoss,
    goodsBeforePalletizingLoss,
    timeMeasurement,
    setTimeMeasurement,
  } = useMetricsChartData();

  const { columns, data, setTableData } = useTableData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenTableModal = (metricsIds: string[]) => {
    if (!fetchedMetrics) return;

    setIsModalOpen(true);
    setTableData(fetchedMetrics, metricsIds);
  };

  return (
    <>
      <main>
        <PageWrapper>
          <Section title="Equipment efficiency" handleOpenTable={() => handleOpenTableModal(EFFICIENCY_METRICS_IDS)}>
            <ChartWrapper title="Last sifht efficiency drop">
              <Line data={efficiencyDrop} />
            </ChartWrapper>
            <ChartWrapper title="Total Working, Cleaning Shift time and Real Efficiency time">
              <Bars data={lastAndAverageEfficiency} maxValue={100} valueFormatter={percentageFormatter} />
            </ChartWrapper>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <Table columns={columns} data={data} />
            </Modal>
          </Section>
          <Section
            title="Downtime analysis"
            headerSlot={
              <TimeMeasurementToggle timeMeasurement={timeMeasurement} toggleTimeMeasurement={setTimeMeasurement} />
            }
            handleOpenTable={() => handleOpenTableModal(DOWNTIME_METRICS_IDS)}
          >
            <ChartWrapper title="Fully unproductive time">
              <Pie data={fullyUnproductive} valueFormatter={(value) => timeFormatter(value, timeMeasurement)} />
            </ChartWrapper>
            <ChartWrapper title="Strict downtime">
              <Pie data={downtime} valueFormatter={(value) => timeFormatter(value, timeMeasurement)} />
            </ChartWrapper>
          </Section>
          <Section title="Losses" handleOpenTable={() => handleOpenTableModal(LOSS_METRICS_IDS)}>
            <ChartWrapper title="Equipment speed balance">
              <Bars data={speedBalanceLoss} layout="vertical" />
            </ChartWrapper>
            <ChartWrapper title="Goods produced before reaching the palletizer">
              <Bars data={goodsBeforePalletizingLoss} layout="vertical" />
            </ChartWrapper>
          </Section>
        </PageWrapper>
      </main>
      <div id="modal-root"></div>
    </>
  );
}
