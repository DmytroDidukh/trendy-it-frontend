import React from 'react';
import { useRanger } from 'react-ranger';

import { Track, Segment, Handle } from './styles';

const Ranger = ({ values, setValues }) => {
  const { getTrackProps, segments, handles } = useRanger({
    min: 0,
    max: 5000,
    stepSize: 10,
    values,
    onChange: setValues
  });

  return (
    <div className='ranger'>
      <Track {...getTrackProps()}>
        {segments.map(({ getSegmentProps }, i) => (
          <Segment {...getSegmentProps()} index={i} />
        ))}
        {handles.map(({ value, active, getHandleProps }) => (
          <button
            {...getHandleProps({
              style: {
                appearance: 'none',
                border: 'none',
                background: 'transparent',
                outline: 'none'
              }
            })}
          >
            <Handle active={active}>{value}</Handle>
          </button>
        ))}
      </Track>
    </div>
  );
};

export default Ranger;
