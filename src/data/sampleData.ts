// Sample flashcards data
export const flashcardsData = {
  "decks": [
    {
      "subject": "Psychology",
      "cards": [
        {
          "front": "What is cognitive dissonance?",
          "back": "Mental discomfort from conflicting beliefs"
        },
        {
          "front": "Define operant conditioning",
          "back": "Learning through rewards and punishments"
        },
        {
          "front": "What is the amygdala?",
          "back": "Brain region that processes emotions and fear"
        },
        {
          "front": "What does the prefrontal cortex do?",
          "back": "Involved in decision-making and self-control"
        },
        {
          "front": "Define classical conditioning",
          "back": "Learning through association between stimuli"
        }
      ]
    },
    {
      "subject": "Biology",
      "cards": [
        {
          "front": "What is mitosis?",
          "back": "Cell division creating identical diploid cells"
        },
        {
          "front": "Define photosynthesis",
          "back": "Process plants use to convert light into energy"
        },
        {
          "front": "What is DNA?",
          "back": "Genetic material containing hereditary information"
        },
        {
          "front": "What is the function of mitochondria?",
          "back": "Produces energy through cellular respiration"
        },
        {
          "front": "Define osmosis",
          "back": "Movement of water across a semi-permeable membrane"
        }
      ]
    },
    {
      "subject": "History",
      "cards": [
        {
          "front": "Who was the first President of the United States?",
          "back": "George Washington"
        },
        {
          "front": "What triggered World War I?",
          "back": "The assassination of Archduke Franz Ferdinand"
        },
        {
          "front": "When did India gain independence?",
          "back": "August 15, 1947"
        },
        {
          "front": "What was the Cold War?",
          "back": "Period of political tension between the US and USSR"
        },
        {
          "front": "Who was Napoleon Bonaparte?",
          "back": "French military leader who rose to power after the French Revolution"
        }
      ]
    }
  ]
};

// Sample quiz results data
export const quizResultsData = [
  { date: "28-06-2025", subject: "Psychology", score: 92, timeTaken: 8.5, questionsTotal: 10, questionsCorrect: 9 },
  { date: "27-06-2025", subject: "Biology", score: 87, timeTaken: 12.3, questionsTotal: 15, questionsCorrect: 13 },
  { date: "26-06-2025", subject: "History", score: 95, timeTaken: 6.2, questionsTotal: 8, questionsCorrect: 8 },
  { date: "25-06-2025", subject: "Psychology", score: 83, timeTaken: 9.1, questionsTotal: 12, questionsCorrect: 10 },
  { date: "24-06-2025", subject: "Biology", score: 91, timeTaken: 10.8, questionsTotal: 11, questionsCorrect: 10 }
];

// Sample study progress data
export const studyProgressData = {
  "user": {
    "name": "Alex Johnson",
    "studyStreak": 15,
    "totalStudyHours": 67,
    "cardsReviewed": 342,
    "quizzesTaken": 28,
    "averageScore": 88.5,
    "level": 7,
    "xpPoints": 2450
  },
  "subjects": [
    {"name": "Psychology", "progress": 75, "lastStudied": "2025-06-27"},
    {"name": "Biology", "progress": 62, "lastStudied": "2025-06-26"},
    {"name": "History", "progress": 89, "lastStudied": "2025-06-28"}
  ],
  "achievements": [
    {"name": "Study Streak Master", "unlocked": true},
    {"name": "Quiz Champion", "unlocked": true},
    {"name": "Flashcard Expert", "unlocked": false}
  ]
};

// Sample AI responses for chat
export const aiResponses = [
  "I'd be happy to help you with that concept. Can you tell me more about what specific aspect you're struggling with?",
  "That's a great question! Let me break this down into simpler terms for you.",
  "Based on your recent study sessions, I notice you might benefit from reviewing this topic again.",
  "Excellent work! You're showing great progress in this subject area.",
  "I recommend focusing on the key concepts we discussed earlier. Would you like me to create some practice questions?"
];