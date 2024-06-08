'use client';

import ChartWrapper from './components/charts/ChartCard';
import Pie from './components/charts/Pie';

export default function Home() {
  const data = [
    {
      id: 'ruby',
      label: 'ruby',
      value: 135,
      color: 'hsl(186, 70%, 50%)',
    },
    {
      id: 'hack',
      label: 'hack',
      value: 48,
      color: 'hsl(165, 70%, 50%)',
    },
    {
      id: 'scala',
      label: 'scala',
      value: 137,
      color: 'hsl(314, 70%, 50%)',
    },
    {
      id: 'css',
      label: 'css',
      value: 455,
      color: 'hsl(86, 70%, 50%)',
    },
    {
      id: 'sass',
      label: 'sass',
      value: 440,
      color: 'hsl(202, 70%, 50%)',
    },
  ];

  return (
    <main>
      <h1>Home</h1>
      <ChartWrapper title="Zapppp">
        <Pie data={data} />
      </ChartWrapper>
    </main>
  );
}
