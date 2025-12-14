
import {
  MediaProviderWrapper,

  MediaPlayButton,
  MediaMuteButton,
  MediaTimeRange,
  MediaVolumeRange,
  MediaTimeDisplay,
  MediaAudio,
} from '@repo/media-chrome';

export function AudioComponent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Layout 1: Classic Horizontal */}
      <div className="lg:col-span-1">
        <MediaProviderWrapper>
          <MediaAudio
            src="https://stream.mux.com/O4h5z00885HEucNNa1rV02wZapcGp01FXXoJd35AHmGX7g/audio.m4a"
          />
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-xl shadow-lg flex items-center justify-center shrink-0">
                  <span className="text-2xl">🎵</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-slate-900 truncate">
                    Classic Layout
                  </h3>
                  <p className="text-xs text-slate-500">Horizontal</p>
                </div>
              </div>
              <MediaTimeRange>
                {({ currentTime, duration, percentage, onChange }) => (
                  <div className="space-y-2 mb-4">
                    <div className="relative h-1 bg-slate-100 rounded-full overflow-hidden group cursor-pointer">
                      <div
                        className="absolute inset-y-0 left-0 bg-linear-to-r from-violet-500 via-purple-500 to-fuchsia-500 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
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
                    <div className="flex justify-between text-xs text-slate-400">
                      <MediaTimeDisplay className="tabular-nums" />
                      <MediaTimeDisplay className="tabular-nums" showDuration />
                    </div>
                  </div>
                )}
              </MediaTimeRange>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MediaMuteButton.Root>
                    <MediaMuteButton.Muted className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors">
                      <span className="text-sm">🔇</span>
                    </MediaMuteButton.Muted>
                    <MediaMuteButton.Unmuted className="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center transition-colors">
                      <span className="text-sm">🔊</span>
                    </MediaMuteButton.Unmuted>
                  </MediaMuteButton.Root>
                  <MediaVolumeRange>
                    {({ volume, onChange }) => (
                      <div className="w-16 relative">
                        <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-violet-400 to-purple-400 rounded-full"
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
                        />
                      </div>
                    )}
                  </MediaVolumeRange>
                </div>
                <MediaPlayButton.Root>
                  <MediaPlayButton.Paused className="w-12 h-12 rounded-full bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all">
                    <span className="text-lg">▶️</span>
                  </MediaPlayButton.Paused>
                  <MediaPlayButton.Playing className="w-12 h-12 rounded-full bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all">
                    <span className="text-lg">⏸️</span>
                  </MediaPlayButton.Playing>
                </MediaPlayButton.Root>
              </div>
            </div>
          </div>
        </MediaProviderWrapper>
      </div>


    </div>
  );
}
