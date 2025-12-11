import React from 'react';
import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../../types';
import type { MediaPlayButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';

export const MediaPlayButton: React.FC<MediaPlayButtonProps> = (props) => {
  const { children, onClick, asChild, ...restProps } = props;
  const dispatch = useMediaDispatch();
  const isPaused = useMediaSelector((state) => state.mediaPaused) ?? true;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const type = isPaused
      ? MediaActionTypes.MEDIA_PLAY_REQUEST
      : MediaActionTypes.MEDIA_PAUSE_REQUEST;
    dispatch({ type });
    onClick?.(e);
  };

  // Render props pattern
  if (typeof children === 'function') {
    return <>{children({ isPaused, onClick: handleClick })}</>;
  }

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type="button"
      {...restProps}
      onClick={handleClick}
      aria-label={isPaused ? 'Play' : 'Pause'}
    >
      {children ?? (isPaused ? 'Play' : 'Pause')}
    </Comp>
  );
};
