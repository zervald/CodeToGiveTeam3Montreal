import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

@Component({
  selector: 'app-quiz-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-game.component.html',
  styleUrls: ['./quiz-game.component.css']
})
export class QuizGameComponent implements OnInit {
  questions: QuizQuestion[] = [
    {
      id: 1,
      question: 'About what percentage of the population has experienced intimate partner violence in their lifetime?',
      options: ['19%', '29%', ' 49%', ' 39%'],
      correctAnswer: 1
    },
    {
      id: 2,
      question: 'Which of these factors significantly increases the risk of intimate partner homicide or familicide when domestic violence is present?',
      options: ['Strangulation', 'Stalking', 'Access to firearms', 'All of the above'],
      correctAnswer: 3
    },
    {
      id: 3,
      question: 'How many survivors delay leaving an abusive relationship because they\'re afraid of being separated from their pets?',
      options: ['1 in 3', '1 in 5', '1 in 7', '1 in 10'],
      correctAnswer: 1
    },
    {
      id: 4,
      question: 'What percentage of domestic violence cases include financial abuse?',
      options: ['Less than 50%', 'About 75%', 'about 80%', 'Over 95%'],
      correctAnswer: 3
    }
  ];

  currentQuestionIndex: number = 0;
  selectedAnswer: number | null = null;
  score: number = 0;
  showResult: boolean = false;
  userAnswers: (number | null)[] = [];
  quizStarted: boolean = false;

  ngOnInit(): void {
    this.initializeQuiz();
  }

  initializeQuiz(): void {
    this.userAnswers = new Array(this.questions.length).fill(null);
  }

  startQuiz(): void {
    this.quizStarted = true;
    this.currentQuestionIndex = 0;
    this.selectedAnswer = null;
    this.score = 0;
    this.showResult = false;
    this.initializeQuiz();
  }

  selectAnswer(optionIndex: number): void {
    if (!this.showResult) {
      this.selectedAnswer = optionIndex;
    }
  }

  nextQuestion(): void {
    if (this.selectedAnswer !== null) {
      this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;

      if (this.selectedAnswer === this.questions[this.currentQuestionIndex].correctAnswer) {
        this.score++;
      }

      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = this.userAnswers[this.currentQuestionIndex];
      } else {
        this.showResult = true;
      }
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex > 0) {
      this.userAnswers[this.currentQuestionIndex] = this.selectedAnswer;
      this.currentQuestionIndex--;
      this.selectedAnswer = this.userAnswers[this.currentQuestionIndex];
    }
  }

  restartQuiz(): void {
    this.startQuiz();
  }

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentQuestionIndex];
  }

  get progress(): number {
    return ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
  }

  get scorePercentage(): number {
    return (this.score / this.questions.length) * 100;
  }

  get scoreMessage(): string {
    const percentage = this.scorePercentage;
    if (percentage === 100) return 'Perfect!';
    if (percentage >= 80) return 'Excellent!';
    if (percentage >= 60) return 'Well played!';
    if (percentage >= 40) return 'Not bad!';
    return 'Thank you!';
  }

  getOptionLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
}
