import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import {
  cn,
  MediaPlayButton,
  MediaProviderWrapper,
  MediaTimeRange,
  MediaVideo,

} from '@repo/media-chrome';

interface CarouselContextValue {
  currentIndex: number;
  totalItems: number;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

const CarouselContext = createContext<CarouselContextValue | undefined>(
  undefined
);

const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(
      'Carousel compound components must be used within Carousel'
    );
  }
  return context;
};

interface CarouselProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  defaultIndex?: number;
  onSlideChange?: (index: number) => void;
}

const CarouselRoot = ({
  children,
  defaultIndex = 0,
  onSlideChange,
  className = '',
  ...props
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [totalItems, setTotalItems] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      onSlideChange?.(index);
    },
    [onSlideChange]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const value: CarouselContextValue = {
    currentIndex,
    totalItems,
    goToSlide,
    nextSlide,
    prevSlide,
  };

  return (
    <CarouselContext.Provider value={value}>
      <div className={cn('relative overflow-hidden', className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === CarouselSlides) {
            return React.cloneElement(child, { setTotalItems } as any);
          }
          return child;
        })}
      </div>
    </CarouselContext.Provider>
  );
};

interface CarouselSlidesProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
  setTotalItems?: (count: number) => void;
}

const CarouselSlides = ({
  children,
  setTotalItems,
  className = '',
  ...props
}: CarouselSlidesProps) => {
  const { currentIndex } = useCarousel();
  const slides = React.Children.toArray(children);

  useEffect(() => {
    setTotalItems?.(slides.length);
  }, [slides.length, setTotalItems]);

  return (
    <div className={cn('relative w-full h-full', className)} {...props}>
      <div
        className={cn('flex transition-transform duration-500 ease-out h-full')}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className={cn('min-w-full h-full flex-shrink-0')}>
            {slide}
          </div>
        ))}
      </div>
    </div>
  );
};

interface CarouselSlideProps extends ComponentPropsWithoutRef<'div'> {
  type?: 'image' | 'video';
  src?: string;
}

const CarouselSlide = ({
  type,
  src,
  className = '',
  ...props
}: CarouselSlideProps) => {
  return (
    <div className={cn('relative w-full h-full', className)} {...props}>
      {type === 'image' ? (
        <img
          src={src}
          alt="Carousel Slide"
          className={cn(
            'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
          )}
        />
      ) : (
        <MediaPlayerWrapper
          src={src as string}
          poster={
            'https://images.unsplash.com/photo-1551782450-a2132b4ba21d'
          }
        />
      )}
    </div>
  );
};

interface MediaPlayerWrapperProps {
  src: string;
  poster?: string;
}

const MediaPlayerWrapper = ({ src, poster }: MediaPlayerWrapperProps) => {
  return (
    <MediaProviderWrapper className="relative w-full h-full">
      <MediaVideo
        src={src}
        className="w-full h-full object-cover cursor-pointer"
        poster={poster}
      />
      <MediaPlayButton.Root>
        <MediaPlayButton.Paused className="w-full h-full absolute top-0 left-0 flex items-center justify-center cursor-pointer transition-opacity opacity-0 hover:opacity-20" />
        <MediaPlayButton.Playing className="w-full h-full absolute top-0 left-0 flex items-center justify-center cursor-pointer transition-opacity opacity-100" />
      </MediaPlayButton.Root>

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
                      onChange={(e) => onChange(Number(e.target.value))}
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
              <MediaPlayButton.Paused className="text-white">Play</MediaPlayButton.Paused>
              <MediaPlayButton.Playing className="text-white">Paused</MediaPlayButton.Playing>
            </MediaPlayButton.Root>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">{/* Play Button */}</div>
        </div>
      </div>
    </MediaProviderWrapper>
  );
};

interface CarouselThumbnailsProps extends ComponentPropsWithoutRef<'div'> {
  children: ReactNode;
}

const CarouselThumbnails = ({
  children,
  className = '',
  ...props
}: CarouselThumbnailsProps) => {
  return (
    <div className={cn('flex gap-2', className)} {...props}>
      {children}
    </div>
  );
};

interface CarouselThumbnailProps extends ComponentPropsWithoutRef<'button'> {
  index: number;
  children: ReactNode;
}

const CarouselThumbnail = ({
  index,
  children,
  className = '',
  ...props
}: CarouselThumbnailProps) => {
  const { currentIndex, goToSlide } = useCarousel();
  const isActive = currentIndex === index;

  return (
    <button
      onClick={() => goToSlide(index)}
      className={cn(
        'flex-shrink-0 transition-all',
        isActive
          ? 'ring-2 ring-[#5BC6CC] opacity-100'
          : 'opacity-60 hover:opacity-100',
        className
      )}
      aria-label={`Go to slide ${index + 1}`}
      aria-current={isActive}
      {...props}
    >
      {children}
    </button>
  );
};

export const Carousel = {
  Root: CarouselRoot,
  Slides: CarouselSlides,
  Slide: CarouselSlide,
  Thumbnails: CarouselThumbnails,
  Thumbnail: CarouselThumbnail,
};
