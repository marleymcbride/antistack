#!/usr/bin/env node

// Script to fix all placeholder redirect URLs in video overlay variations
const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app/page.tsx');

try {
  let content = fs.readFileSync(pagePath, 'utf8');

  // Replace all placeholder URLs with the correct internal redirect
  const updatedContent = content.replaceAll(
    'redirectUrl: "https://your-sales-page.com"',
    'redirectUrl: "/blueprint-from-video"'
  );

  fs.writeFileSync(pagePath, updatedContent, 'utf8');

  console.log('✅ Fixed all placeholder redirect URLs in video overlay variations');
  console.log('🔄 All popups now redirect to /blueprint-from-video page with email signup');
} catch (error) {
  console.error('❌ Error fixing redirect URLs:', error.message);
}
