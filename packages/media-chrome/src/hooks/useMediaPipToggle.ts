import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../types';

export function useMediaPipToggle() {
  const dispatch = useMediaDispatch();
  const isPip = useMediaSelector((state) => state.mediaIsPip) ?? false;

  const togglePip = () => {
    const type = isPip
      ? MediaActionTypes.MEDIA_EXIT_PIP_REQUEST
      : MediaActionTypes.MEDIA_ENTER_PIP_REQUEST;
    dispatch({ type });
  };

  return { isPip, togglePip };
}
