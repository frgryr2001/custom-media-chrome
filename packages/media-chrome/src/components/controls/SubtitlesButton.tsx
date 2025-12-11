import React from 'react';
import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../../types';
import type { MediaSubtitlesButtonProps } from '../../types';
import { Slot } from '../../utils/Slot';

export const MediaSubtitlesButton: React.FC<MediaSubtitlesButtonProps> = (props) => {
  const { children, onClick, asChild, ...restProps } = props;
  const dispatch = useMediaDispatch();
  const subtitlesList = useMediaSelector((state) => state.mediaSubtitlesList) ?? [];
  const subtitlesShowing = useMediaSelector((state) => state.mediaSubtitlesShowing) ?? [];
  const hasSubtitles = subtitlesList.length > 0;
  const isEnabled = subtitlesShowing.length > 0;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!hasSubtitles) return;

    const type = isEnabled
      ? MediaActionTypes.MEDIA_DISABLE_SUBTITLES_REQUEST
      : MediaActionTypes.MEDIA_SHOW_SUBTITLES_REQUEST;
    const detail = isEnabled ? subtitlesShowing : [subtitlesList[0]];
    dispatch({ type, detail });
    onClick?.(e);
  };

  // Render props pattern
  if (typeof children === 'function') {
    return (
      <>
        {children({
          isEnabled,
          hasSubtitles,
          onClick: handleClick,
        })}
      </>
    );
  }

  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type="button"
      {...restProps}
      onClick={handleClick}
      disabled={!hasSubtitles}
      aria-label={isEnabled ? 'Disable Subtitles' : 'Enable Subtitles'}
    >
      {children ?? (isEnabled ? 'Disable Captions' : 'Enable Captions')}
    </Comp>
  );
};
