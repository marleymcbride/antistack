// This file replaces the previous custom-typings.d.ts
// More comprehensive declarations for TypeScript

// React declaration
declare module 'react' {
  export * from 'react';
  export default React;

  // React hooks
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useCallback: any;
  export const useMemo: any;
  export const useContext: any;
  export const useReducer: any;

  // React components
  export const Fragment: any;
  export const Component: any;
  export const PureComponent: any;

  // React JSX
  export const createElement: any;
  export const cloneElement: any;
  export const isValidElement: any;

  // React types
  export type ReactNode = any;
  export type ReactElement = any;
  export type ComponentType<P = any> = any;
  export type FC<P = any> = any;
  export type FunctionComponent<P = any> = any;
  export type ForwardRefExoticComponent<P = any> = any;
  export type ForwardedRef<T> = any;
}

// Next.js declaration
declare module 'next' {
  export * from 'next';
  export default Next;

  export type Metadata = {
    title?: string;
    description?: string;
    keywords?: string[];
    authors?: { name: string }[];
    viewport?: string;
    robots?: string;
    [key: string]: any;
  };
}

// Next/font declaration
declare module 'next/font/google' {
  export function Inter(options: any): any;
}

// Next/image declaration
declare module 'next/image' {
  import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

  export interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    className?: string;
    style?: any;
    sizes?: string;
    [key: string]: any;
  }

  export default function Image(props: ImageProps): JSX.Element;
}

// Vercel Analytics
declare module '@vercel/analytics/react' {
  export function Analytics(props?: any): JSX.Element;
}

// React Hook Form
declare module 'react-hook-form' {
  export function useForm<T = any>(config?: any): {
    register: (name: string, options?: any) => any;
    handleSubmit: (callback: (data: T) => void) => (e: any) => void;
    formState: {
      errors: Record<string, { message?: string }>;
      isSubmitting: boolean;
    };
    reset: () => void;
    setValue: (name: string, value: any) => void;
    getValues: () => T;
    watch: (name?: string) => any;
  };
}

// Zod
declare module 'zod' {
  export const z: {
    object: (schema: any) => any;
    string: () => {
      email: (message?: string) => any;
      min: (length: number, message?: string) => any;
      max: (length: number, message?: string) => any;
      optional: () => any;
    };
    number: () => {
      min: (min: number, message?: string) => any;
      max: (max: number, message?: string) => any;
      optional: () => any;
    };
    boolean: () => any;
    array: (schema: any) => any;
  };

  export class ZodError extends Error {
    errors: Array<{ message: string }>;
  }
}

// Hookform resolvers
declare module '@hookform/resolvers/zod' {
  export function zodResolver(schema: any): any;
}

// Lucide React icons
declare module 'lucide-react' {
  export const ArrowRight: (props: any) => JSX.Element;
  export const Play: (props: any) => JSX.Element;
  export const Pause: (props: any) => JSX.Element;
  export const Volume2: (props: any) => JSX.Element;
  export const VolumeX: (props: any) => JSX.Element;
  export const X: (props: any) => JSX.Element;
  export const Menu: (props: any) => JSX.Element;
  export const Check: (props: any) => JSX.Element;
  export const ChevronDown: (props: any) => JSX.Element;
  export const ChevronUp: (props: any) => JSX.Element;
  export const ExternalLink: (props: any) => JSX.Element;
  export const Mail: (props: any) => JSX.Element;
  export const ShoppingCart: (props: any) => JSX.Element;
}

// Wistia Player API
declare global {
  interface Window {
    Wistia?: {
      api: (videoId: string) => {
        bind: (event: string, callback: (time: number) => void) => void;
        currentTime: () => number;
        duration: () => number;
        play: () => void;
        pause: () => void;
      };
    };
  }
}
