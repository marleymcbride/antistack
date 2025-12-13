import { NextRequest, NextResponse } from 'next/server';

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const { email, name } = body;

    // Validate inputs
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    if (name && typeof name !== 'string') {
      return NextResponse.json(
        { success: false, message: 'Name must be a string' },
        { status: 400 }
      );
    }

    // System.io API Integration
    const systemeApiKey = process.env.SYSTEME_IO_API_KEY;
    const systemeListId = process.env.SYSTEME_IO_LIST_ID;

    if (!systemeApiKey || !systemeListId) {
      console.error('Missing System.io configuration');
      return NextResponse.json(
        { success: false, message: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Add contact to System.io
    const systemeResponse = await fetch('https://systeme.io/api/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${systemeApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        first_name: name || '',
        lists: [parseInt(systemeListId)],
      }),
    });

    if (!systemeResponse.ok) {
      const errorData = await systemeResponse.text();
      console.error('System.io API error:', systemeResponse.status, errorData);

      // Handle duplicate email (usually not an error for the user)
      if (systemeResponse.status === 422) {
        return NextResponse.json(
          { success: true, message: 'Successfully subscribed! Check your email for the first lesson.' },
          { status: 200 }
        );
      }

      return NextResponse.json(
        { success: false, message: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    const responseData = await systemeResponse.json();
    console.log('System.io success:', responseData);

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed! Check your email for the first lesson.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscription error:', error);

    return NextResponse.json(
      { success: false, message: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
