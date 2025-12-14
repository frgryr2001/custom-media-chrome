import React, { createContext, useContext } from 'react';
import type { MediaSubtitlesButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaSubtitlesToggle } from '../../hooks';

interface SubtitlesButtonContextValue {
  isEnabled: boolean;
  hasSubtitles: boolean;
  toggleSubtitles: () => void;
}

const SubtitlesButtonContext = createContext<SubtitlesButtonContextValue | null>(null);

function useSubtitlesButtonContext() {
  const context = useContext(SubtitlesButtonContext);
  if (!context) {
    throw new Error('SubtitlesButton compound components must be used within SubtitlesButton.Root');
  }
  return context;
}

interface SubtitlesButtonRootProps {
  children: React.ReactNode;
}

function SubtitlesButtonRoot({ children }: SubtitlesButtonRootProps) {
  const { isEnabled, hasSubtitles, toggleSubtitles } = useMediaSubtitlesToggle();

  return (
    <SubtitlesButtonContext.Provider value={{ isEnabled, hasSubtitles, toggleSubtitles }}>
      {children}
    </SubtitlesButtonContext.Provider>
  );
}

interface ConditionalProps extends Omit<MediaSubtitlesButtonProps, 'children'> {
  children?: React.ReactNode;
}

function Enabled(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isEnabled, hasSubtitles, toggleSubtitles } = useSubtitlesButtonContext();

  if (!isEnabled) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleSubtitles,
    disabled: !hasSubtitles,
    'aria-label': 'Disable Subtitles',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function Disabled(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isEnabled, hasSubtitles, toggleSubtitles } = useSubtitlesButtonContext();

  if (isEnabled) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleSubtitles,
    disabled: !hasSubtitles,
    'aria-label': 'Enable Subtitles',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function Available(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { hasSubtitles, toggleSubtitles } = useSubtitlesButtonContext();

  if (!hasSubtitles) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleSubtitles,
    'aria-label': 'Toggle Subtitles',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function NotAvailable(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { hasSubtitles, toggleSubtitles } = useSubtitlesButtonContext();

  if (hasSubtitles) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleSubtitles,
    disabled: true,
    'aria-label': 'Subtitles Not Available',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

export const MediaSubtitlesButton = {
  Root: SubtitlesButtonRoot,
  Enabled,
  Disabled,
  Available,
  NotAvailable,
};
