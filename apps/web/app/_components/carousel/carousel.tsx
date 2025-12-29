import {
  MediaPlayButton,
  MediaProviderWrapper,
  MediaTimeRange,
  MediaVideo,
} from '@repo/media-chrome';
import './slick.css';

import React, { Component } from 'react';
import Slider, { Settings } from 'react-slick';

const slides = [
  {
    id: 1,
    type: 'video',
    src: 'https://stream.mux.com/ddBx5002F02xe7ftFvTFkYBxEdQ2inQ2o029CMqu9A4IcY/high.mp4',
    thumbnail: '/banner.png',
    alt: 'Sample Video',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 2,
    type: 'video',
    src: 'https://stream.mux.com/ddBx5002F02xe7ftFvTFkYBxEdQ2inQ2o029CMqu9A4IcY/high.mp4',
    thumbnail: '/banner.png',
    alt: 'Sample Video',
    color: 'from-orange-500 to-red-500',
  },
  {
    id: 3,
    type: 'video',
    src: 'https://stream.mux.com/ddBx5002F02xe7ftFvTFkYBxEdQ2inQ2o029CMqu9A4IcY/high.mp4',
    thumbnail: '/banner.png',
    alt: 'Sample Video',
    color: 'from-orange-500 to-red-500',
  },
];

function CustomPaging() {
  const settings: Settings = {
    customPaging: function (i) {
      return (
        <button className="aspect-[3/5] relative h-[100px] overflow-hidden rounded-lg border-2 border-transparent hover:border-[#5BC6CC] focus:border-[#5BC6CC]">
          <img
            src={slides[i]!.thumbnail}
            className="w-full h-full object-cover"
          />
          <img
            src={"/icon-stop.png"}
            className="size-[30px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </button>
      );
    },
    infinite: true,
    speed: 500,
    dots: true,
    nextArrow: <div />,
    prevArrow: <div />,
    dotsClass: 'slick-dots slick-dots-thumb',
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: true
    // adaptiveHeight: true,
  };
  return (
    <div className="aspect-3/5 w-[600px] h-[1000px] mx-auto ">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            {slide.type === 'image' ? (
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover!"
              />
            ) : (
              //   <video
              //     src={slide.src}
              //     poster={slide.thumbnail}
              //     className="w-full h-full object-cover"
              //     controls
              //   />

              <MediaProviderWrapper className="relative w-full h-full">
                <MediaVideo
                  src={slide.src}
                  className="w-full h-full object-cover cursor-pointer"
                  poster={slide.thumbnail}
                />

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-6 max-w-[500px] mx-auto">
                  <div className="flex justify-center items-center">
                    <div className="flex-1">
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
                                onChange={(e) =>
                                  onChange(Number(e.target.value))
                                }
                                className="absolute inset-0 w-full opacity-0 cursor-pointer"
                                aria-label="Seek"
                              />
                            </div>
                          </div>
                        )}
                      </MediaTimeRange>
                    </div>

                    <div className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center">
                      <MediaPlayButton.Root>
                        <MediaPlayButton.Paused className="text-white">
                          Play
                        </MediaPlayButton.Paused>
                        <MediaPlayButton.Playing className="text-white">
                          Paused
                        </MediaPlayButton.Playing>
                      </MediaPlayButton.Root>
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Play Button */}
                    </div>
                  </div>
                </div>
              </MediaProviderWrapper>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CustomPaging;
