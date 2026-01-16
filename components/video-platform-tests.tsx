// Example implementation for testing different video platforms

import VideoSectionWithTimestamps from "@/components/video-section-with-timestamps";
import { VideoTimestamp } from "@/lib/use-video-timestamps";

// Example timestamps for testing
const testTimestamps: VideoTimestamp[] = [
  {
    id: 'test-cta-30s',
    time: 30, // 30 seconds
    type: 'cta',
    autoTrigger: true,
  },
  {
    id: 'test-popup-60s',
    time: 60, // 1 minute
    type: 'popup',
    autoTrigger: true,
    content: (
      <div className="text-center text-white">
        <h2 className="text-3xl font-bold mb-4">🎯 Test Popup!</h2>
        <p className="text-xl mb-6">
          This popup triggered at 60 seconds. The timestamp system is working!
        </p>
        <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-white font-bold">
          Awesome! Close This
        </button>
      </div>
    ),
  }
];

// Test URLs for different platforms
export const testUrls = {
  youtube: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Rick Roll for testing
  vimeo: "https://vimeo.com/148751763", // Vimeo test video
  wistia: "https://fast.wistia.net/embed/iframe/29b0fbf547", // Wistia demo
  html5: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" // Open source test video
};

// Example component for testing different platforms
export default function VideoTestPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-center">Video Platform Tests</h1>

      {/* YouTube Test */}
      <section>
        <h2 className="text-xl font-bold mb-4">YouTube Test</h2>
        <VideoSectionWithTimestamps
          videoUrl={testUrls.youtube}
          timestamps={testTimestamps}
          showTimestamps={true}
        />
      </section>

      {/* Vimeo Test */}
      <section>
        <h2 className="text-xl font-bold mb-4">Vimeo Test</h2>
        <VideoSectionWithTimestamps
          videoUrl={testUrls.vimeo}
          timestamps={testTimestamps}
          showTimestamps={true}
        />
      </section>

      {/* Wistia Test */}
      <section>
        <h2 className="text-xl font-bold mb-4">Wistia Test</h2>
        <VideoSectionWithTimestamps
          videoUrl={testUrls.wistia}
          timestamps={testTimestamps}
          showTimestamps={true}
        />
      </section>

      {/* HTML5 Test */}
      <section>
        <h2 className="text-xl font-bold mb-4">HTML5 Test</h2>
        <VideoSectionWithTimestamps
          videoUrl={testUrls.html5}
          timestamps={testTimestamps}
          showTimestamps={true}
        />
      </section>
    </div>
  );
}

// Usage instructions:
// 1. Create a test page: /app/video-test/page.tsx
// 2. Import and use this component
// 3. Test each platform to see timestamp triggers
// 4. Check browser console for any errors
// 5. Verify popups appear at 30s and 60s marks
