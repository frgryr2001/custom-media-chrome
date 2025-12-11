import React from 'react';
import { useMediaRef } from 'media-chrome/react/media-store';
import type { MediaVideoProps } from '../types';

export const MediaVideo: React.FC<MediaVideoProps> = (props) => {
  const {
    src,
    poster,
    preload = 'metadata',
    autoPlay,
    muted,
    loop,
    playsInline = true,
    crossOrigin = '',
    className,
    style,
    children,
  } = props;
  const mediaRef = useMediaRef();

  return (
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      ref={mediaRef}
      slot="media"
      src={src}
      poster={poster}
      preload={preload}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      playsInline={playsInline}
      crossOrigin={crossOrigin}
      className={className}
      style={style}
    >
      {children}
    </video>
  );
};
