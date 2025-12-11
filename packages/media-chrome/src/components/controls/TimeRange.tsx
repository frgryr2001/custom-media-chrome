import React, { useDeferredValue, useState, useEffect } from 'react';
import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../../types';
import type { MediaTimeRangeProps } from '../../types';

export const MediaTimeRange: React.FC<MediaTimeRangeProps> = (props) => {
  const { children, className, style, onChange } = props;
  const dispatch = useMediaDispatch();
  const currentTime = useMediaSelector((state) => state.mediaCurrentTime) ?? 0;
  const duration = useMediaSelector((state) => state.mediaDuration) ?? 0;

  const [localTime, setLocalTime] = useState(currentTime);
  const deferredTime = useDeferredValue(localTime);

  const percentage = duration > 0 ? (deferredTime / duration) * 100 : 0;

  useEffect(() => {
    setLocalTime(currentTime);
  }, [currentTime]);

  const handleChange = (time: number) => {
    setLocalTime(time);
    dispatch({
      type: MediaActionTypes.MEDIA_SEEK_REQUEST,
      detail: time,
    });
    onChange?.(time);
  };

  if (children) {
    return (
      <>
        {children({
          currentTime: deferredTime,
          duration,
          percentage,
          onChange: handleChange,
        })}
      </>
    );
  }

  return (
    <input
      type="range"
      min={0}
      max={Number.isNaN(duration) ? 0 : duration}
      value={localTime}
      step={0.1}
      onChange={(e) => handleChange(+e.target.value)}
      className={className}
      style={style}
      aria-label="Seek"
    />
  );
};
