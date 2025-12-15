import React from 'react';
import type { MediaPlayButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaPlayToggle } from '../../hooks';

interface PlayButtonRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

function PlayButtonRoot(props: PlayButtonRootProps) {
  const { asChild, ...restProps } = props;
  const Comp = asChild ? Slot : 'div';

  return <Comp {...restProps} />;
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
