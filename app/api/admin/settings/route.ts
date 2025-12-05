import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { isAdminAuthenticated } from '@/lib/auth';

// GET - Fetch settings (admin only)
export async function GET() {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDb();
    const settings = await db.collection('settings').findOne({});

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
        payment: {
          depositOptions: ['50%'],
          bankAccounts: [],
        },
      });
    }

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

// PUT - Update settings (admin only)
export async function PUT(request: NextRequest) {
  try {
    const isAuth = await isAdminAuthenticated();
    if (!isAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const db = await getDb();

    // Upsert settings (update if exists, create if not)
    await db.collection('settings').updateOne(
      {},
      {
        $set: {
          ...data,
          updatedAt: new Date(),
        },
      },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}



