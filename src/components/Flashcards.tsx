import React, { useState } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, Brain, Shuffle, Play, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { flashcardsData } from '../data/sampleData';

interface Card {
  front: string;
  back: string;
}

const Flashcards: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState(flashcardsData.decks[0].subject);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<'review' | 'spaced'>('review');

  const currentDeck = flashcardsData.decks.find(deck => deck.subject === selectedSubject);
  const currentCard = currentDeck?.cards[currentCardIndex];

  const nextCard = () => {
    if (currentDeck && currentCardIndex < currentDeck.cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const shuffleCards = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
    // In a real app, you'd shuffle the deck array
  };

  const resetProgress = () => {
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
          <p className="text-gray-600 dark:text-gray-400">Review and master your study materials</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={studyMode}
            onChange={(e) => setStudyMode(e.target.value as 'review' | 'spaced')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="review">Review Mode</option>
            <option value="spaced">Spaced Repetition</option>
          </select>
          
          <button
            onClick={shuffleCards}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <Shuffle className="w-4 h-4" />
            Shuffle
          </button>
        </div>
      </div>

      {/* Subject Tabs */}
      <div className="flex flex-wrap gap-2">
        {flashcardsData.decks.map((deck) => (
          <button
            key={deck.subject}
            onClick={() => {
              setSelectedSubject(deck.subject);
              setCurrentCardIndex(0);
              setIsFlipped(false);
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedSubject === deck.subject
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {deck.subject}
            <span className="ml-2 text-sm opacity-75">({deck.cards.length})</span>
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Card {currentCardIndex + 1} of {currentDeck?.cards.length}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {Math.round(((currentCardIndex + 1) / (currentDeck?.cards.length || 1)) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentCardIndex + 1) / (currentDeck?.cards.length || 1)) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          <motion.div
            className="relative h-80 perspective-1000"
            style={{ perspective: '1000px' }}
          >
            <motion.div
              className="relative w-full h-full cursor-pointer"
              onClick={() => setIsFlipped(!isFlipped)}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front of card */}
              <div
                className="absolute inset-0 w-full h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg flex items-center justify-center p-8"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="text-center">
                  <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    {currentCard?.front}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                    Click to reveal answer
                  </p>
                </div>
              </div>

              {/* Back of card */}
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center p-8"
                style={{ 
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="text-center text-white">
                  <Brain className="w-8 h-8 mx-auto mb-4" />
                  <p className="text-lg font-medium">
                    {currentCard?.back}
                  </p>
                  <p className="text-sm text-blue-100 mt-4">
                    Click to return to question
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prevCard}
          disabled={currentCardIndex === 0}
          className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={resetProgress}
          className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <RotateCcw className="w-6 h-6" />
        </button>

        <button
          onClick={nextCard}
          disabled={!currentDeck || currentCardIndex === currentDeck.cards.length - 1}
          className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Study Tips */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">Study Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-1">Active Recall</h4>
            <p className="text-sm text-green-100">Try to answer before flipping the card</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Spaced Repetition</h4>
            <p className="text-sm text-green-100">Review cards at increasing intervals</p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Mark Difficulty</h4>
            <p className="text-sm text-green-100">Focus more time on challenging cards</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;