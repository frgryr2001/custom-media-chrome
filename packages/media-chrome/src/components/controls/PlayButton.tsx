import React, { createContext, useContext } from 'react';
import type { MediaPlayButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaPlayToggle } from '../../hooks';

interface PlayButtonContextValue {
  isPaused: boolean;
  togglePlay: () => void;
}

const PlayButtonContext = createContext<PlayButtonContextValue | null>(null);

function usePlayButtonContext() {
  const context = useContext(PlayButtonContext);
  if (!context) {
    throw new Error('PlayButton compound components must be used within PlayButton.Root');
  }
  return context;
}

interface PlayButtonRootProps {
  children: React.ReactNode;
}

function PlayButtonRoot({ children }: PlayButtonRootProps) {
  const { isPaused, togglePlay } = useMediaPlayToggle();

  return (
    <PlayButtonContext.Provider value={{ isPaused, togglePlay }}>
      {children}
    </PlayButtonContext.Provider>
  );
}

interface ConditionalProps extends Omit<MediaPlayButtonProps, 'children'> {
  children?: React.ReactNode;
}

function Paused(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isPaused, togglePlay } = usePlayButtonContext();

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
  const { isPaused, togglePlay } = usePlayButtonContext();

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
