#!/usr/bin/env node

// Quick script to update .env.local with correct N8N endpoints
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const correctEnv = `NEXT_PUBLIC_N8N_PRIMARY_WEBHOOK=https://n8n.marleymcbride.co/webhook/3x-energy-leads
NEXT_PUBLIC_N8N_FALLBACK_WEBHOOK=https://n8n.marleymcbride.co/webhook/systeme-add-contact
`;

try {
  fs.writeFileSync(envPath, correctEnv, 'utf8');
  console.log('✅ Updated .env.local with correct N8N endpoints');
  console.log('📝 Content written:');
  console.log(correctEnv);
  console.log('🔄 Please restart your dev server if running');
} catch (error) {
  console.error('❌ Error updating .env.local:', error.message);
  console.log('📝 Please manually update .env.local with:');
  console.log(correctEnv);
}
