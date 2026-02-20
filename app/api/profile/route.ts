import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Since we're using localStorage on the client side,
    // this endpoint is mainly for future MongoDB integration
    // The client will handle reading from localStorage directly

    return NextResponse.json({
      success: true,
      message: 'Using client-side localStorage. Set MONGODB_URI to use database.',
    });
  } catch (error) {
    console.error('[API] Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch profile', details: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // This would update MongoDB if connected
    // For now, just return success - client handles localStorage

    return NextResponse.json({
      success: true,
      message: 'Username updated',
    });
  } catch (error) {
    console.error('[API] Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile', details: String(error) },
      { status: 500 }
    );
  }
}
