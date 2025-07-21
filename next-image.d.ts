// Extended type definitions for Next.js Image component

import React from 'react';

declare module 'next/image' {
  interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    sizes?: string;
    quality?: number;
    priority?: boolean;
    placeholder?: 'blur' | 'empty';
    style?: React.CSSProperties;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
    loading?: 'lazy' | 'eager';
    blurDataURL?: string;
    layout?: 'fixed' | 'intrinsic' | 'responsive' | 'fill';
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    objectPosition?: string;
    lazyBoundary?: string;
    unoptimized?: boolean;
  }

  export default function Image(props: ImageProps): JSX.Element;
}
