import React from 'react';
import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../../types';
import type { MediaVolumeRangeProps } from '../../types';
import { mergeProps } from '../../utils/merge-props';

export const MediaVolumeRange: React.FC<MediaVolumeRangeProps> = (props) => {
  const { children, ...restProps } = props;
  const dispatch = useMediaDispatch();
  const volume = useMediaSelector((state) => state.mediaVolume) ?? 1;
  const isMuted = useMediaSelector((state) => state.mediaMuted) ?? false;

  const handleChange = (newVolume: number) => {
    dispatch({
      type: MediaActionTypes.MEDIA_VOLUME_REQUEST,
      detail: newVolume,
    });
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

  const baseProps = {
    type: 'range' as const,
    min: 0,
    max: 1,
    value: volume,
    step: 0.01,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(+e.target.value),
    'aria-label': 'Volume',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <input {...mergedProps} />;
};
