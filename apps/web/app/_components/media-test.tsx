'use client';

import {
  MediaProviderWrapper,
  MediaAudio,
  MediaPlayButton,
  MediaPlayerLoading,
  MediaPlayerError,
  MediaVideo,
} from '@repo/media-chrome';

export function MediaTest() {
  return (
    <div className="max-w-2xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-bold">Media Player Test</h1>

      {/* Test 1: Normal Audio Player with Loading */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-lg font-semibold mb-4">Test 1: Loading State</h2>
        <p className="text-sm text-gray-600 mb-4">
          🔍 Use Chrome DevTools → Network → Throttling: "Slow 3G" to see
          loading state clearly
        </p>
        <MediaProviderWrapper>
          <div className="relative min-h-[200px]">
            <MediaAudio
              src="https://stream.mux.com/O4h5z00885HEucNNa1rV02wZapcGp01FXXoJd35AHmGX7g/audio.m4a"
              className="w-full mb-4"
              preload="none"
            />

            {/* Debug Info */}
            <MediaPlayerLoading delayMs={0}>
              {({ isLoading, shouldShowLoading }) => (
                <div className="mb-4 p-3 bg-gray-50 rounded text-xs font-mono">
                  <div>
                    shouldShowLoading:{' '}
                    <span
                      className={
                        shouldShowLoading
                          ? 'text-green-600 font-bold'
                          : 'text-gray-400'
                      }
                    >
                      {String(shouldShowLoading)}
                    </span>
                  </div>
                  <div>
                    isLoading (visible):{' '}
                    <span
                      className={
                        isLoading ? 'text-blue-600 font-bold' : 'text-gray-400'
                      }
                    >
                      {String(isLoading)}
                    </span>
                  </div>
                </div>
              )}
            </MediaPlayerLoading>

            {/* Loading Overlay */}
            <MediaPlayerLoading delayMs={0}>
              {({ isLoading }) =>
                isLoading ? (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm rounded-lg z-10">
                    <div className="bg-white rounded-full p-4 shadow-lg">
                      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  </div>
                ) : null
              }
            </MediaPlayerLoading>

            <div className="flex gap-2">
              <MediaPlayButton className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                {({ isPaused }) => (
                  <span>{isPaused ? '▶️ Play' : '⏸️ Pause'}</span>
                )}
              </MediaPlayButton>
            </div>
          </div>
        </MediaProviderWrapper>
      </div>

      {/* Test 2: Invalid URL - Error State */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-lg font-semibold mb-4">Test 2: Error State</h2>
        <MediaProviderWrapper>
          <div className="relative">
            <MediaVideo
              src="https://stream.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/high.mp4"
              poster="https://image.mux.com/DS00Spx1CV902MCtPj5WknGlR102V5HFkDe/thumbnail.jpg"
              className="w-full mb-4"
            />

            {/* Error Overlay */}
            <MediaPlayerError>
              {({
                error,
                errorLabel,
                errorDescription,
                onRetry,
                retryPending,
              }) =>
                error ? (
                  <div className="absolute inset-0 bg-red-50 border-2 border-red-200 rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h3 className="text-xl font-bold text-red-700 mb-2">
                      {errorLabel}
                    </h3>
                    <p className="text-sm text-red-600 mb-4 text-center">
                      {errorDescription}
                    </p>
                    <button
                      onClick={onRetry}
                      disabled={retryPending}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                    >
                      {retryPending ? '🔄 Retrying...' : '🔄 Try Again'}
                    </button>
                  </div>
                ) : null
              }
            </MediaPlayerError>

            <MediaPlayButton className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {({ isPaused }) => (
                <span>{isPaused ? '▶️ Play' : '⏸️ Pause'}</span>
              )}
            </MediaPlayButton>
          </div>
        </MediaProviderWrapper>
      </div>

      {/* Test 3: Default UI (no render props) */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-lg font-semibold mb-4">Test 3: Default UI</h2>
        <MediaProviderWrapper>
          <div className="relative">
            <MediaAudio
              src="https://stream.mux.com/O4h5z00885HEucNNa1rV02wZapcGp01FXXoJd35AHmGX7g/audio.m4a"
              className="w-full mb-4"
            />

            {/* Default Loading UI */}
            <MediaPlayerLoading className="absolute inset-0 bg-white/80 flex items-center justify-center" />

            {/* Default Error UI */}
            <MediaPlayerError className="absolute inset-0 bg-red-50" />

            <MediaPlayButton />
          </div>
        </MediaProviderWrapper>
      </div>

      {/* Test 4: Slow Network Simulation */}
      <div className="border rounded-lg p-6 bg-white">
        <h2 className="text-lg font-semibold mb-4">
          Test 4: Loading with Delay
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Loading indicator appears after 1000ms delay
        </p>
        <MediaProviderWrapper>
          <div className="relative h-32">
            <MediaAudio
              src="https://stream.mux.com/O4h5z00885HEucNNa1rV02wZapcGp01FXXoJd35AHmGX7g/audio.m4a"
              preload="none"
            />

            <MediaPlayerLoading delayMs={1000}>
              {({ isLoading, shouldShowLoading }) => (
                <div className="mb-4 p-4 bg-gray-100 rounded">
                  <p className="text-sm">
                    shouldShowLoading:{' '}
                    <strong>{shouldShowLoading ? 'true' : 'false'}</strong>
                  </p>
                  <p className="text-sm">
                    isLoading (after delay):{' '}
                    <strong>{isLoading ? 'true' : 'false'}</strong>
                  </p>
                  {isLoading && (
                    <div className="mt-2 text-center">
                      <div className="inline-block w-6 h-6 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              )}
            </MediaPlayerLoading>

            <MediaPlayButton className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              {({ isPaused }) => (
                <span>{isPaused ? '▶️ Play' : '⏸️ Pause'}</span>
              )}
            </MediaPlayButton>
          </div>
        </MediaProviderWrapper>
      </div>

      {/* Instructions */}
      <div className="border-l-4 border-blue-500 bg-blue-50 p-4">
        <h3 className="font-semibold mb-2">📝 Testing Instructions:</h3>
        <ul className="text-sm space-y-1 list-disc list-inside">
          <li>
            <strong>Test 1:</strong> Click Play - should see loading spinner
            briefly
          </li>
          <li>
            <strong>Test 2:</strong> Will show error immediately (invalid URL)
          </li>
          <li>
            <strong>Test 3:</strong> Default UI without custom styling
          </li>
          <li>
            <strong>Test 4:</strong> Loading only appears after 1s delay
          </li>
        </ul>
      </div>
    </div>
  );
}
