# React rules

- Use functional components with hooks instead of class components
- Use custom hooks for reusable logic
- Use the Context API for state management when needed
- Use proper prop validation with PropTypes
- Use React.memo for performance optimization when necessary
- Use fragments to avoid unnecessary DOM elements
- Use proper list rendering with keys
- Prefer composition over inheritance


# Examples
Not :
export const PlaybackRateButton: React.FC<PlaybackRateButtonProps> = ({
  rates = [0.5, 1, 1.5, 2],
  children,
  className,
  style,
  onClick,
}) => {
  const dispatch = useMediaDispatch();
  const currentRate = useMediaSelector((state) => state.mediaPlaybackRate) ?? 1;

  const handleClick = () => {
    const currentIndex = rates.indexOf(currentRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    dispatch({
      type: MediaActionTypes.MEDIA_PLAYBACK_RATE_REQUEST,
      detail: nextRate,
    });
    onClick?.();
  };

  if (children) {
    return <>{children({ currentRate, onClick: handleClick })}</>;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      style={style}
      aria-label={`Playback rate: ${currentRate}x`}
    >
      {currentRate}x
    </button>
  );
};
Used :
export const PlaybackRateButton: React.FC<PlaybackRateButtonProps> = (props) => {
  const {
  rates = [0.5, 1, 1.5, 2],
  children,
  className,
  style,
  onClick,
} = props;
  const dispatch = useMediaDispatch();
  const currentRate = useMediaSelector((state) => state.mediaPlaybackRate) ?? 1;

  const handleClick = () => {
    const currentIndex = rates.indexOf(currentRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    dispatch({
      type: MediaActionTypes.MEDIA_PLAYBACK_RATE_REQUEST,
      detail: nextRate,
    });
    onClick?.();
  };

  if (children) {
    return <>{children({ currentRate, onClick: handleClick })}</>;
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      style={style}
      aria-label={`Playback rate: ${currentRate}x`}
    >
      {currentRate}x
    </button>
  );
};
