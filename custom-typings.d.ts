// This file adds type definitions for modules that might be missing declarations
declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module 'react-dom' {
  import * as ReactDOM from 'react-dom';
  export = ReactDOM;
  export as namespace ReactDOM;
}

declare module 'next' {
  import * as Next from 'next';
  export = Next;
  export as namespace Next;
}

declare module 'next/font/google' {
  export const Inter: any;
}

declare module '@vercel/analytics/react' {
  export const Analytics: any;
}

declare module 'react-hook-form' {
  export const useForm: any;
}

declare module '@hookform/resolvers/zod' {
  export const zodResolver: any;
}

declare module 'zod' {
  export const z: any;
}

declare module 'lucide-react' {
  export const ArrowRight: any;
  export const Play: any;
  export const Pause: any;
  export const Volume2: any;
  export const VolumeX: any;
}
