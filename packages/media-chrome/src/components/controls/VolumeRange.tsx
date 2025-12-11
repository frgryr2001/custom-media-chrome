import React from 'react';
import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../../types';
import type { MediaVolumeRangeProps } from '../../types';

export const MediaVolumeRange: React.FC<MediaVolumeRangeProps> = (props) => {
  const { children, className, style, onChange } = props;
  const dispatch = useMediaDispatch();
  const volume = useMediaSelector((state) => state.mediaVolume) ?? 1;
  const isMuted = useMediaSelector((state) => state.mediaMuted) ?? false;

  const handleChange = (newVolume: number) => {
    dispatch({
      type: MediaActionTypes.MEDIA_VOLUME_REQUEST,
      detail: newVolume,
    });
    onChange?.(newVolume);
  };

  if (children) {
    return (
      <>
        {children({
          volume,
          isMuted,
          onChange: handleChange,
        })}
      </>
    );
  }

  return (
    <input
      type="range"
      min={0}
      max={1}
      value={volume}
      step={0.01}
      onChange={(e) => handleChange(+e.target.value)}
      className={className}
      style={style}
      aria-label="Volume"
    />
  );
};
