import { useMediaDispatch, useMediaSelector } from 'media-chrome/react/media-store';
import { MediaActionTypes } from '../types';

export function useMediaMuteToggle() {
  const dispatch = useMediaDispatch();
  const volumeLevel = useMediaSelector((state) => state.mediaVolumeLevel) ?? 'high';
  const isMuted = volumeLevel === 'off';

  const toggleMute = () => {
    const type = isMuted
      ? MediaActionTypes.MEDIA_UNMUTE_REQUEST
      : MediaActionTypes.MEDIA_MUTE_REQUEST;
    dispatch({ type });
  };

  return { isMuted, volumeLevel, toggleMute };
}
