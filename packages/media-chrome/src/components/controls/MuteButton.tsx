import React from 'react';
import type { MediaMuteButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';
import { mergeProps } from '../../utils/merge-props';
import { useMediaMuteToggle } from '../../hooks';

interface MuteButtonRootProps {
  children?: React.ReactNode;
  className?: string;
}

function MuteButtonRoot({ children, className }: MuteButtonRootProps) {
  return className ? <div className={className}>{children}</div> : <>{children}</>;
}

interface ConditionalProps extends Omit<MediaMuteButtonProps, 'children'> {
  children?: React.ReactNode;
}

function Muted(props: ConditionalProps) {
  const { children, asChild, ...restProps } = props;
  const { isMuted, toggleMute } = useMediaMuteToggle();

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
  const { isMuted, toggleMute } = useMediaMuteToggle();

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
  const { volumeLevel, toggleMute } = useMediaMuteToggle();

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
  const { volumeLevel, toggleMute } = useMediaMuteToggle();

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
  const { volumeLevel, toggleMute } = useMediaMuteToggle();

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
  const { volumeLevel, toggleMute } = useMediaMuteToggle();

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
