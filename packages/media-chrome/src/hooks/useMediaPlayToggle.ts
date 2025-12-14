import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../types';

export function useMediaPlayToggle() {
  const dispatch = useMediaDispatch();
  const isPaused = useMediaSelector((state) => state.mediaPaused) ?? true;

  const togglePlay = () => {
    const type = isPaused
      ? MediaActionTypes.MEDIA_PLAY_REQUEST
      : MediaActionTypes.MEDIA_PAUSE_REQUEST;
    dispatch({ type });
  };

  return { isPaused, togglePlay };
}
