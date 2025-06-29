# Video Timestamp Actions - Implementation Guide

## Quick Setup

Replace your current `VideoSection` with `VideoSectionWithTimestamps` to enable timestamp-based popups and CTAs.

### Basic Implementation:

```tsx
import VideoSectionWithTimestamps from "@/components/video-section-with-timestamps";

// In your page component:
<VideoSectionWithTimestamps />
```

## 🎥 SUPPORTED VIDEO PLATFORMS

### ✅ **YouTube**
```bash
# Supported URL formats:
https://www.youtube.com/watch?v=VIDEO_ID
https://youtu.be/VIDEO_ID
https://www.youtube.com/embed/VIDEO_ID
```

### ✅ **Vimeo**
```bash
# Supported URL formats:
https://vimeo.com/VIDEO_ID
https://player.vimeo.com/video/VIDEO_ID
```

### ✅ **Wistia**
```bash
# Supported URL formats:
https://company.wistia.com/medias/VIDEO_ID
https://fast.wistia.net/embed/iframe/VIDEO_ID
```

### ✅ **HTML5 Video**
```bash
# Any direct video file:
https://example.com/video.mp4
https://example.com/video.webm
```

## Environment Setup

Add your video URL to `.env.local`:

```bash
# Any platform supported:
NEXT_PUBLIC_VIDEO_URL=https://www.youtube.com/watch?v=YOUR_VIDEO_ID
# OR
NEXT_PUBLIC_VIDEO_URL=https://vimeo.com/YOUR_VIDEO_ID
# OR
NEXT_PUBLIC_VIDEO_URL=https://company.wistia.com/medias/YOUR_VIDEO_ID
# OR
NEXT_PUBLIC_VIDEO_URL=https://yourserver.com/video.mp4
```

### Custom Timestamps:

```tsx
const customTimestamps = [
  {
    id: 'early-hook',
    time: 30, // 30 seconds
    type: 'cta',
    autoTrigger: true,
  },
  {
    id: 'main-offer',
    time: 180, // 3 minutes
    type: 'popup',
    autoTrigger: true,
  },
  {
    id: 'final-push',
    time: 420, // 7 minutes
    type: 'popup',
    content: (
      <div className="text-center text-white">
        <h2 className="text-3xl font-bold mb-4">⚡ Final Call!</h2>
        <p className="text-xl mb-6">
          This offer expires when the video ends...
        </p>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-lg font-bold">
          CLAIM YOUR SPOT NOW
        </Button>
      </div>
    ),
  },
];

<VideoSectionWithTimestamps
  timestamps={customTimestamps}
  showTimestamps={true}
  videoUrl="https://your-custom-video-url.com" // Optional: override env var
/>
```

## Platform-Specific Features

### **YouTube Integration**
- ✅ Automatic API detection and loading
- ✅ PostMessage communication for timestamp tracking
- ✅ Fallback polling for reliable timestamps
- ✅ Auto-embed URL formatting

### **Vimeo Integration**
- ✅ Player API with timeupdate events
- ✅ PostMessage communication
- ✅ Auto-embed URL formatting with API access
- ✅ Custom player controls

### **Wistia Integration**
- ✅ Wistia Player API integration
- ✅ Automatic script loading (`E-v1.js`)
- ✅ Real-time timestamp tracking
- ✅ Auto-embed URL formatting

### **HTML5 Integration**
- ✅ Native `timeupdate` events
- ✅ Custom video controls
- ✅ Full browser compatibility
- ✅ No external dependencies

## Timestamp Types

### 1. **Popup Modal** (`type: 'popup'`)
- Full-screen overlay
- Perfect for main offers/CTAs
- Can contain custom content

### 2. **Slide-in CTA** (`type: 'cta'`)
- Bottom-right corner notification
- Less intrusive than popup
- Great for soft CTAs

### 3. **Auto-Redirect** (`type: 'redirect'`)
- Automatically opens URL
- Use sparingly
- Perfect for urgency moments

### 4. **Content Replacement** (`type: 'content'`)
- Replace content below video
- Good for progressive reveals
- Maintains video focus

## Configuration Options

```tsx
interface VideoTimestamp {
  id: string;                    // Unique identifier
  time: number;                  // Seconds into video
  type: 'popup' | 'cta' | 'content' | 'redirect';
  content?: React.ReactNode;     // Custom JSX content
  url?: string;                  // For redirects
  autoTrigger?: boolean;         // Default: true
}
```

## Common Use Cases

