import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../types';

export function useMediaSubtitlesToggle() {
  const dispatch = useMediaDispatch();
  const subtitlesList = useMediaSelector((state) => state.mediaSubtitlesList) ?? [];
  const subtitlesShowing = useMediaSelector((state) => state.mediaSubtitlesShowing) ?? [];
  const hasSubtitles = subtitlesList.length > 0;
  const isEnabled = subtitlesShowing.length > 0;

  const toggleSubtitles = () => {
    if (!hasSubtitles) return;

    const type = isEnabled
      ? MediaActionTypes.MEDIA_DISABLE_SUBTITLES_REQUEST
      : MediaActionTypes.MEDIA_SHOW_SUBTITLES_REQUEST;
    const detail = isEnabled ? subtitlesShowing : [subtitlesList[0]];
    dispatch({ type, detail });
  };

  return { isEnabled, hasSubtitles, subtitlesList, subtitlesShowing, toggleSubtitles };
}
