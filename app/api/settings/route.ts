import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

// GET - Fetch settings (public, no auth needed)
export async function GET() {
  try {
    const db = await getDb();
    const settings = await db.collection('settings').findOne({});

    // If no settings exist, return defaults
    if (!settings) {
      return NextResponse.json({
        socialMedia: {
          instagram: '',
          facebook: '',
          twitter: '',
          tiktok: '',
          whatsapp: '',
        },
        contact: {
          phone: '',
          whatsapp: '',
          email: '',
          address: '',
          businessHours: {
            weekdays: '',
            saturday: '',
            sunday: '',
          },
        },
      });
    }

    // Remove _id from response
    const { _id, ...settingsData } = settings;
    return NextResponse.json(settingsData);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}



