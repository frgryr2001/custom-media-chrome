// Re-export hooks from media-chrome
export {
  useMediaDispatch,
  useMediaSelector,
  useMediaRef,
  useMediaFullscreenRef,
} from 'media-chrome/react/media-store';

// Custom hooks
export { useMediaPlayToggle } from './useMediaPlayToggle';
export { useMediaMuteToggle } from './useMediaMuteToggle';
export { useMediaFullscreenToggle } from './useMediaFullscreenToggle';
export { useMediaPipToggle } from './useMediaPipToggle';
export { useMediaPlaybackRate } from './useMediaPlaybackRate';
export { useMediaSubtitlesToggle } from './useMediaSubtitlesToggle';