import type React from 'react';

// Base HTML element props with asChild support
export interface DivProps extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  asChild?: boolean;
}

// Base render props pattern
export interface RenderPropsBase<T> {
  children?: (props: T) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// MediaProviderWrapper
export interface MediaProviderWrapperProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// MediaVideo
export interface MediaVideoProps {
  src: string;
  poster?: string;
  preload?: 'none' | 'metadata' | 'auto';
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// MediaAudio
export interface MediaAudioProps {
  src: string;
  preload?: 'none' | 'metadata' | 'auto';
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Control Components Props
export interface MediaPlayButtonRenderProps {
  isPaused: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface MediaPlayButtonProps extends Omit<ButtonProps, 'children'> {
  children?: ((props: MediaPlayButtonRenderProps) => React.ReactNode) | React.ReactNode;
}

export interface MediaMuteButtonRenderProps {
  isMuted: boolean;
  volumeLevel: 'high' | 'medium' | 'low' | 'off';
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface MediaMuteButtonProps extends Omit<ButtonProps, 'children'> {
  children?: React.ReactNode | ((props: MediaMuteButtonRenderProps) => React.ReactNode);
}

export interface MediaTimeRangeRenderProps {
  currentTime: number;
  duration: number;
  percentage: number;
  onChange: (time: number) => void;
}

export interface MediaTimeRangeProps extends Omit<DivProps, 'children' | 'onChange'> {
  onChange?: (time: number) => void;
  children?: (props: MediaTimeRangeRenderProps) => React.ReactNode;
}

export interface MediaVolumeRangeRenderProps {
  volume: number;
  isMuted: boolean;
  onChange: (volume: number) => void;
}

export interface MediaVolumeRangeProps extends Omit<DivProps, 'children' | 'onChange'> {
  onChange?: (volume: number) => void;
  children?: (props: MediaVolumeRangeRenderProps) => React.ReactNode;
}

export interface MediaFullscreenButtonRenderProps {
  isFullscreen: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface MediaFullscreenButtonProps extends Omit<ButtonProps, 'children'> {
  children?: React.ReactNode | ((props: MediaFullscreenButtonRenderProps) => React.ReactNode);
}

export interface MediaPipButtonRenderProps {
  isPip: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface MediaPipButtonProps extends Omit<ButtonProps, 'children'> {
  children?: React.ReactNode | ((props: MediaPipButtonRenderProps) => React.ReactNode);
}

export interface MediaPlaybackRateButtonRenderProps {
  currentRate: number;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface MediaPlaybackRateButtonProps extends Omit<ButtonProps, 'children'> {
  rates?: number[];
  children?: React.ReactNode | ((props: MediaPlaybackRateButtonRenderProps) => React.ReactNode);
}

export interface MediaSubtitlesButtonRenderProps {
  isEnabled: boolean;
  hasSubtitles: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface MediaSubtitlesButtonProps extends Omit<ButtonProps, 'children'> {
  children?: React.ReactNode | ((props: MediaSubtitlesButtonRenderProps) => React.ReactNode);
}

export interface MediaTimeDisplayRenderProps {
  currentTime: number;
  duration: number;
  formattedTime: string;
}

export interface MediaTimeDisplayProps extends Omit<DivProps, 'children'> {
  showDuration?: boolean;
  children?: (props: MediaTimeDisplayRenderProps) => React.ReactNode;
}

export interface MediaPlayerLoadingRenderProps {
  isLoading: boolean;
  shouldShowLoading: boolean;
}

export interface MediaPlayerLoadingProps extends Omit<DivProps, 'children'> {
  delayMs?: number;
  children?: (props: MediaPlayerLoadingRenderProps) => React.ReactNode;
}

export interface MediaPlayerErrorRenderProps {
  error: MediaError | null;
  errorLabel: string;
  errorDescription: string;
  isFullscreen: boolean;
  onRetry: () => void;
  onReload: () => void;
  retryPending: boolean;
  reloadPending: boolean;
  labelId: string;
  descriptionId: string;
}

export interface MediaPlayerErrorProps extends Omit<DivProps, 'children'> {
  error?: MediaError | null;
  onRetry?: () => void;
  onReload?: () => void;
  children?: (props: MediaPlayerErrorRenderProps) => React.ReactNode;
}
