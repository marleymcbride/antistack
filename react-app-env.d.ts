/// <reference types="react" />
/// <reference types="react-dom" />

// Declare global namespace for JSX
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

// Fix for React.ReactNode
declare namespace React {
  type ReactNode =
    | React.ReactElement
    | string
    | number
    | boolean
    | null
    | undefined
    | ReadonlyArray<ReactNode>;
}

// Add Metadata type from Next.js
declare namespace NextJS {
  interface Metadata {
    title?: string;
    description?: string;
    keywords?: string[] | string;
    authors?: { name: string; url?: string }[];
    robots?: string;
    viewport?: string;
    [key: string]: any;
  }
}

// Extend modules
declare module "next/font/google" {
  export function Inter(options: {
    subsets?: string[];
    weight?: string[] | string;
    variable?: string;
    display?: string;
  }): {
    className: string;
    variable: string;
    style: { fontFamily: string };
  };
}

declare module "@vercel/analytics/react" {
  export const Analytics: React.FC<{}>;
}

// For hook-form modules
declare module "react-hook-form" {
  export const useForm: <T extends Record<string, any>>(options?: any) => {
    register: (name: string, options?: any) => any;
    handleSubmit: (onSubmit: (data: T) => any) => (e: any) => void;
    formState: { errors: Record<string, any> };
    reset: () => void;
  };
}

declare module "@hookform/resolvers/zod" {
  export const zodResolver: (schema: any) => any;
}

declare module "zod" {
  export const z: {
    object: (definition: Record<string, any>) => any;
    string: () => {
      email: (message?: string) => any;
      min: (min: number, message?: string) => any;
      optional: () => any;
    };
  };
  export class ZodError extends Error {
    errors: any[];
  }
}

declare module "lucide-react" {
  export const ArrowRight: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Play: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Pause: React.FC<React.SVGProps<SVGSVGElement>>;
  export const Volume2: React.FC<React.SVGProps<SVGSVGElement>>;
  export const VolumeX: React.FC<React.SVGProps<SVGSVGElement>>;
}
