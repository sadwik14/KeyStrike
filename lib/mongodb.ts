import { MongoClient, Db } from 'mongodb';

let client: MongoClient | null = null;
let db: Db | null = null;

const MONGODB_URI = process.env.MONGODB_URI || '';

export async function connectDB() {
  if (db) return db;

  if (!MONGODB_URI) {
    console.warn('[MongoDB] No MONGODB_URI provided. Set it in environment variables.');
    return null;
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db('keystrike');
    console.log('[MongoDB] Connected successfully');
    return db;
  } catch (error) {
    console.error('[MongoDB] Connection failed:', error);
    return null;
  }
}

export async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

export async function getDB() {
  if (!db) {
    return await connectDB();
  }
  return db;
}

export interface TestResult {
  _id?: string;
  userId: string;
  username: string;
  wpm: number;
  accuracy: number;
  consistency: number;
  duration: number;
  errors: number;
  mode: string;
  testType: string;
  date: number;
  createdAt?: Date;
}

export interface UserProfile {
  _id?: string;
  userId: string;
  username: string;
  bestWpm: number;
  averageWpm: number;
  totalTests: number;
  currentStreak: number;
  lastTestDate: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export async function saveTestResult(result: TestResult) {
  try {
    const db = await getDB();
    if (!db) return null;

    const collection = db.collection('testResults');
    const res = await collection.insertOne({
      ...result,
      createdAt: new Date(),
    });
    return res;
  } catch (error) {
    console.error('[MongoDB] Error saving test result:', error);
    return null;
  }
}

export async function getTestResults(userId: string, limit: number = 50) {
  try {
    const db = await getDB();
    if (!db) return [];

    const collection = db.collection('testResults');
    const results = await collection
      .find({ userId })
      .sort({ date: -1 })
      .limit(limit)
      .toArray();
    return results;
  } catch (error) {
    console.error('[MongoDB] Error fetching test results:', error);
    return [];
  }
}

export async function getTopScores(limit: number = 10) {
  try {
    const db = await getDB();
    if (!db) return [];

    const collection = db.collection('testResults');
    const results = await collection
      .aggregate([
        { $group: { _id: '$userId', maxWpm: { $max: '$wpm' }, username: { $first: '$username' } } },
        { $sort: { maxWpm: -1 } },
        { $limit: limit },
      ])
      .toArray();
    return results;
  } catch (error) {
    console.error('[MongoDB] Error fetching top scores:', error);
    return [];
  }
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>) {
  try {
    const db = await getDB();
    if (!db) return null;

    const collection = db.collection('userProfiles');
    const res = await collection.updateOne(
      { userId },
      {
        $set: {
          ...profile,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );
    return res;
  } catch (error) {
    console.error('[MongoDB] Error updating user profile:', error);
    return null;
  }
}

export async function getUserProfile(userId: string) {
  try {
    const db = await getDB();
    if (!db) return null;

    const collection = db.collection('userProfiles');
    const profile = await collection.findOne({ userId });
    return profile;
  } catch (error) {
    console.error('[MongoDB] Error fetching user profile:', error);
    return null;
  }
}
