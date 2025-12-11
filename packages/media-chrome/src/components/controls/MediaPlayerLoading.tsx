import React, { useState, useEffect, useRef } from 'react';
import { useMediaSelector } from 'media-chrome/react/media-store';
import type { MediaPlayerLoadingProps } from '../../types';

export const MediaPlayerLoading: React.FC<MediaPlayerLoadingProps> = (props) => {
  const { children, className, style, delayMs = 500 } = props;

  const isLoading = useMediaSelector((state) => state.mediaLoading) ?? false;
  const isPaused = useMediaSelector((state) => state.mediaPaused) ?? true;
  const hasPlayed = useMediaSelector((state) => state.mediaHasPlayed) ?? false;

  const shouldShowLoading = isLoading && !isPaused;
  const shouldUseDelay = hasPlayed && shouldShowLoading;
  const loadingDelayMs = shouldUseDelay ? delayMs : 0;

  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (shouldShowLoading) {
      if (loadingDelayMs > 0) {
        timeoutRef.current = setTimeout(() => {
          setShouldRender(true);
          timeoutRef.current = null;
        }, loadingDelayMs);
      } else {
        setShouldRender(true);
      }
    } else {
      setShouldRender(false);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [shouldShowLoading, loadingDelayMs]);

  if (children) {
    return <>{children({ isLoading: shouldRender, shouldShowLoading })}</>;
  }

  if (!shouldRender) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={className}
      style={style}
    >
      <span className="sr-only">Loading...</span>
      <div className="animate-spin">⏳</div>
    </div>
  );
};
