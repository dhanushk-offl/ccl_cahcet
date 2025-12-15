import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import * as readline from 'readline';

const prisma = new PrismaClient();

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Promisify readline question
const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
const isStrongPassword = (password: string): boolean => {
  return password.length >= 8;
};

async function createAdmin() {
  try {
    console.log('\n=== Library CMS - Create Admin User ===\n');

    // Check if admin already exists
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('⚠️  An admin user already exists:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Name: ${existingAdmin.name || 'Not set'}\n`);
      
      const overwrite = await question('Do you want to create another admin user? (yes/no): ');
      
      if (overwrite.toLowerCase() !== 'yes' && overwrite.toLowerCase() !== 'y') {
        console.log('\n❌ Admin creation cancelled.\n');
        rl.close();
        await prisma.$disconnect();
        return;
      }
    }

    // Get admin details
    let email: string = '';
    let isEmailValid = false;

    while (!isEmailValid) {
      email = await question('\nEnter admin email: ');
      
      if (!isValidEmail(email)) {
        console.log('❌ Invalid email format. Please try again.');
        continue;
      }

      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });

      if (existingUser) {
        console.log('❌ A user with this email already exists. Please use a different email.');
        continue;
      }

      isEmailValid = true;
    }

    const name = await question('Enter admin name (optional, press Enter to skip): ');

    let password: string = '';
    let isPasswordValid = false;

    while (!isPasswordValid) {
      password = await question('Enter admin password (min 8 characters): ');
      
      if (!isStrongPassword(password)) {
        console.log('❌ Password must be at least 8 characters long. Please try again.');
        continue;
      }

      const confirmPassword = await question('Confirm password: ');
      
      if (password !== confirmPassword) {
        console.log('❌ Passwords do not match. Please try again.');
        continue;
      }

      isPasswordValid = true;
    }

    // Hash password
    console.log('\n🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    console.log('👤 Creating admin user...');
    const admin = await prisma.user.create({
      data: {
        email,
        name: name || null,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('=== Login Credentials ===');
    console.log(`Email: ${admin.email}`);
    console.log(`Name: ${admin.name || 'Not set'}`);
    console.log(`Role: ${admin.role}`);
    console.log('\n⚠️  Important: Keep these credentials secure!\n');
    console.log('You can now login at: http://localhost:3000/admin/login\n');

  } catch (error) {
    console.error('\n❌ Error creating admin user:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  } finally {
    rl.close();
    await prisma.$disconnect();
  }
}

// Create default admin if no interactive mode
async function createDefaultAdmin() {
  try {
    console.log('\n=== Creating Default Admin User ===\n');

    const defaultEmail = 'ccl@cahcet.edu.in';
    const defaultPassword = 'ccl-2025';

    // Check if default admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: defaultEmail }
    });

    if (existingAdmin) {
      console.log('✅ Default admin user already exists.');
      console.log(`   Email: ${defaultEmail}\n`);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: defaultEmail,
        name: 'Admin',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('✅ Default admin user created successfully!\n');
    console.log('=== Default Login Credentials ===');
    console.log(`Email: ${defaultEmail}`);
    console.log(`Password: ${defaultPassword}`);
    console.log('\n⚠️  IMPORTANT: Change this password immediately after first login!\n');

  } catch (error) {
    console.error('❌ Error creating default admin:', error);
    throw error;
  }
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.includes('--default')) {
  createDefaultAdmin()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
} else {
  createAdmin()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}