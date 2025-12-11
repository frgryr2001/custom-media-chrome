'use client';

import {
  MediaProviderWrapper,
  MediaVideo,
  MediaPlayButton,
  MediaMuteButton,
  MediaTimeRange,
  MediaVolumeRange,
  MediaFullscreenButton,
  MediaTimeDisplay,
} from '@repo/media-chrome';

export function VideoComponent() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <MediaProviderWrapper className="overflow-hidden">
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-200/60">
          <MediaPlayButton asChild>
            {({ isPaused, onClick }) => (
              <div onClick={onClick} className={`w-full h-full absolute top-0 left-0 flex items-center justify-center cursor-pointer transition-opacity ${isPaused ? 'opacity-0 hover:opacity-20' : 'opacity-100'}`}>
                <MediaVideo
                  src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
                  muted
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            )}
          </MediaPlayButton>

          {/* Video Controls Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6">
            {/* Progress Bar */}
            <div className="mb-4">
              <MediaTimeRange>
                {({ currentTime, duration, percentage, onChange }) => (
                  <div className="space-y-2">
                    <div className="relative h-1 bg-white/20 rounded-full overflow-hidden group cursor-pointer">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 rounded-full transition-all duration-200"
                        style={{ width: `${percentage}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={duration || 100}
                        value={currentTime}
                        onChange={(e) => onChange(Number(e.target.value))}
                        className="absolute inset-0 w-full opacity-0 cursor-pointer"
                        aria-label="Seek"
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs font-medium text-white/80">
                      <MediaTimeDisplay className="tabular-nums" showDuration />
                    </div>
                  </div>
                )}
              </MediaTimeRange>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play Button */}

                {/* Volume Controls */}
                <div className="flex items-center gap-2">
                  <MediaMuteButton>
                    {({ isMuted, volumeLevel, onClick }) => (
                      <button
                        onClick={onClick}
                        className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        <span className="text-base text-white">
                          {isMuted
                            ? '🔇'
                            : volumeLevel === 'high'
                              ? '🔊'
                              : volumeLevel === 'medium'
                                ? '🔉'
                                : '🔈'}
                        </span>
                      </button>
                    )}
                  </MediaMuteButton>
                  <MediaVolumeRange>
                    {({ volume, onChange }) => (
                      <div className="w-20 relative group">
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all"
                            style={{ width: `${volume * 100}%` }}
                          />
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.01}
                          value={volume}
                          onChange={(e) => onChange(Number(e.target.value))}
                          className="absolute inset-0 w-full opacity-0 cursor-pointer"
                          aria-label="Volume"
                        />
                      </div>
                    )}
                  </MediaVolumeRange>
                </div>
              </div>

              {/* Fullscreen Button */}
              <div className="flex items-center gap-2">
                <MediaFullscreenButton>
                  {({ isFullscreen, onClick }) => (
                    <button
                      onClick={onClick}
                      className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                      aria-label={
                        isFullscreen ? 'Exit fullscreen' : 'Fullscreen'
                      }
                    >
                      <span className="text-base text-white">
                        {isFullscreen ? '⛶' : '⛶'}
                      </span>
                    </button>
                  )}
                </MediaFullscreenButton>

                <MediaPlayButton>
                  {({ isPaused, onClick }) => (
                    <button
                      onClick={onClick}
                      className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                      aria-label={isPaused ? 'Play' : 'Pause'}
                    >
                      <span className="text-xl text-white">
                        {isPaused ? '▶️' : '⏸️'}
                      </span>
                    </button>
                  )}
                </MediaPlayButton>
              </div>
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="mt-4 px-2">
          <h3 className="text-lg font-semibold text-slate-900">
            Demo Video Stream
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            High-quality video streaming example
          </p>
        </div>
      </MediaProviderWrapper>
    </div>
  );
}
