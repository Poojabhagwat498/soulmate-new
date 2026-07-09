import React, { useState, useEffect } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Lucide Icons
import { RotateCw, RotateCcw, X, ChevronLeft, ChevronRight } from 'lucide-react';
// Framer Motion
import { motion } from 'motion/react';

// Plugins
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Counter from 'yet-another-react-lightbox/plugins/counter';

import 'yet-another-react-lightbox/plugins/thumbnails.css';
import 'yet-another-react-lightbox/plugins/counter.css';

interface LightboxGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

export function LightboxGallery({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: LightboxGalleryProps) {
  const [index, setIndex] = useState(initialIndex);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
      setRotation(0);
    }
  }, [isOpen, initialIndex]);

  if (!isOpen || !images || images.length === 0) return null;

  const slides = images.map((img) => ({ src: img }));

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      index={index}
      slides={slides}
      plugins={[Zoom, Thumbnails, Fullscreen, Counter]}
      zoom={{
        maxZoomPixelRatio: 5,
        scrollToZoom: true,
        doubleClickMaxStops: 3,
        doubleTapDelay: 300,
      }}
      thumbnails={{
        position: 'bottom',
        height: 60,
        gap: 8,
      }}
      counter={{
        container: { style: { top: 'unset', bottom: 16, left: 16 } },
      }}
      styles={{
        container: { backgroundColor: 'rgba(0, 0, 0, 0.95)', backdropFilter: 'blur(16px)' } as any,
      }}
      on={{
        view: ({ index }) => {
          setIndex(index);
          setRotation(0);
        }
      }}
      render={{
        controls: () => (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 z-[9999] flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => setRotation((prev) => (prev - 90 + 360) % 360)}
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-90"
              title="Rotate Left"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition-all shadow-md active:scale-90"
              title="Rotate Right"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <style>{`
              .yarl__button {
                background-color: rgba(0, 0, 0, 0.4) !important;
                backdrop-filter: blur(8px) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-radius: 9999px !important;
                width: 44px !important;
                height: 44px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin: 16px !important;
                transition: all 0.2s ease !important;
              }
              .yarl__button:hover {
                background-color: rgba(0, 0, 0, 0.6) !important;
              }
              .yarl__button_prev, .yarl__button_next {
                width: 48px !important;
                height: 48px !important;
                margin: 16px !important;
              }
              .yarl__slide_image {
                transform: rotate(${rotation}deg) !important;
                transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
              }
            `}</style>
          </motion.div>
        ),
        iconClose: () => <X className="w-5 h-5 text-white" />,
        iconPrev: () => <ChevronLeft className="w-6 h-6 text-white" />,
        iconNext: () => <ChevronRight className="w-6 h-6 text-white" />,
      }}
    />
  );
}
