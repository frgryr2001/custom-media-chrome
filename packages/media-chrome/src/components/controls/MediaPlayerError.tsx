import React, { useState, useCallback, useMemo, useId } from 'react';
import { useMediaSelector } from 'media-chrome/react/media-store';
import type { MediaPlayerErrorProps } from '../../types';

export const MediaPlayerError: React.FC<MediaPlayerErrorProps> = (props) => {
  const {
    children,
    className,
    style,
    error: errorProp,
    onRetry: onRetryProp,
    onReload: onReloadProp,
  } = props;

  const mediaError = useMediaSelector((state) => state.mediaError);
  const isFullscreen = useMediaSelector((state) => state.mediaIsFullscreen) ?? false;

  const error = errorProp ?? mediaError;

  const labelId = useId();
  const descriptionId = useId();

  const [actionState, setActionState] = useState<{
    retryPending: boolean;
    reloadPending: boolean;
  }>({
    retryPending: false,
    reloadPending: false,
  });

  const onRetry = useCallback(() => {
    setActionState((prev) => ({ ...prev, retryPending: true }));

    if (onRetryProp) {
      onRetryProp();
    }

    // Reset pending state after a brief delay
    setTimeout(() => {
      setActionState((prev) => ({ ...prev, retryPending: false }));
    }, 500);
  }, [onRetryProp]);

  const onReload = useCallback(() => {
    setActionState((prev) => ({ ...prev, reloadPending: true }));

    if (onReloadProp) {
      onReloadProp();
    } else {
      globalThis.location.reload();
    }
  }, [onReloadProp]);

  const errorLabel = useMemo(() => {
    if (!error) return 'Playback Error';

    const labelMap: Record<number, string> = {
      1: 'Playback Interrupted', // MEDIA_ERR_ABORTED
      2: 'Connection Problem',   // MEDIA_ERR_NETWORK
      3: 'Media Error',          // MEDIA_ERR_DECODE
      4: 'Unsupported Format',   // MEDIA_ERR_SRC_NOT_SUPPORTED
    };

    return labelMap[error.code] ?? 'Playback Error';
  }, [error]);

  const errorDescription = useMemo(() => {
    if (!error) return 'An unknown error occurred';

    const descriptionMap: Record<number, string> = {
      1: 'Media playback was aborted',
      2: 'A network error occurred while loading the media',
      3: 'An error occurred while decoding the media',
      4: 'The media format is not supported',
    };

    return descriptionMap[error.code] ?? error.message ?? 'An unknown error occurred';
  }, [error]);

  if (children) {
    return (
      <>
        {children({
          error: error ?? null,
          errorLabel,
          errorDescription,
          isFullscreen,
          onRetry,
          onReload,
          retryPending: actionState.retryPending,
          reloadPending: actionState.reloadPending,
          labelId,
          descriptionId,
        })}
      </>
    );
  }

  if (!error) return null;

  return (
    <div
      role="alert"
      aria-describedby={descriptionId}
      aria-labelledby={labelId}
      aria-live="assertive"
      className={className}
      style={style}
    >
      <div>
        <h3 id={labelId}>{errorLabel}</h3>
        <p id={descriptionId}>{errorDescription}</p>
        <div>
          <button
            type="button"
            onClick={onRetry}
            disabled={actionState.retryPending}
          >
            {actionState.retryPending ? 'Retrying...' : 'Try again'}
          </button>
          <button
            type="button"
            onClick={onReload}
            disabled={actionState.reloadPending}
          >
            {actionState.reloadPending ? 'Reloading...' : 'Reload page'}
          </button>
        </div>
      </div>
    </div>
  );
};
