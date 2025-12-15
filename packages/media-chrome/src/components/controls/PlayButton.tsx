import React from 'react';
import type { MediaPlayButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaPlayToggle } from '../../hooks';

interface PlayButtonRootProps {
  children?: React.ReactNode;
  className?: string;
}

function PlayButtonRoot({ children, className }: PlayButtonRootProps) {
  return className ? <div className={className}>{children}</div> : <>{children}</>;
}

interface ConditionalProps extends Omit<MediaPlayButtonProps, 'children'> {
  children?: React.ReactNode;
}

function Paused(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isPaused, togglePlay } = useMediaPlayToggle();

  if (!isPaused) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: togglePlay,
    'aria-label': 'Play',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function Playing(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isPaused, togglePlay } = useMediaPlayToggle();

  if (isPaused) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: togglePlay,
    'aria-label': 'Pause',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

export const MediaPlayButton = {
  Root: PlayButtonRoot,
  Paused,
  Playing,
};
