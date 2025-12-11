import React from 'react';
import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../../types';
import type { MediaFullscreenButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';

export const MediaFullscreenButton: React.FC<MediaFullscreenButtonProps> = (props) => {
  const { children, onClick, asChild, ...restProps } = props;
  const dispatch = useMediaDispatch();
  const isFullscreen = useMediaSelector((state) => state.mediaIsFullscreen) ?? false;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const type = isFullscreen
      ? MediaActionTypes.MEDIA_EXIT_FULLSCREEN_REQUEST
      : MediaActionTypes.MEDIA_ENTER_FULLSCREEN_REQUEST;
    dispatch({ type });
    onClick?.(e);
  };

  // Render props pattern
  if (typeof children === 'function') {
    return <>{children({ isFullscreen, onClick: handleClick })}</>;
  }

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type="button"
      {...restProps}
      onClick={handleClick}
      aria-label={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    >
      {children ?? (isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen')}
    </Comp>
  );
};
