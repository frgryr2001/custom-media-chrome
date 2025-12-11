import React from 'react';
import { useMediaSelector } from 'media-chrome/react/media-store';
import type { MediaTimeDisplayProps } from '../../types';

const formatTime = (seconds: number): string => {
  if (Number.isNaN(seconds) || seconds === Infinity) return '--:--';

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export const MediaTimeDisplay: React.FC<MediaTimeDisplayProps> = (props) => {
  const { showDuration = true, children, className, style } = props;
  const currentTime = useMediaSelector((state) => state.mediaCurrentTime) ?? 0;
  const duration = useMediaSelector((state) => state.mediaDuration) ?? 0;

  const formattedCurrent = formatTime(currentTime);
  const formattedDuration = formatTime(duration);
  const formattedTime = showDuration
    ? `${formattedCurrent} / ${formattedDuration}`
    : formattedCurrent;

  if (children) {
    return (
      <>
        {children({
          currentTime,
          duration,
          formattedTime,
        })}
      </>
    );
  }  return (
    <div className={className} style={style}>
      {formattedTime}
    </div>
  );
};
