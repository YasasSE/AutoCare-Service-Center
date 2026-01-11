const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Service = require('./models/Service');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const defaultServices = [
  {
    name: 'Oil Change',
    description: 'Complete oil and filter change with multi-point inspection',
    price: '$49.99',
    duration: '30 mins',
    iconName: 'Droplets',
    longDescription: 'Regular oil changes are essential for maintaining your engine\'s health and performance. Our comprehensive service includes premium oil, a new filter, and a thorough inspection.',
    included: [
      'Up to 5 quarts of premium oil',
      'New oil filter installation',
      'Fluid level check and top-off',
      'Tire pressure check',
      'Multi-point vehicle inspection'
    ],
    benefits: [
      'Extended engine life',
      'Better fuel economy',
      'Reduced engine wear',
      'Improved performance'
    ]
  },
  {
    name: 'Brake Service',
    description: 'Complete brake inspection and service for optimal safety',
    price: '$199.99',
    duration: '90 mins',
    iconName: 'CircleStop',
    longDescription: 'Your safety is our priority. Our brake service includes a comprehensive inspection and repair of your entire braking system.',
    included: [
      'Brake pad inspection and replacement',
      'Rotor inspection and resurfacing',
      'Brake fluid check and replacement',
      'Caliper inspection',
      'Complete system test'
    ],
    benefits: [
      'Maximum stopping power',
      'Enhanced safety',
      'Reduced brake noise',
      'Extended brake life'
    ]
  },
  {
    name: 'Tire Rotation',
    description: 'Professional tire rotation to extend tire life',
    price: '$29.99',
    duration: '20 mins',
    iconName: 'CircleDot',
    longDescription: 'Regular tire rotation ensures even wear and extends the life of your tires, saving you money in the long run.',
    included: [
      'Tire rotation',
      'Tire pressure adjustment',
      'Visual tire inspection',
      'Balance check'
    ],
    benefits: [
      'Even tire wear',
      'Extended tire life',
      'Improved handling',
      'Better fuel efficiency'
    ]
  },
  {
    name: 'Battery Service',
    description: 'Battery testing and replacement service',
    price: '$79.99',
    duration: '25 mins',
    iconName: 'Zap',
    longDescription: 'Don\'t get stranded with a dead battery. Our battery service includes testing, cleaning, and replacement if needed.',
    included: [
      'Battery load test',
      'Terminal cleaning',
      'Cable inspection',
      'Charging system check',
      'Battery replacement (if needed)'
    ],
    benefits: [
      'Reliable starting',
      'Prevent breakdowns',
      'Extended battery life',
      'Peace of mind'
    ]
  },
  {
    name: 'Engine Diagnostic',
    description: 'Comprehensive engine diagnostic and troubleshooting',
    price: '$89.99',
    duration: '45 mins',
    iconName: 'Wrench',
    longDescription: 'Is your check engine light on? Our advanced diagnostic service will identify any issues with your vehicle\'s engine and systems.',
    included: [
      'Computer diagnostic scan',
      'Error code reading and interpretation',
      'System check',
      'Detailed report',
      'Repair recommendations'
    ],
    benefits: [
      'Identify problems early',
      'Prevent major repairs',
      'Optimize performance',
      'Clear understanding of issues'
    ]
  },
  {
    name: 'Air Filter Replacement',
    description: 'Engine and cabin air filter replacement',
    price: '$39.99',
    duration: '15 mins',
    iconName: 'Wind',
    longDescription: 'Clean air filters are essential for engine performance and cabin comfort. We replace both engine and cabin air filters.',
    included: [
      'Engine air filter replacement',
      'Cabin air filter replacement',
      'Filter housing cleaning',
      'System inspection'
    ],
    benefits: [
      'Better engine performance',
      'Improved fuel efficiency',
      'Cleaner cabin air',
      'Extended engine life'
    ]
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await Admin.deleteMany();
    await Service.deleteMany();

    // Create admin user
    console.log('Creating admin user...');
    await Admin.create({
      username: 'admin',
      password: 'admin123',
    });
    console.log('Admin user created: username=admin, password=admin123');

    // Create services
    console.log('Creating services...');
    await Service.insertMany(defaultServices);
    console.log(`${defaultServices.length} services created`);

    console.log('✅ Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();