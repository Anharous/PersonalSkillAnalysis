// Initialize MongoDB with sample data
db = db.getSiblingDB('skillforge');

// Create collections
db.createCollection('users');
db.createCollection('quizzes');
db.createCollection('quiz_attempts');
db.createCollection('learning_modules');
db.createCollection('user_progress');

// Insert sample admin user
db.users.insertOne({
  email: 'admin@company.com',
  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
  name: 'System Admin',
  role: 'ADMIN',
  profileComplete: true,
  skills: [],
  technologies: [],
  projects: [],
  currentRole: 'Administrator',
  desiredRole: 'Administrator',
  xp: 0,
  level: 1,
  badges: [],
  streak: 0,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert sample employee user
db.users.insertOne({
  email: 'employee@company.com',
  password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
  name: 'John Developer',
  role: 'EMPLOYEE',
  profileComplete: false,
  skills: ['JavaScript', 'React', 'Node.js'],
  technologies: ['React', 'Node.js', 'MongoDB'],
  projects: ['E-commerce Website', 'Task Management App'],
  currentRole: 'Junior Developer',
  desiredRole: 'Senior Full Stack Developer',
  xp: 1250,
  level: 3,
  badges: ['First Steps', 'Quiz Master'],
  streak: 5,
  createdAt: new Date(),
  updatedAt: new Date()
});

// Insert sample quizzes
db.quizzes.insertMany([
  {
    title: 'React Fundamentals',
    description: 'Test your knowledge of React basics',
    skill: 'React',
    difficulty: 'MEDIUM',
    active: true,
    questions: [
      {
        id: '1',
        question: 'What is JSX?',
        options: ['JavaScript XML', 'Java Syntax Extension', 'JSON Extension', 'JavaScript eXtension'],
        correctAnswer: 0,
        explanation: 'JSX stands for JavaScript XML and allows you to write HTML-like syntax in JavaScript.',
        difficulty: 'EASY'
      },
      {
        id: '2',
        question: 'Which hook is used for state management in functional components?',
        options: ['useEffect', 'useState', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useState is the primary hook for managing state in functional components.',
        difficulty: 'MEDIUM'
      },
      {
        id: '3',
        question: 'What is the purpose of useEffect?',
        options: ['State management', 'Side effects', 'Context sharing', 'Component styling'],
        correctAnswer: 1,
        explanation: 'useEffect is used to perform side effects in functional components.',
        difficulty: 'MEDIUM'
      }
    ],
    createdAt: new Date()
  },
  {
    title: 'Python Advanced Concepts',
    description: 'Advanced Python programming concepts',
    skill: 'Python',
    difficulty: 'HARD',
    active: true,
    questions: [
      {
        id: '1',
        question: 'What is a decorator in Python?',
        options: ['A design pattern', 'A function that modifies another function', 'A data structure', 'A built-in module'],
        correctAnswer: 1,
        explanation: 'A decorator is a function that takes another function and extends its behavior.',
        difficulty: 'HARD'
      },
      {
        id: '2',
        question: 'What is the Global Interpreter Lock (GIL)?',
        options: ['A security feature', 'A threading limitation', 'A memory manager', 'A compiler optimization'],
        correctAnswer: 1,
        explanation: 'The GIL prevents multiple native threads from executing Python bytecodes simultaneously.',
        difficulty: 'HARD'
      }
    ],
    createdAt: new Date()
  },
  {
    title: 'JavaScript Basics',
    description: 'Fundamental JavaScript concepts',
    skill: 'JavaScript',
    difficulty: 'EASY',
    active: true,
    questions: [
      {
        id: '1',
        question: 'What is the difference between let and var?',
        options: ['No difference', 'Scope difference', 'Type difference', 'Performance difference'],
        correctAnswer: 1,
        explanation: 'let has block scope while var has function scope.',
        difficulty: 'MEDIUM'
      },
      {
        id: '2',
        question: 'What is a closure?',
        options: ['A loop construct', 'A function with access to outer scope', 'A data type', 'An operator'],
        correctAnswer: 1,
        explanation: 'A closure is a function that has access to variables in its outer scope.',
        difficulty: 'MEDIUM'
      }
    ],
    createdAt: new Date()
  }
]);

// Insert sample learning modules
db.learning_modules.insertMany([
  {
    title: 'React Hooks Deep Dive',
    description: 'Master advanced React hooks and custom hook patterns',
    skill: 'React',
    difficulty: 'INTERMEDIATE',
    type: 'VIDEO',
    duration: '45 min',
    url: 'https://www.youtube.com/watch?v=example1',
    thumbnailUrl: 'https://img.youtube.com/vi/example1/maxresdefault.jpg',
    xpReward: 200,
    isPremium: false,
    prerequisites: ['JavaScript', 'React Basics'],
    tags: ['hooks', 'react', 'frontend'],
    active: true,
    createdAt: new Date()
  },
  {
    title: 'Python Data Structures & Algorithms',
    description: 'Learn efficient data structures and algorithm implementation in Python',
    skill: 'Python',
    difficulty: 'ADVANCED',
    type: 'PRACTICE',
    duration: '60 min',
    url: 'https://www.example.com/python-dsa',
    thumbnailUrl: 'https://www.example.com/thumbnails/python-dsa.jpg',
    xpReward: 300,
    isPremium: true,
    prerequisites: ['Python Basics'],
    tags: ['algorithms', 'data-structures', 'python'],
    active: true,
    createdAt: new Date()
  },
  {
    title: 'System Design Fundamentals',
    description: 'Understanding scalable system architecture and design patterns',
    skill: 'System Design',
    difficulty: 'INTERMEDIATE',
    type: 'ARTICLE',
    duration: '90 min',
    url: 'https://www.example.com/system-design',
    thumbnailUrl: 'https://www.example.com/thumbnails/system-design.jpg',
    xpReward: 250,
    isPremium: false,
    prerequisites: ['Backend Development'],
    tags: ['architecture', 'scalability', 'design'],
    active: true,
    createdAt: new Date()
  },
  {
    title: 'Docker Containerization',
    description: 'Learn containerization with Docker from basics to advanced',
    skill: 'Docker',
    difficulty: 'INTERMEDIATE',
    type: 'VIDEO',
    duration: '120 min',
    url: 'https://www.youtube.com/watch?v=docker-example',
    thumbnailUrl: 'https://img.youtube.com/vi/docker-example/maxresdefault.jpg',
    xpReward: 280,
    isPremium: true,
    prerequisites: ['Linux Basics'],
    tags: ['docker', 'containers', 'devops'],
    active: true,
    createdAt: new Date()
  },
  {
    title: 'AWS Cloud Fundamentals',
    description: 'Introduction to Amazon Web Services and cloud computing',
    skill: 'AWS',
    difficulty: 'BEGINNER',
    type: 'INTERACTIVE',
    duration: '75 min',
    url: 'https://aws.amazon.com/training/',
    thumbnailUrl: 'https://www.example.com/thumbnails/aws.jpg',
    xpReward: 220,
    isPremium: false,
    prerequisites: [],
    tags: ['aws', 'cloud', 'infrastructure'],
    active: true,
    createdAt: new Date()
  }
]);

print('Sample data inserted successfully!');