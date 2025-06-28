import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Image, 
  Film, 
  Music, 
  Download, 
  Eye, 
  Edit3, 
  Trash2, 
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Calendar,
  Tag,
  Star,
  MoreVertical,
  Folder,
  Upload
} from 'lucide-react';

interface Material {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'video' | 'audio' | 'text';
  size: number;
  uploadDate: string;
  lastAccessed: string;
  tags: string[];
  favorite: boolean;
  progress?: number;
  thumbnail?: string;
  description?: string;
  folder?: string;
}

const Materials: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size' | 'type'>('date');
  const [filterType, setFilterType] = useState<'all' | 'pdf' | 'doc' | 'image' | 'video' | 'audio'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');

  const materials: Material[] = [
    {
      id: '1',
      name: 'Psychology Study Guide',
      type: 'pdf',
      size: 2457600, // 2.4 MB
      uploadDate: '2025-06-20',
      lastAccessed: '2025-06-28',
      tags: ['psychology', 'study-guide', 'cognitive'],
      favorite: true,
      progress: 75,
      description: 'Comprehensive guide covering cognitive psychology fundamentals',
      folder: 'Psychology'
    },
    {
      id: '2',
      name: 'Biology Lecture Notes',
      type: 'doc',
      size: 1234567,
      uploadDate: '2025-06-15',
      lastAccessed: '2025-06-27',
      tags: ['biology', 'notes', 'cellular'],
      favorite: false,
      progress: 60,
      description: 'Detailed notes from cellular biology lectures',
      folder: 'Biology'
    },
    {
      id: '3',
      name: 'History Timeline Infographic',
      type: 'image',
      size: 987654,
      uploadDate: '2025-06-18',
      lastAccessed: '2025-06-26',
      tags: ['history', 'timeline', 'visual'],
      favorite: true,
      description: 'Visual timeline of major historical events',
      folder: 'History'
    },
    {
      id: '4',
      name: 'Chemistry Lab Video',
      type: 'video',
      size: 15728640, // 15 MB
      uploadDate: '2025-06-22',
      lastAccessed: '2025-06-28',
      tags: ['chemistry', 'lab', 'experiment'],
      favorite: false,
      progress: 30,
      description: 'Laboratory demonstration of chemical reactions',
      folder: 'Chemistry'
    },
    {
      id: '5',
      name: 'Math Formula Sheet',
      type: 'pdf',
      size: 654321,
      uploadDate: '2025-06-25',
      lastAccessed: '2025-06-28',
      tags: ['mathematics', 'formulas', 'reference'],
      favorite: true,
      description: 'Quick reference for important mathematical formulas',
      folder: 'Mathematics'
    },
    {
      id: '6',
      name: 'Physics Audio Lecture',
      type: 'audio',
      size: 8765432,
      uploadDate: '2025-06-19',
      lastAccessed: '2025-06-25',
      tags: ['physics', 'lecture', 'quantum'],
      favorite: false,
      progress: 45,
      description: 'Audio recording of quantum physics lecture',
      folder: 'Physics'
    }
  ];

  const folders = ['all', ...Array.from(new Set(materials.map(m => m.folder).filter(Boolean)))];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-6 h-6" />;
      case 'video': return <Film className="w-6 h-6" />;
      case 'audio': return <Music className="w-6 h-6" />;
      default: return <FileText className="w-6 h-6" />;
    }
  };

  const getFileColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-400';
      case 'doc': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
      case 'image': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'video': return 'text-purple-600 bg-purple-100 dark:bg-purple-900 dark:text-purple-400';
      case 'audio': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredMaterials = materials
    .filter(material => {
      if (filterType !== 'all' && material.type !== filterType) return false;
      if (selectedFolder !== 'all' && material.folder !== selectedFolder) return false;
      if (searchQuery && !material.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'date': return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'size': return b.size - a.size;
        case 'type': return a.type.localeCompare(b.type);
        default: return 0;
      }
    });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Materials</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Organize and access all your learning resources
          </p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2">
          <Upload className="w-4 h-4" />
          Upload Files
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search materials, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {folders.map(folder => (
                <option key={folder} value={folder}>
                  {folder === 'all' ? 'All Folders' : folder}
                </option>
              ))}
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="all">All Types</option>
              <option value="pdf">PDF</option>
              <option value="doc">Documents</option>
              <option value="image">Images</option>
              <option value="video">Videos</option>
              <option value="audio">Audio</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
              <option value="type">Sort by Type</option>
            </select>

            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{materials.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Files</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatFileSize(materials.reduce((sum, m) => sum + m.size, 0))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Size</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {materials.filter(m => m.favorite).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Favorites</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {folders.length - 1}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Folders</div>
        </div>
      </div>

      {/* Materials Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getFileColor(material.type)}`}>
                    {getFileIcon(material.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    {material.favorite && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 truncate">
                  {material.name}
                </h4>
                
                {material.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {material.description}
                  </p>
                )}

                {material.progress !== undefined && (
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">{material.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${material.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mb-3">
                  {material.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {material.tags.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{material.tags.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span>{formatFileSize(material.size)}</span>
                  <span>{formatDate(material.uploadDate)}</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white text-sm py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-sm py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Download className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="grid grid-cols-12  gap-4 p-4 bg-gray-50 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600">
              <div className="col-span-5">Name</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-1">Size</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-1">Progress</div>
              <div className="col-span-1">Actions</div>
            </div>
            
            {filteredMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="col-span-5 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getFileColor(material.type)}`}>
                    {getFileIcon(material.type)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      {material.name}
                      {material.favorite && (
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      )}
                    </div>
                    {material.folder && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Folder className="w-3 h-3" />
                        {material.folder}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="col-span-2 flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getFileColor(material.type)}`}>
                    {material.type.toUpperCase()}
                  </span>
                </div>
                
                <div className="col-span-1 flex items-center text-sm text-gray-600 dark:text-gray-400">
                  {formatFileSize(material.size)}
                </div>
                
                <div className="col-span-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(material.lastAccessed)}
                </div>
                
                <div className="col-span-1 flex items-center">
                  {material.progress !== undefined ? (
                    <div className="w-full">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                        <div
                          className="bg-blue-500 h-1 rounded-full"
                          style={{ width: `${material.progress}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {material.progress}%
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-gray-400">-</span>
                  )}
                </div>
                
                <div className="col-span-1 flex items-center gap-2">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {filteredMaterials.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No materials found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchQuery || filterType !== 'all' || selectedFolder !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Upload your first study material to get started'}
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
            Upload Files
          </button>
        </div>
      )}
    </div>
  );
};

export default Materials;