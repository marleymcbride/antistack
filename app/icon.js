import { NextResponse } from 'next/server'

export async function GET() {
  // Read the SVG file and return it as a Response
  const svg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="6" fill="#dc2626"/>
    <path d="M8 12h16v8H8z" fill="white"/>
  </svg>`

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400'
    }
  })
}
