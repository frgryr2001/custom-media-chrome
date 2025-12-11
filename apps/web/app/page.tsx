'use client';

import { AudioComponent } from './_components/audio-component';
import { AudioTest } from './_components/audio-test';
import { VideoComponent } from './_components/video-component';
import { MediaTest } from './_components/media-test';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-8 w-full">
      <div className="w-full mx-auto space-y-16">
        {/* Test Loading & Error */}
        <div>
          <MediaTest />
        </div>
        {/* Video Player */}
        <div>
          <h2 className="text-3xl font-bold mb-6 text-slate-800">
            🎬 Video Player
          </h2>
          <VideoComponent />
        </div>

        {/* Audio Player */}
        <div className="flex">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              🎵 Audio Player
            </h2>
            <AudioComponent />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">
              🎵 Audio from Figma
            </h2>
            <AudioTest />
          </div>
        </div>
      </div>
    </div>
  );
}
