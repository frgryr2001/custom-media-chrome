import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../types';

export function useMediaFullscreenToggle() {
  const dispatch = useMediaDispatch();
  const isFullscreen = useMediaSelector((state) => state.mediaIsFullscreen) ?? false;

  const toggleFullscreen = () => {
    const type = isFullscreen
      ? MediaActionTypes.MEDIA_EXIT_FULLSCREEN_REQUEST
      : MediaActionTypes.MEDIA_ENTER_FULLSCREEN_REQUEST;
    dispatch({ type });
  };

  return { isFullscreen, toggleFullscreen };
}
