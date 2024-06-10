import { TimeMeasurement } from '@/app/types/time-utils';
import Switch from '../Switch';

import { Wrapper } from './time-toggle.styles';
import { Dispatch, SetStateAction } from 'react';

type TimeMeasurementToggleProps = {
  timeMeasurement: TimeMeasurement;
  toggleTimeMeasurement: Dispatch<SetStateAction<TimeMeasurement>>;
};

const TimeMeasurementToggle = ({ timeMeasurement, toggleTimeMeasurement }: TimeMeasurementToggleProps) => {
  return (
    <Wrapper data-cy="time-measurment-toggle">
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
