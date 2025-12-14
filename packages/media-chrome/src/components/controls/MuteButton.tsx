import React, { createContext, useContext } from 'react';
import type { MediaMuteButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaMuteToggle } from '../../hooks';

interface MuteButtonContextValue {
  isMuted: boolean;
  volumeLevel: string;
  toggleMute: () => void;
}

const MuteButtonContext = createContext<MuteButtonContextValue | null>(null);

function useMuteButtonContext() {
  const context = useContext(MuteButtonContext);
  if (!context) {
    throw new Error('MuteButton compound components must be used within MuteButton.Root');
  }
  return context;
}

interface MuteButtonRootProps {
  children: React.ReactNode;
}

function MuteButtonRoot({ children }: MuteButtonRootProps) {
  const { isMuted, volumeLevel, toggleMute } = useMediaMuteToggle();

  return (
    <MuteButtonContext.Provider value={{ isMuted, volumeLevel, toggleMute }}>
      {children}
    </MuteButtonContext.Provider>
  );
}

interface ConditionalProps extends Omit<MediaMuteButtonProps, 'children'> {
  children?: React.ReactNode;
}

function Muted(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isMuted, toggleMute } = useMuteButtonContext();

  if (!isMuted) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleMute,
    'aria-label': 'Unmute',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function Unmuted(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isMuted, toggleMute } = useMuteButtonContext();

  if (isMuted) return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleMute,
    'aria-label': 'Mute',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function VolumeHigh(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { volumeLevel, toggleMute } = useMuteButtonContext();

  if (volumeLevel !== 'high') return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleMute,
    'aria-label': 'Mute',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function VolumeMedium(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { volumeLevel, toggleMute } = useMuteButtonContext();

  if (volumeLevel !== 'medium') return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleMute,
    'aria-label': 'Mute',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function VolumeLow(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { volumeLevel, toggleMute } = useMuteButtonContext();

  if (volumeLevel !== 'low') return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleMute,
    'aria-label': 'Mute',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

function VolumeOff(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { volumeLevel, toggleMute } = useMuteButtonContext();

  if (volumeLevel !== 'off') return null;

  const Comp = asChild ? Slot : 'button';

  const baseProps: React.ComponentPropsWithoutRef<'button'> = {
    type: 'button',
    onClick: toggleMute,
    'aria-label': 'Unmute',
  };

  const mergedProps = mergeProps(baseProps, restProps);

  return <Comp {...mergedProps}>{children}</Comp>;
}

export const MediaMuteButton = {
  Root: MuteButtonRoot,
  Muted,
  Unmuted,
  VolumeHigh,
  VolumeMedium,
  VolumeLow,
  VolumeOff,
};
