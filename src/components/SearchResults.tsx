import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Clock, 
  FileText, 
  Brain, 
  BookOpen, 
  Target,
  Sparkles,
  TrendingUp,
  Calendar,
  Tag,
  Star
} from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'flashcard' | 'quiz' | 'material' | 'note' | 'concept';
  content: string;
  relevance: number;
  lastAccessed: string;
  tags: string[];
  subject: string;
  favorite?: boolean;
}

const SearchResults: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'flashcard' | 'quiz' | 'material' | 'note' | 'concept'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'alphabetical'>('relevance');

  const searchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Cognitive Dissonance Definition',
      type: 'flashcard',
      content: 'Mental discomfort from conflicting beliefs, ideas, or values simultaneously held by an individual.',
      relevance: 95,
      lastAccessed: '2025-06-28',
      tags: ['psychology', 'cognitive', 'theory'],
      subject: 'Psychology',
      favorite: true
    },
    {
      id: '2',
      title: 'Psychology Quiz - Cognitive Theories',
      type: 'quiz',
      content: 'Test your knowledge of cognitive psychology theories including dissonance, schemas, and processing models.',
      relevance: 88,
      lastAccessed: '2025-06-27',
      tags: ['psychology', 'quiz', 'cognitive'],
      subject: 'Psychology'
    },
    {
      id: '3',
      title: 'Mitochondria Function',
      type: 'concept',
      content: 'Powerhouse of the cell - produces ATP through cellular respiration, contains its own DNA.',
      relevance: 82,
      lastAccessed: '2025-06-26',
      tags: ['biology', 'cellular', 'energy'],
      subject: 'Biology'
    },
    {
      id: '4',
      title: 'World War I Causes Study Material',
      type: 'material',
      content: 'Comprehensive document covering the complex causes of WWI including nationalism, imperialism, and alliance systems.',
      relevance: 76,
      lastAccessed: '2025-06-25',
      tags: ['history', 'war', 'causes'],
      subject: 'History'
    },
    {
      id: '5',
      title: 'Photosynthesis Process Notes',
      type: 'note',
      content: 'Detailed notes on light-dependent and light-independent reactions in photosynthesis.',
      relevance: 71,
      lastAccessed: '2025-06-24',
      tags: ['biology', 'plants', 'energy'],
      subject: 'Biology',
      favorite: true
    },
    {
      id: '6',
      title: 'Classical Conditioning Flashcard',
      type: 'flashcard',
      content: 'Learning process through association between stimuli - Pavlov\'s dogs experiment.',
      relevance: 68,
      lastAccessed: '2025-06-23',
      tags: ['psychology', 'learning', 'behaviorism'],
      subject: 'Psychology'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flashcard': return <Brain className="w-4 h-4" />;
      case 'quiz': return <Target className="w-4 h-4" />;
      case 'material': return <FileText className="w-4 h-4" />;
      case 'note': return <BookOpen className="w-4 h-4" />;
      case 'concept': return <Sparkles className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'flashcard': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
      case 'quiz': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'material': return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400';
      case 'note': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-400';
      case 'concept': return 'text-pink-600 bg-pink-100 dark:bg-pink-900 dark:text-pink-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const filteredResults = searchResults
    .filter(result => selectedFilter === 'all' || result.type === selectedFilter)
    .filter(result => 
      searchQuery === '' || 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'relevance': return b.relevance - a.relevance;
        case 'date': return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime();
        case 'alphabetical': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });

  const recentSearches = [
    'cognitive dissonance',
    'mitochondria function',
    'world war 1 causes',
    'photosynthesis',
    'classical conditioning'
  ];

  const suggestedTopics = [
    { name: 'Psychology Theories', count: 24 },
    { name: 'Cell Biology', count: 18 },
    { name: 'Historical Events', count: 15 },
    { name: 'Chemical Reactions', count: 12 },
    { name: 'Mathematical Formulas', count: 9 }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Search & Discovery</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Find anything across your study materials and notes
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
          <Sparkles className="w-4 h-4" />
          <span>AI-Enhanced Search</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search across all your study materials, flashcards, quizzes, and notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter by:</span>
          </div>
          
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="all">All Types</option>
            <option value="flashcard">Flashcards</option>
            <option value="quiz">Quizzes</option>
            <option value="material">Materials</option>
            <option value="note">Notes</option>
            <option value="concept">Concepts</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            <option value="relevance">Most Relevant</option>
            <option value="date">Recently Accessed</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Search Results */}
      {searchQuery || selectedFilter !== 'all' ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Search Results ({filteredResults.length})
            </h2>
            {searchQuery && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing results for "{searchQuery}"
              </div>
            )}
          </div>

          <div className="space-y-3">
            {filteredResults.map((result, index) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getTypeColor(result.type)}`}>
                      {getTypeIcon(result.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {result.title}
                        {result.favorite && (
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        )}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="capitalize">{result.type}</span>
                        <span>•</span>
                        <span>{result.subject}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{result.relevance}% match</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(result.lastAccessed).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                  {result.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full flex items-center gap-1"
                      >
                        <Tag className="w-2 h-2" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                    Open →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      ) : (
        /* Default State - Recent Searches & Suggestions */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Searches */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Searches
            </h3>
            <div className="space-y-3">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(search)}
                  className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 dark:text-white">{search}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Suggested Topics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Suggested Topics
            </h3>
            <div className="space-y-3">
              {suggestedTopics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(topic.name.toLowerCase())}
                  className="w-full text-left p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-white">{topic.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {topic.count} items
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Tips */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Search Tips
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium mb-1">Use Keywords</h4>
            <p className="text-sm text-blue-100">
              Search for specific terms, concepts, or topics you're studying
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Filter by Type</h4>
            <p className="text-sm text-blue-100">
              Narrow down results by content type: flashcards, quizzes, or materials
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Use Tags</h4>
            <p className="text-sm text-blue-100">
              Search by subject tags like "psychology" or "biology" for better results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;