const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Admin Schema
const AdminSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

async function seedAdmin() {
    try {
        // Connect to MongoDB
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Connected to MongoDB\n');

        // Admin credentials
        const adminData = {
            username: 'admin',
            email: 'admin@dachshund-joy.com',
            password: 'admin123',
        };

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ username: adminData.username });

        // Hash the password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(adminData.password, saltRounds);

        if (existingAdmin) {
            // Update existing admin
            existingAdmin.email = adminData.email;
            existingAdmin.passwordHash = passwordHash;
            await existingAdmin.save();
            console.log('✓ Admin user updated successfully!\n');
        } else {
            // Create new admin
            await Admin.create({
                username: adminData.username,
                email: adminData.email,
                passwordHash: passwordHash,
            });
            console.log('✓ Admin user created successfully!\n');
        }

        console.log('===========================================');
        console.log('Admin Credentials:');
        console.log('===========================================');
        console.log(`Username: ${adminData.username}`);
        console.log(`Email: ${adminData.email}`);
        console.log(`Password: ${adminData.password}`);
        console.log('===========================================\n');

        console.log('You can now login at: http://localhost:3000/admin/login\n');

        // Disconnect
        await mongoose.disconnect();
        console.log('✓ Disconnected from MongoDB');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmin();
