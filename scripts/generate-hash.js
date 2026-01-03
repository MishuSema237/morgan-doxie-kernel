const bcrypt = require('bcryptjs');

async function generateHash() {
    const password = 'admin123';
    const saltRounds = 10;

    const hash = await bcrypt.hash(password, saltRounds);

    console.log('\n===========================================');
    console.log('Generated Password Hash for: admin123');
    console.log('===========================================\n');
    console.log('Add this line to your .env.local file:\n');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('\n===========================================');
    console.log('IMPORTANT: Do NOT wrap the hash in quotes!');
    console.log('===========================================\n');
}

generateHash().catch(console.error);
