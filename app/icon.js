import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: '#dc2626',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 6,
        }}
      >
        AS
      </div>
    ),
    {
      width: 32,
      height: 32,
    }
  )
}
