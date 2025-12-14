import React, { createContext, useContext } from 'react';
import type { MediaPipButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaPipToggle } from '../../hooks';

interface PipButtonContextValue {
  isPip: boolean;
  togglePip: () => void;
}

const PipButtonContext = createContext<PipButtonContextValue | null>(null);

function usePipButtonContext() {
  const context = useContext(PipButtonContext);
  if (!context) {
    throw new Error('PipButton compound components must be used within PipButton.Root');
  }
  return context;
}

interface PipButtonRootProps {
  children: React.ReactNode;
}

function PipButtonRoot({ children }: PipButtonRootProps) {
  const { isPip, togglePip } = useMediaPipToggle();

  return (
    <PipButtonContext.Provider value={{ isPip, togglePip }}>
      {children}
    </PipButtonContext.Provider>
  );
}

interface ConditionalProps extends Omit<MediaPipButtonProps, 'children'> {
  children?: React.ReactNode;
}

function Pip(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isPip, togglePip } = usePipButtonContext();

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
  const { isPip, togglePip } = usePipButtonContext();

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
