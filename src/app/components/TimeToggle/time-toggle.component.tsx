import { TimeMeasurement } from '@/app/types/time-utils';
import Switch from '@/app/components/Switch';

import { Wrapper } from './time-toggle.styles';
import { Dispatch, SetStateAction } from 'react';

type TimeMeasurementToggleProps = {
  timeMeasurement: TimeMeasurement;
  toggleTimeMeasurement: Dispatch<SetStateAction<TimeMeasurement>>;
};

const TimeMeasurementToggle = ({ timeMeasurement, toggleTimeMeasurement }: TimeMeasurementToggleProps) => {
  return (
    <Wrapper>
      <span>Seconds</span>
      <Switch
        checked={timeMeasurement === 'hours'}
        onChange={() => toggleTimeMeasurement(timeMeasurement === 'hours' ? 'secs' : 'hours')}
      />
      <span>Hour</span>
    </Wrapper>
  );
};

export default TimeMeasurementToggle;
