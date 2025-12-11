import React from 'react';
import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../../types';
import type { MediaPlaybackRateButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';

export const MediaPlaybackRateButton: React.FC<MediaPlaybackRateButtonProps> = (props) => {
  const {
    rates = [0.5, 1, 1.5, 2],
    children,
    onClick,
    asChild,
    ...restProps
  } = props;
  const dispatch = useMediaDispatch();
  const currentRate = useMediaSelector((state) => state.mediaPlaybackRate) ?? 1;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentIndex = rates.indexOf(currentRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    dispatch({
      type: MediaActionTypes.MEDIA_PLAYBACK_RATE_REQUEST,
      detail: nextRate,
    });
    onClick?.(e);
  };

  // Render props pattern
  if (typeof children === 'function') {
    return <>{children({ currentRate, onClick: handleClick })}</>;
  }

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type="button"
      {...restProps}
      onClick={handleClick}
      aria-label={`Playback rate: ${currentRate}x`}
    >
      {children ?? `${currentRate}x`}
    </Comp>
  );
};
