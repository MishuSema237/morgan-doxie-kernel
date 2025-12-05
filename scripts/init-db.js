const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Load .env.local manually since dotenv might not be installed
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const [key, ...values] = line.split('=');
    if (key && values.length) {
      process.env[key.trim()] = values.join('=').trim();
    }
  });
}

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'bullify_kennel';

if (!uri) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function initDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    const db = client.db(dbName);

    // Initialize settings collection with default document
    const settingsCollection = db.collection('settings');
    const settingsExists = await settingsCollection.findOne({});

    if (!settingsExists) {
      await settingsCollection.insertOne({
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
            weekdays: '9:00 AM - 6:00 PM',
            saturday: '9:00 AM - 5:00 PM',
            sunday: 'By Appointment',
          },
        },
        payment: {
          depositOptions: ['50%', '75%'],
          bankAccounts: [],
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      console.log('✅ Settings collection initialized');
    } else {
      console.log('✅ Settings collection already exists');
    }

    // Create indexes for other collections
    const breedsCollection = db.collection('breeds');
    await breedsCollection.createIndex({ slug: 1 }, { unique: true });
    console.log('✅ Breeds collection ready');

    const puppiesCollection = db.collection('puppies');
    await puppiesCollection.createIndex({ breed: 1 });
    await puppiesCollection.createIndex({ status: 1 });
    console.log('✅ Puppies collection ready');

    const reservationsCollection = db.collection('reservations');
    await reservationsCollection.createIndex({ reservationNumber: 1 }, { unique: true });
    await reservationsCollection.createIndex({ 'customer.email': 1 });
    await reservationsCollection.createIndex({ createdAt: -1 });
    console.log('✅ Reservations collection ready');

    console.log('\n🎉 Database initialization complete!');
    console.log(`Database: ${dbName}`);
    console.log('\nCollections created:');
    console.log('  - settings (with default document)');
    console.log('  - breeds (ready for documents)');
    console.log('  - puppies (ready for documents)');
    console.log('  - reservations (ready for documents)');

  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nConnection closed');
  }
}

initDatabase();

