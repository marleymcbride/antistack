import { NextRequest, NextResponse } from 'next/server';
// Import will depend on which service you decide to use
// import mailchimp from '@mailchimp/mailchimp_marketing';

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

    // Uncomment and configure the email service you want to use

    /*
    // Example for Mailchimp
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });

    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID!, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name || '',
      },
    });
    */

    /*
    // For ConvertKit integration, you would need to use their official API directly:
    // https://developers.convertkit.com/
    // Example using fetch:

    const response = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: process.env.CONVERTKIT_API_KEY,
        email,
        first_name: name || '',
      }),
    });

    const data = await response.json();
    // Handle the response data
    */

    // Placeholder response - replace with actual service integration
    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to the newsletter!' },
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
