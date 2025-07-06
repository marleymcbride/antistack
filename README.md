# Anti-Stack Sales Page

A Next.js application for The Limitless Protocol™ - featuring forced choice video overlays and N8N webhook email integration.

## Features

- 🎬 **Forced Choice Video System**: Interactive video overlays that pause at strategic moments
- 📧 **N8N Webhook Integration**: Dual-endpoint email capture with professional error handling
- 🎨 **Brand-Consistent UI**: Red theme (#940909) with Tailwind CSS
- 📱 **Mobile Responsive**: Optimized for all devices
- ⚡ **Performance Optimized**: Built with Next.js 14 and TypeScript

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd anti-stack
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your webhook URLs
   ```

3. **Development**
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

## Deployment

### Vercel (Recommended)

1. **Connect Repository**
   - Link your GitHub repo to Vercel
   - Vercel will auto-detect Next.js configuration

2. **Environment Variables**
   Set these in Vercel Dashboard → Project → Settings → Environment Variables:
   ```
   NEXT_PUBLIC_N8N_PRIMARY_WEBHOOK=https://n8n.marleymcbride.co/systeme-add-contact
   NEXT_PUBLIC_N8N_FALLBACK_WEBHOOK=https://n8n.marleymcbride.co/webhook/systeme-add-contact
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

## Video System

- **Platform Support**: Wistia, YouTube, Vimeo, HTML5
- **Current Setup**: Wistia video ID `nnbkix8deu`
- **Overlay Timing**: 10-second trigger (configurable)
- **Copy Variations**: 14 different psychology-driven messages

## Email Integration

- **Primary Endpoint**: N8N webhook for Systeme.io integration
- **Fallback System**: Dual-endpoint reliability
- **Error Handling**: Specific user-friendly messages
- **Success Flow**: Redirect to `/signup-watch-video`

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Deployment**: Vercel

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes (legacy)
│   ├── page.tsx           # Home page
│   └── signup-watch-video/ # Success page
├── components/            # React components
│   ├── email-signup.tsx   # Main email form
│   ├── video-section-*    # Video player components
│   └── ui/               # Reusable UI components
├── lib/                  # Utilities and hooks
│   ├── use-video-*       # Video control hooks
│   └── video-utils.ts    # Platform utilities
└── public/               # Static assets
```

## Development Notes

- **Video Testing**: Use `/test-forced-choice` for manual testing
- **Copy Variations**: Located in `video-forced-choice-test.tsx`
- **Webhook Testing**: Both endpoints tested during development
- **Error Handling**: Comprehensive logging for debugging

---

Built for The Limitless Protocol™ by Marley McBride
