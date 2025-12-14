import React from 'react';
import type { MediaPlaybackRateButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaPlaybackRate } from '../../hooks';

export const MediaPlaybackRateButton: React.FC<MediaPlaybackRateButtonProps> = (props) => {
  const {
    rates = [0.5, 1, 1.5, 2],
    children,
    asChild,
    ...restProps
  } = props;
  const { currentRate, cyclePlaybackRate } = useMediaPlaybackRate(rates);

  const handleClick = () => {
    cyclePlaybackRate();
  };

  // Render props pattern
  if (typeof children === 'function') {
    return <>{children({ currentRate, onClick: handleClick })}</>;
  }

  const Comp = asChild ? Slot : 'button';

  const baseProps = {
    type: 'button' as const,
    onClick: handleClick,
    'aria-label': `Playback rate: ${currentRate}x`,
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return (
    <Comp {...mergedProps}>
      {children ?? `${currentRate}x`}
    </Comp>
  );
};
