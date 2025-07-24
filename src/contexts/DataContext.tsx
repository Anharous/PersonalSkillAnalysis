import React, { createContext, useContext, useState, useEffect } from 'react';
import { quizAPI, learningAPI } from '../services/api';
import { useAuth } from './AuthContext';

interface Quiz {
  id: string;
  title: string;
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correct: number;
    difficulty: 'easy' | 'medium' | 'hard';
    skill: string;
  }>;
  completed: boolean;
  score?: number;
}

interface LearningModule {
  id: string;
  title: string;
  description: string;
  skill: string;
  difficulty: string;
  duration: string;
  type: 'video' | 'article' | 'practice';
  url: string;
  completed: boolean;
  xpReward: number;
}

interface DataContextType {
  quizzes: Quiz[];
  learningModules: LearningModule[];
  skillGaps: string[];
  updateQuizScore: (quizId: string, score: number) => void;
  completeModule: (moduleId: string) => void;
  getRecommendedModules: (skills: string[]) => LearningModule[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [learningModules, setLearningModules] = useState<LearningModule[]>([]);
  const [userAttempts, setUserAttempts] = useState<any[]>([]);
  const [userProgress, setUserProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data when user is available
  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load quizzes
      const quizzesResponse = await quizAPI.getAllQuizzes();
      const quizzesData = quizzesResponse.data.map((quiz: any) => ({
        id: quiz.id,
        title: quiz.title,
        completed: false, // Will be updated based on user attempts
        questions: quiz.questions.map((q: any) => ({
          id: q.id,
          question: q.question,
          options: q.options,
          correct: q.correctAnswer,
          difficulty: q.difficulty.toLowerCase(),
          skill: quiz.skill
        }))
      }));
      
      // Load learning modules
      const modulesResponse = await learningAPI.getAllModules();
      const modulesData = modulesResponse.data.map((module: any) => ({
        id: module.id,
        title: module.title,
        description: module.description,
        skill: module.skill,
        difficulty: module.difficulty,
        duration: module.duration,
        type: module.type.toLowerCase(),
        url: module.url,
        completed: false, // Will be updated based on user progress
        xpReward: module.xpReward
      }));
      
      // Load user attempts and progress if user is logged in
      if (user) {
        const attemptsResponse = await quizAPI.getUserAttempts(user.id);
        const progressResponse = await learningAPI.getUserProgress(user.id);
        
        setUserAttempts(attemptsResponse.data);
        setUserProgress(progressResponse.data);
        
        // Update completion status based on user data
        const updatedQuizzes = quizzesData.map((quiz: Quiz) => {
          const attempt = attemptsResponse.data.find((a: any) => a.quizId === quiz.id && a.completed);
          return {
            ...quiz,
            completed: !!attempt,
            score: attempt?.score
          };
        });
        
        const updatedModules = modulesData.map((module: LearningModule) => {
          const progress = progressResponse.data.find((p: any) => p.moduleId === module.id);
          return {
            ...module,
            completed: progress?.status === 'COMPLETED'
          };
        });
        
        setQuizzes(updatedQuizzes);
        setLearningModules(updatedModules);
      } else {
        setQuizzes(quizzesData);
        setLearningModules(modulesData);
      }
      
    } catch (error) {
      console.error('Failed to load data:', error);
      // Fallback to empty arrays
      setQuizzes([]);
      setLearningModules([]);
    } finally {
      setLoading(false);
    }
  };

  const [skillGaps] = useState<string[]>(['Python', 'System Design', 'Docker', 'AWS']);

  const updateQuizScore = async (quizId: string, score: number) => {
    try {
      // Update local state immediately
      setQuizzes(prev => prev.map(quiz => 
        quiz.id === quizId ? { ...quiz, completed: true, score } : quiz
      ));
      
      // The score update will be handled by the backend when quiz is submitted
    } catch (error) {
      console.error('Failed to update quiz score:', error);
    }
  };

  const completeModule = async (moduleId: string) => {
    try {
      if (user) {
        await learningAPI.completeModule(user.id, moduleId);
        
        // Update local state
        setLearningModules(prev => prev.map(module => 
          module.id === moduleId ? { ...module, completed: true } : module
        ));
      }
    } catch (error) {
      console.error('Failed to complete module:', error);
    }
  };

  const getRecommendedModules = (skills: string[]) => {
    return learningModules.filter(module => 
      skillGaps.includes(module.skill) || skills.includes(module.skill)
    );
  };

  return (
    <DataContext.Provider value={{
      quizzes,
      learningModules,
      skillGaps,
      updateQuizScore,
      completeModule,
      getRecommendedModules,
      loading
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}