import React from 'react';
import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../../types';
import type { MediaPipButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';

export const MediaPipButton: React.FC<MediaPipButtonProps> = (props) => {
  const { children, onClick, asChild, ...restProps } = props;
  const dispatch = useMediaDispatch();
  const isPip = useMediaSelector((state) => state.mediaIsPip) ?? false;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const type = isPip
      ? MediaActionTypes.MEDIA_EXIT_PIP_REQUEST
      : MediaActionTypes.MEDIA_ENTER_PIP_REQUEST;
    dispatch({ type });
    onClick?.(e);
  };

  // Render props pattern
  if (typeof children === 'function') {
    return <>{children({ isPip, onClick: handleClick })}</>;
  }

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type="button"
      {...restProps}
      onClick={handleClick}
      aria-label={isPip ? 'Exit Picture-in-Picture' : 'Enter Picture-in-Picture'}
    >
      {children ?? (isPip ? 'Exit PiP' : 'Enter PiP')}
    </Comp>
  );
};
