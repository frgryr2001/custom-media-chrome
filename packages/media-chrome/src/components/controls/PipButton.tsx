import React from 'react';
import type { MediaPipButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaPipToggle } from '../../hooks';

interface PipButtonRootProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

function PipButtonRoot(props: PipButtonRootProps) {
  const { asChild, ...restProps } = props;
  const Comp = asChild ? Slot : 'div';

  return <Comp {...restProps} />;
}

interface ConditionalProps extends Omit<MediaPipButtonProps, 'children'> {
  children?: React.ReactNode;
}

function Pip(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isPip, togglePip } = useMediaPipToggle();

  if (!isPip) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: togglePip,
    'aria-label': 'Exit Picture-in-Picture',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function Normal(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isPip, togglePip } = useMediaPipToggle();

  if (isPip) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: togglePip,
    'aria-label': 'Enter Picture-in-Picture',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

export const MediaPipButton = {
  Root: PipButtonRoot,
  Pip,
  Normal,
};
