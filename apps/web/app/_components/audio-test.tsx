'use client';

import {
  MediaProviderWrapper,
  MediaVideo,
  MediaPlayButton,
  MediaMuteButton,
  MediaTimeRange,
  MediaVolumeRange,
  MediaTimeDisplay,
  MediaAudio,
  MediaActionTypes,
  useMediaDispatch,
  useMediaSelector,
} from '@repo/media-chrome';
import Image from 'next/image';

export function AudioTest() {

  return (
    <div className="max-w-md mx-auto">
      <MediaProviderWrapper>
        <MediaAudio
          src="https://stream.mux.com/O4h5z00885HEucNNa1rV02wZapcGp01FXXoJd35AHmGX7g/audio.m4a"

        />
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden p-2! flex w-96 items-center gap-2">
          <Image
            src="/icon-alram.png"
            alt="Alarm Icon"
            width={64}
            height={64}
            className="mb-4"
          />
          <MediaTimeRange>
            {({ currentTime, duration, percentage, onChange }) => (
              <div className="space-y-2 mb-4 flex-1">
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

              </div>
            )}
          </MediaTimeRange>
          <MediaPlayButton className='flex-1!'>
            {({ isPaused, onClick }) => (
              <button
                onClick={onClick}
                className="w-12 h-12 rounded-full bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 hover:from-violet-600 hover:via-purple-600 hover:to-fuchsia-600 active:scale-95 text-white flex items-center justify-center shadow-lg transition-all"
              >
                <span className="text-lg">{isPaused ? '▶️' : '⏸️'}</span>
              </button>
            )}
          </MediaPlayButton>
        </div>
      </MediaProviderWrapper>
    </div>
  );
}
