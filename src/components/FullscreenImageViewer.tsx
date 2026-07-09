import React from 'react';
import { LightboxGallery } from './LightboxGallery';

interface FullscreenImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

export function FullscreenImageViewer({
  isOpen,
  onClose,
  images,
  initialIndex = 0,
}: FullscreenImageViewerProps) {
  return (
    <LightboxGallery
      isOpen={isOpen}
      onClose={onClose}
      images={images}
      initialIndex={initialIndex}
    />
  );
}

