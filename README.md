# SkillForge - Personalized Learning & Skill-Gap Analysis Platform

A comprehensive AI-powered platform for learners to upload resumes, get skill-gap analysis, receive personalized learning roadmaps, take adaptive quizzes, and track progress with gamification.

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Java 17** with Spring Boot 3.2
- **Spring Data MongoDB** for database operations
- **Spring Security** with JWT authentication
- **Apache Tika** for resume parsing
- **iText7** for PDF generation
- **OpenAI API** for AI features

### Database
- **MongoDB 7.0** for data storage

## 🚀 Features

### 👤 Learner (Employee) Features
1. **Authentication**: Sign up/Login with role-based access
2. **Resume Upload & Parsing**: Upload PDF/DOCX resumes with automatic skill extraction
3. **Skill Gap Analysis**: Compare current skills with desired role requirements
4. **Adaptive Quiz Engine**: Dynamic difficulty adjustment based on performance
5. **Personalized Learning Roadmap**: Customized learning paths with video/article recommendations
6. **Gamified Dashboard**: XP points, levels, badges, and progress tracking
7. **AI Mock Interviews**: Practice interviews with AI-powered feedback
8. **Certification**: Generate PDF certificates upon completion

### 👩‍💼 Admin Dashboard Features
1. **User Management**: View and manage all platform users
2. **Analytics**: Comprehensive platform performance metrics
3. **Reports**: Generate detailed learning and performance reports
4. **System Settings**: Configure platform settings and features

## 📦 Project Structure

```
skillforge/
├── backend/                 # Java Spring Boot backend
│   ├── src/main/java/com/skillforge/
│   │   ├── config/         # Security, JWT, CORS configuration
│   │   ├── controller/     # REST API controllers
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── model/         # MongoDB entity models
│   │   ├── repository/    # MongoDB repositories
│   │   └── service/       # Business logic services
│   ├── pom.xml            # Maven dependencies
│   ├── Dockerfile         # Docker configuration
│   └── docker-compose.yml # MongoDB + Backend setup
├── src/                   # React frontend
│   ├── components/        # React components
│   ├── contexts/         # React contexts (Auth, Data)
│   ├── services/         # API service layer
│   └── main.tsx          # Application entry point
└── README.md
```

## 🔧 Setup Instructions

### Prerequisites
- **Java 17+**
- **Node.js 18+**
- **Docker & Docker Compose**
- **MongoDB** (or use Docker)

### Backend Setup

1. **Clone and navigate to backend**:
```bash
cd backend
```

2. **Start MongoDB with Docker**:
```bash
docker-compose up -d mongodb
```

3. **Configure environment variables**:
```bash
export OPENAI_API_KEY=your-openai-api-key
```

4. **Run the Spring Boot application**:
```bash
./mvnw spring-boot:run
```

The backend will be available at `http://localhost:8080/api`

### Frontend Setup

1. **Install dependencies**:
```bash
npm install
```

2. **Start the development server**:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Full Docker Setup

To run both backend and MongoDB with Docker:

```bash
cd backend
docker-compose up -d
```

## 🗄️ Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String, // EMPLOYEE, ADMIN
  profileComplete: Boolean,
  currentRole: String,
  desiredRole: String,
  skills: [String],
  technologies: [String],
  projects: [String],
  experience: String,
  xp: Number,
  level: Number,
  badges: [String],
  streak: Number,
  resumeFileName: String,
  resumeContent: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Quizzes Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  skill: String,
  difficulty: String, // EASY, MEDIUM, HARD
  questions: [{
    id: String,
    question: String,
    options: [String],
    correctAnswer: Number,
    explanation: String,
    difficulty: String
  }],
  active: Boolean,
  createdAt: Date
}
```

### Quiz Attempts Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  quizId: ObjectId,
  answers: [{
    questionId: String,
    selectedOption: Number,
    correct: Boolean,
    timeSpent: Number
  }],
  score: Number,
  totalQuestions: Number,
  correctAnswers: Number,
  timeTaken: Number,
  completed: Boolean,
  attemptedAt: Date
}
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/validate` - Token validation

### Users
- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user profile
- `POST /api/users/{id}/resume` - Upload resume

### Quizzes
- `GET /api/quizzes` - Get all active quizzes
- `GET /api/quizzes/{id}` - Get quiz by ID
- `GET /api/quizzes/by-skills` - Get quizzes by skills
- `POST /api/quizzes/{id}/start` - Start quiz attempt
- `POST /api/quizzes/attempts/{id}/submit` - Submit quiz

### Learning Modules
- `GET /api/learning-modules` - Get all modules
- `GET /api/learning-modules/by-skills` - Get modules by skills
- `GET /api/learning-modules/users/{id}/progress` - Get user progress
- `POST /api/learning-modules/users/{id}/complete/{moduleId}` - Complete module

## 🎮 Demo Credentials

### Admin Account
- **Email**: `admin@company.com`
- **Password**: `admin123`

### Employee Account
- **Email**: `employee@company.com`
- **Password**: `employee123`

## 🔮 Future Enhancements

1. **Resume Parsing**: Integrate with Python spaCy for advanced NLP
2. **AI Interview**: Implement OpenAI GPT integration for mock interviews
3. **Real-time Analytics**: Add WebSocket support for live updates
4. **Mobile App**: React Native mobile application
5. **Social Learning**: Add chat and leaderboard features
6. **Advanced Reporting**: More detailed analytics and insights

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@skillforge.com or create an issue in the repository.