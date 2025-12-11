import React from 'react';
import { MediaProvider } from 'media-chrome/react/media-store';
import type { MediaProviderWrapperProps } from '../types';

export const MediaProviderWrapper: React.FC<MediaProviderWrapperProps> = (props) => {
  const { children, className, style } = props;
  return (
    <MediaProvider>
      <div className={className} style={style}>
        {children}
      </div>
    </MediaProvider>
  );
};
