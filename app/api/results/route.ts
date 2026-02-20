import { NextRequest, NextResponse } from 'next/server';
import { saveTestResult, getTestResults, connectDB } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, username, wpm, accuracy, consistency, duration, errors, mode, testType } = body;

    // Validate required fields
    if (!userId || !username || wpm === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Try to save to MongoDB
    const db = await connectDB();
    if (db) {
      const result = await saveTestResult({
        userId,
        username,
        wpm,
        accuracy,
        consistency,
        duration,
        errors,
        mode,
        testType,
        date: Date.now(),
      });

      if (result) {
        return NextResponse.json({
          success: true,
          message: 'Test result saved to MongoDB',
          id: result.insertedId,
        });
      }
    }

    // Fallback: still consider it a success even if MongoDB is not connected
    return NextResponse.json({
      success: true,
      message: 'Test result registered (MongoDB not connected, using localStorage)',
      fallback: true,
    });
  } catch (error) {
    console.error('[API] Error saving test result:', error);
    return NextResponse.json(
      { error: 'Failed to save test result', details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '50', 10);

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ results: [], fallback: true });
    }

    const results = await getTestResults(userId, limit);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('[API] Error fetching results:', error);
    return NextResponse.json(
      { error: 'Failed to fetch results', details: String(error) },
      { status: 500 }
    );
  }
}
