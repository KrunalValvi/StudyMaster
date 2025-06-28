import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, Image, Film, Music, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
}

const FileUpload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsProcessing(true);
    
    // Simulate file processing
    setTimeout(() => {
      const newFiles: UploadedFile[] = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file)
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setIsProcessing(false);
    }, 2000);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi'],
      'audio/*': ['.mp3', '.wav', '.aac']
    }
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-6 h-6" />;
    if (type.startsWith('video/')) return <Film className="w-6 h-6" />;
    if (type.startsWith('audio/')) return <Music className="w-6 h-6" />;
    return <FileText className="w-6 h-6" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Upload Study Materials</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Upload PDFs, documents, images, or other study materials for AI processing
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Processing</span>
        </div>
      </div>

      {/* Upload Zone */}
      <motion.div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
            <Upload className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {isDragActive ? 'Drop files here...' : 'Upload your study materials'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Drag & drop files here, or click to browse
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
              Supports PDF, DOC, TXT, images, videos, and audio files
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Processing Indicator */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-4"
          >
            <div className="flex items-center gap-3">
              <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">Processing files with AI...</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Extracting content and generating flashcards automatically
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Uploaded Files</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400">
                    {getFileIcon(file.type)}
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white truncate">{file.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{formatFileSize(file.size)}</p>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white text-sm py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Generate Cards
                  </button>
                  <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    View
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* AI Features */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
        <h3 className="text-lg font-semibold mb-2">AI-Powered Study Enhancement</h3>
        <p className="text-purple-100 mb-4">
          Our advanced AI automatically processes your uploaded materials to create:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 rounded-lg p-3">
            <h4 className="font-medium mb-1">Smart Flashcards</h4>
            <p className="text-sm text-purple-100">Auto-generated from key concepts</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <h4 className="font-medium mb-1">Practice Quizzes</h4>
            <p className="text-sm text-purple-100">Customized to your learning level</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <h4 className="font-medium mb-1">Study Summaries</h4>
            <p className="text-sm text-purple-100">Concise overviews of main topics</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;