import React from 'react';
import { useMediaRef } from 'media-chrome/react/media-store';
import type { MediaAudioProps } from '../types';

export const MediaAudio: React.FC<MediaAudioProps> = (props) => {
  const {
    src,
    preload = 'metadata',
    autoPlay,
    muted,
    loop,
    crossOrigin = '',
    className,
    style,
    children,
  } = props;
  const mediaRef = useMediaRef();

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <audio
      ref={mediaRef}
      slot="media"
      src={src}
      preload={preload}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      crossOrigin={crossOrigin}
      className={className}
      style={style}
    >
      {children}
    </audio>
  );
};
