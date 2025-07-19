'use client';

import React from 'react';
import VideoSectionWithForcedChoice from './video-section-with-forced-choice';

// Helper function to format time in MM:SS format
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function VideoForcedChoiceTest() {
  const [wistiaStatus, setWistiaStatus] = React.useState({
    scriptLoaded: false,
    apiReady: false
  });

  // Check Wistia status periodically
  React.useEffect(() => {
    const checkWistiaStatus = () => {
      setWistiaStatus({
        scriptLoaded: !!(window.Wistia),
        apiReady: !!(window.Wistia && window.Wistia.api)
      });
    };

    // Check immediately
    checkWistiaStatus();

    // Check every second
    const interval = setInterval(checkWistiaStatus, 1000);

    return () => clearInterval(interval);
  }, []);
  // COPY VARIATIONS FOR A/B TESTING - Optimized for Overlay Display
  const copyVariations = {
    // Variation A: Drag vs Glide Energy (Core concept) - CONCISE
    dragVsGlide: {
      triggerTime: 10,
      overlayText: "Tired of DRAG ENERGY? That 3pm crash, caffeine dependency, constant fatigue?",
      mainButtonText: "UNLOCK GLIDE ENERGY →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation B: 4% Trap (Scott's current situation) - SHORTENED
    fourPercentTrap: {
      triggerTime: 10,
      overlayText: "You're health-conscious, hit the gym, watch your diet... but stuck in the 4% TRAP.",
      mainButtonText: "BREAK INTO THE 1% →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation C: Anti-Stack Direct (Solution focused) - PUNCHY
    antiStackDirect: {
      triggerTime: 10,
      overlayText: "Ready to quit caffeine without the crashes? The Anti-Stack™ works.",
      mainButtonText: "GET THE ANTI-STACK →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation D: Executive Pain Point (Scott's morning struggle) - TARGETED
    executivePain: {
      triggerTime: 10,
      overlayText: "Wake up exhausted? Need 3 coffees to function? Brain fog at 4pm?",
      mainButtonText: "FIX MY ENERGY →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation E: Freedom > Frequency (Contrarian approach) - SHARP
    freedomOverFrequency: {
      triggerTime: 10,
      overlayText: "Stop training 5-7 days a week. Get better results with 2-3 sessions.",
      mainButtonText: "TRAIN LESS, ACHIEVE MORE →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation F: Natty Sweet Spot (Ultimate Male Form) - POWERFUL
    nattySweetSpot: {
      triggerTime: 10,
      overlayText: "The Natty Sweet Spot™: Where strength, energy, and aesthetics converge. No substances.",
      mainButtonText: "REACH THE SWEET SPOT →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation G: Lion vs Worker Bee (Lifestyle contrast) - IDENTITY
    lionVsWorkerBee: {
      triggerTime: 10,
      overlayText: "LION: Rest, recover, then dominate. WORKER BEE: Grind until burnout. Which are you?",
      mainButtonText: "BECOME THE LION →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation H: Time-focused (Scott's biggest constraint) - DIRECT
    timeFocused: {
      triggerTime: 10,
      overlayText: "Work 12-16 hour days? No time for complex diets? This system fits your schedule.",
      mainButtonText: "FITS MY SCHEDULE →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation I: Social Proof + Results (High conversion) - CREDIBLE
    socialProof: {
      triggerTime: 10,
      overlayText: "742+ executives ditched caffeine using this. Client L: -35lbs, 15 months sober.",
      mainButtonText: "JOIN THE 742 →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation J: ROI/Business Focus (Scott's language) - BUSINESS
    businessRoi: {
      triggerTime: 10,
      overlayText: "Your energy = your most valuable asset. Stop trading performance for quick fixes.",
      mainButtonText: "MAXIMIZE MY ROI →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation K: Direct Challenge (Polarizing) - PROVOCATIVE
    directChallenge: {
      triggerTime: 10,
      overlayText: "Still depending on caffeine like a crutch? Time to fuel your body properly.",
      mainButtonText: "EVOLVE NOW →",
      redirectUrl: "https://your-sales-page.com"
    },

    // Variation L: Fear of Missing Out (Urgency) - COMPETITIVE
    fomo: {
      triggerTime: 10,
      overlayText: "While you crash at 3pm, the 1% operate at peak energy all day. Join them.",
      mainButtonText: "JOIN THE 1% →",
      redirectUrl: "https://your-sales-page.com"
    },

    // NEW Variation M: Short & Shocking - MINIMAL
    shocking: {
      triggerTime: 10,
      overlayText: "3 coffees a day = 30 years off your life expectancy.",
      mainButtonText: "BREAK THE CYCLE →",
      redirectUrl: "https://your-sales-page.com"
    },

    // NEW Variation N: Question Hook - ENGAGING
    questionHook: {
      triggerTime: 10,
      overlayText: "What if you could have unlimited energy without caffeine, alcohol, or stimulants?",
      mainButtonText: "SHOW ME HOW →",
      redirectUrl: "https://your-sales-page.com"
    }
  };

  // CURRENT TEST - Easy to change for different tests
  const currentVariation = copyVariations.shocking; // ← Change this to test different versions

  const handleMainAction = () => {
    console.log('Main action clicked! Variation:', Object.keys(copyVariations).find((key) =>
      copyVariations[key as keyof typeof copyVariations] === currentVariation
    ));
    // Additional tracking or analytics can go here
  };

  return (
    <div className="min-h-screen bg-zinc-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-white text-center mb-2">
          Limitless Copy Variations - A/B Testing
        </h1>
        <p className="text-zinc-400 text-center mb-4">
          Currently Testing: <span className="text-yellow-400 font-bold">
            {Object.keys(copyVariations).find((key) => copyVariations[key as keyof typeof copyVariations] === currentVariation)?.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </span>
        </p>
        <p className="text-zinc-400 text-center mb-12">
          Overlay at {currentVariation.triggerTime} seconds - {currentVariation.overlayText.slice(0, 50)}...
        </p>

        {/* Test with Wistia video */}
        <VideoSectionWithForcedChoice
          videoUrl="https://fast.wistia.com/embed/medias/nnbkix8deu"
          forcedChoiceConfig={currentVariation}
          title="Click Play - Test the Current Variation"
          onMainAction={handleMainAction}
        />

        {/* Timestamp Information Display */}
        <div className="mt-6 text-center">
          <div className="inline-block bg-zinc-800 px-4 py-2 rounded-lg border border-zinc-600">
            <span className="text-zinc-400 text-sm">Overlay triggers at video timestamp: </span>
            <span className="text-yellow-400 font-mono font-bold">
              {formatTime(currentVariation.triggerTime)}
            </span>
          </div>
          <p className="text-zinc-500 text-xs mt-2">
            ✅ Enhanced Wistia video timestamp tracking with debugging and fallbacks - check console for detailed tracking
          </p>

        </div>

        {/* Variation Selector for Quick Testing */}
        <div className="mt-8 bg-zinc-800 p-6 rounded-lg">
          <h3 className="text-white font-bold text-lg mb-4">🧪 Copy Variation A/B Testing</h3>
          <p className="text-zinc-400 text-sm mb-4">
            To test different variations, change line 123 in the code to test different psychological approaches:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">dragVsGlide</code>
              <p className="text-zinc-300 mt-1 text-xs">CONCISE: Core Limitless concept awareness</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">fourPercentTrap</code>
              <p className="text-zinc-300 mt-1 text-xs">SHORTENED: Scott&apos;s current situation recognition</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">antiStackDirect</code>
              <p className="text-zinc-300 mt-1 text-xs">PUNCHY: Solution-focused messaging</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">executivePain</code>
              <p className="text-zinc-300 mt-1 text-xs">TARGETED: Direct pain point targeting</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">freedomOverFrequency</code>
              <p className="text-zinc-300 mt-1 text-xs">SHARP: Contrarian fitness approach</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">nattySweetSpot</code>
              <p className="text-zinc-300 mt-1 text-xs">POWERFUL: Natural/no-substance positioning</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">lionVsWorkerBee</code>
              <p className="text-zinc-300 mt-1 text-xs">IDENTITY: Lifestyle identity contrast</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">timeFocused</code>
              <p className="text-zinc-300 mt-1 text-xs">DIRECT: Time constraint solution</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">socialProof</code>
              <p className="text-zinc-300 mt-1 text-xs">CREDIBLE: Results + social proof</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">businessRoi</code>
              <p className="text-zinc-300 mt-1 text-xs">BUSINESS: Business/ROI language</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">directChallenge</code>
              <p className="text-zinc-300 mt-1 text-xs">PROVOCATIVE: Provocative/polarizing copy</p>
            </div>
            <div className="bg-zinc-700 p-3 rounded">
              <code className="text-yellow-400">fomo</code>
              <p className="text-zinc-300 mt-1 text-xs">COMPETITIVE: FOMO + competitive urgency</p>
            </div>
            <div className="bg-green-700 p-3 rounded border border-green-500">
              <code className="text-green-400">shocking</code>
              <p className="text-zinc-300 mt-1 text-xs">MINIMAL: Short & shocking statement</p>
            </div>
            <div className="bg-green-700 p-3 rounded border border-green-500">
              <code className="text-green-400">questionHook</code>
              <p className="text-zinc-300 mt-1 text-xs">ENGAGING: Question-based hook</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/20 rounded">
            <h4 className="text-yellow-400 font-bold mb-2">🎯 Current Test Results Tracking:</h4>
            <p className="text-zinc-300 text-sm">
              <strong>Currently Testing:</strong> {Object.keys(copyVariations).find(key => copyVariations[key] === currentVariation)}
            </p>
            <p className="text-zinc-400 text-xs mt-1">
              Check console logs for click tracking. Each variation logs which copy was clicked for conversion tracking.
            </p>
          </div>
        </div>

        {/* Test Controls */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              console.log('🔴 MANUAL OVERLAY TRIGGER - Testing overlay system');
              window.dispatchEvent(new CustomEvent('manualTrigger'));
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold mr-4"
          >
            🚨 MANUAL OVERLAY TRIGGER
          </button>

          <button
            onClick={() => {
              console.log('🔴 MANUAL PAUSE TEST BUTTON CLICKED');

              // Use Wistia JavaScript API if available
              if (window.Wistia && window.Wistia.api) {
                console.log('🔴 Using Wistia JavaScript API...');
                const allVideos = window.Wistia.api.all();
                console.log('🔴 Found Wistia videos:', allVideos.length);

                if (allVideos.length > 0) {
                  allVideos.forEach((video, index) => {
                    console.log(`🔴 Pausing video ${index + 1}: ${video.hashedId()}`);
                    video.pause();
                  });
                  console.log('✅ Manual pause completed via JavaScript API');
                } else {
                  console.log('❌ No Wistia videos found');
                }
              } else {
                console.log('❌ Wistia API not available, trying iframe...');
                // Fallback to iframe
                const iframe = document.querySelector('iframe');
                if (iframe) {
                  console.log('🔴 Found iframe, sending pause message...');
                  iframe.contentWindow?.postMessage('{"method":"pause"}', '*');
                  iframe.contentWindow?.postMessage({method: 'pause'}, '*');
                  console.log('🔴 Manual pause messages sent');
                } else {
                  console.log('❌ No iframe found for manual pause');
                }
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-bold mr-4"
          >
            ⏸️ PAUSE VIDEO
          </button>

          <button
            onClick={() => {
              console.log('▶️ MANUAL RESUME TEST BUTTON CLICKED');

              // Use Wistia JavaScript API if available
              if (window.Wistia && window.Wistia.api) {
                console.log('▶️ Using Wistia JavaScript API...');
                const allVideos = window.Wistia.api.all();
                console.log('▶️ Found Wistia videos:', allVideos.length);

                if (allVideos.length > 0) {
                  allVideos.forEach((video, index) => {
                    if (video.currentTime() > 0) {
                      console.log(`▶️ Resuming video ${index + 1}: ${video.hashedId()}`);
                      video.play();
                    }
                  });
                  console.log('✅ Manual resume completed via JavaScript API');
                } else {
                  console.log('❌ No Wistia videos found');
                }
              } else {
                console.log('❌ Wistia API not available, trying iframe...');
                // Fallback to iframe
                const iframe = document.querySelector('iframe');
                if (iframe) {
                  console.log('▶️ Found iframe, sending play message...');
                  iframe.contentWindow?.postMessage('{"method":"play"}', '*');
                  iframe.contentWindow?.postMessage({method: 'play'}, '*');
                  console.log('▶️ Manual resume messages sent');
                } else {
                  console.log('❌ No iframe found for manual resume');
                }
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-bold"
          >
            ▶️ RESUME VIDEO
          </button>
          <p className="text-zinc-400 text-sm mt-2">
            Purple button tests overlay system | Red/Green test video controls
          </p>
        </div>
      </div>
    </div>
  );
}
