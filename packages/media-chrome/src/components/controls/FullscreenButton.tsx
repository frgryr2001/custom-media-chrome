import React from 'react';
import type { MediaFullscreenButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaFullscreenToggle } from '../../hooks';

interface FullscreenButtonRootProps  extends React.ComponentPropsWithoutRef<'div'>{
    asChild?: boolean;
}


function FullscreenButtonRoot(props: FullscreenButtonRootProps) {
  const { asChild, ...restProps } = props;
  const Comp = asChild ? Slot : 'div';

  return <Comp {...restProps} />
}

interface ConditionalProps extends Omit<MediaFullscreenButtonProps, 'children'> {
  children?: React.ReactNode;
}

function Fullscreen(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isFullscreen, toggleFullscreen } = useMediaFullscreenToggle();

  if (!isFullscreen) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleFullscreen,
    'aria-label': 'Exit Fullscreen',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function Normal(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isFullscreen, toggleFullscreen } = useMediaFullscreenToggle();

  if (isFullscreen) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleFullscreen,
    'aria-label': 'Enter Fullscreen',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

export const MediaFullscreenButton = {
  Root: FullscreenButtonRoot,
  Fullscreen,
  Normal,
};
