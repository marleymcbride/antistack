// Custom type definitions for packages without @types
// Note: React, Node, etc. have proper @types packages installed

declare module 'next/font/google' {
  export const Inter: any;
}

declare module '@vercel/analytics/react' {
  export const Analytics: any;
}

// Lucide React icons (only the ones we use)
declare module 'lucide-react' {
  export const Play: any;
  export const X: any;
  export const ExternalLink: any;
  export const Mail: any;
  export const ShoppingCart: any;
}
