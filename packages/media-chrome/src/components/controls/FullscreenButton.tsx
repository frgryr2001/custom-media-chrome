import React, { createContext, useContext } from 'react';
import type { MediaFullscreenButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaFullscreenToggle } from '../../hooks';

interface FullscreenButtonContextValue {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const FullscreenButtonContext = createContext<FullscreenButtonContextValue | null>(null);

function useFullscreenButtonContext() {
  const context = useContext(FullscreenButtonContext);
  if (!context) {
    throw new Error('FullscreenButton compound components must be used within FullscreenButton.Root');
  }
  return context;
}

interface FullscreenButtonRootProps {
  children: React.ReactNode;
}

function FullscreenButtonRoot({ children }: FullscreenButtonRootProps) {
  const { isFullscreen, toggleFullscreen } = useMediaFullscreenToggle();

  return (
    <FullscreenButtonContext.Provider value={{ isFullscreen, toggleFullscreen }}>
      {children}
    </FullscreenButtonContext.Provider>
  );
}

interface ConditionalProps extends Omit<MediaFullscreenButtonProps, 'children'> {
  children?: React.ReactNode;
}

function Fullscreen(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isFullscreen, toggleFullscreen } = useFullscreenButtonContext();

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
  const { isFullscreen, toggleFullscreen } = useFullscreenButtonContext();

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