### **Sales Video Sequence:**
```tsx
const salesSequence = [
  // Hook them early
  { id: 'hook', time: 45, type: 'cta' },

  // Main offer after problem/solution
  { id: 'offer', time: 240, type: 'popup' },

  // Social proof moment
  { id: 'proof', time: 360, type: 'cta' },

  // Final urgency
  { id: 'final', time: 480, type: 'popup', content: <UrgencyOffer /> },
];
```

### **Lead Magnet Sequence:**
```tsx
const leadSequence = [
  // Early value
  { id: 'value1', time: 90, type: 'cta' },

  // Main lead magnet
  { id: 'leadMagnet', time: 300, type: 'popup' },

  // Final reminder
  { id: 'reminder', time: 420, type: 'cta' },
];
```

## Advanced Customization

### Custom Popup Content:
```tsx
const customContent = (
  <div className="text-center text-white">
    <h2 className="text-4xl font-bold mb-4">🎯 Perfect Timing!</h2>
    <p className="text-xl mb-6">
      Since you've watched this far, you're clearly serious about transformation...
    </p>

    <div className="bg-yellow-500 text-black p-4 rounded-lg mb-6">
      <p className="font-bold text-lg">SPECIAL OFFER</p>
      <p>Get 50% off if you join in the next 10 minutes</p>
    </div>

    <form onSubmit={handleEmailSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Enter email for instant access..."
        className="text-black"
      />
      <Button className="w-full bg-green-600 hover:bg-green-700 py-3">
        CLAIM 50% DISCOUNT NOW →
      </Button>
    </form>
  </div>
);
```

### Platform-Specific URLs:
```tsx
// Different URLs for different environments/tests
const videoUrls = {
  youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  vimeo: "https://vimeo.com/123456789",
  wistia: "https://company.wistia.com/medias/abc123def456",
  html5: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
};

<VideoSectionWithTimestamps
  videoUrl={videoUrls.wistia}
  timestamps={customTimestamps}
/>
```

### Disable for Specific Pages:
```tsx
// On main page - show timestamps
<VideoSectionWithTimestamps showTimestamps={true} />

// On thank you page - no timestamps
<VideoSectionWithTimestamps showTimestamps={false} />
```

## Platform Setup Instructions

### **For Wistia:**
1. Upload your video to Wistia
2. Get the media ID from the Wistia URL or embed code
3. Set `NEXT_PUBLIC_VIDEO_URL=https://yourcompany.wistia.com/medias/MEDIA_ID`
4. System automatically loads Wistia Player API

### **For Vimeo:**
1. Upload video to Vimeo (Pro account recommended for API access)
2. Get video ID from Vimeo URL
3. Set `NEXT_PUBLIC_VIDEO_URL=https://vimeo.com/VIDEO_ID`
4. API automatically enabled for timestamp tracking

### **For YouTube:**
1. Upload video to YouTube
2. Get video ID from YouTube URL
3. Set `NEXT_PUBLIC_VIDEO_URL=https://www.youtube.com/watch?v=VIDEO_ID`
4. API automatically enabled

## Best Practices

1. **Don't Overdo It**: 2-4 timestamps max per video
2. **Strategic Timing**: Trigger after value/problem moments
3. **Progressive Urgency**: Build urgency as video progresses
4. **Mobile Friendly**: All components are responsive
5. **Test Different Platforms**: Each has slightly different tracking accuracy
6. **Platform Choice**:
   - **Wistia**: Most accurate tracking, best for sales videos
   - **Vimeo**: Professional appearance, good tracking
   - **YouTube**: Widest compatibility, some tracking limitations
   - **HTML5**: Full control, but requires hosting

## Debugging & Development

In development mode, you'll see a platform indicator in the top-left corner of the video showing:
- Platform type (YOUTUBE, VIMEO, WISTIA, HTML5)
- Video ID (when detected)

## Quick Start Recommendations

### **For Lead Generation:**
- 30s: Soft CTA slide-in
- 3min: Main email capture popup
- 6min: Final reminder CTA

### **For Sales:**
- 1min: Value-based CTA
- 4min: Main offer popup (after problem)
- 7min: Urgency popup with timer

### **For Course Preview:**
- 2min: "Want the full course?" CTA
- 5min: Special discount popup
- 8min: Last chance offer

## Migration from Original VideoSection

### Simple Migration:
```tsx
// Before:
import VideoSection from "@/components/video-section";
<VideoSection />

// After:
import VideoSectionWithTimestamps from "@/components/video-section-with-timestamps";
<VideoSectionWithTimestamps showTimestamps={false} /> // Disable if you don't want timestamps yet
```

Ready to implement? The system now works with **any major video platform** and provides precise timestamp tracking for maximum conversion optimization!
