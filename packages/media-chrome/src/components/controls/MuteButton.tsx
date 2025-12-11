import React from 'react';
import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../../types';
import type { MediaMuteButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';

export const MediaMuteButton: React.FC<MediaMuteButtonProps> = (props) => {
  const { children, onClick, asChild, ...restProps } = props;
  const dispatch = useMediaDispatch();
  const volumeLevel = useMediaSelector((state) => state.mediaVolumeLevel) ?? 'high';
  const isMuted = volumeLevel === 'off';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const type = isMuted
      ? MediaActionTypes.MEDIA_UNMUTE_REQUEST
      : MediaActionTypes.MEDIA_MUTE_REQUEST;
    dispatch({ type });
    onClick?.(e);
  };

  // Render props pattern
  if (typeof children === 'function') {
    return <>{children({ isMuted, volumeLevel, onClick: handleClick })}</>;
  }

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type="button"
      {...restProps}
      onClick={handleClick}
      aria-label={isMuted ? 'Unmute' : 'Mute'}
    >
      {children ?? (isMuted ? 'Unmute' : 'Mute')}
    </Comp>
  );
};
