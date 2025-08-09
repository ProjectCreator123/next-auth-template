"use client";

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import {
  Upload,
  Search,
  Filter,
  Grid3X3,
  List,
  Download,
  Share2,
  Trash2,
  MoreVertical,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  Folder,
  FolderOpen,
  Star,
  Clock,
  User,
  Calendar,
  HardDrive
} from 'lucide-react';

interface FileItem {
  id: number;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  owner: string;
  shared: boolean;
  starred: boolean;
  fileType?: 'document' | 'image' | 'video' | 'audio' | 'other';
}

export default function FilesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const files: FileItem[] = [
    {
      id: 1,
      name: 'Project Documents',
      type: 'folder',
      modified: '2 days ago',
      owner: 'John Doe',
      shared: true,
      starred: false
    },
    {
      id: 2,
      name: 'Design Assets',
      type: 'folder',
      modified: '1 week ago',
      owner: 'Sarah Wilson',
      shared: false,
      starred: true
    },
    {
      id: 3,
      name: 'presentation.pptx',
      type: 'file',
      size: '2.4 MB',
      modified: '3 hours ago',
      owner: 'Mike Johnson',
      shared: true,
      starred: false,
      fileType: 'document'
    },
    {
      id: 4,
      name: 'logo-design.png',
      type: 'file',
      size: '856 KB',
      modified: '1 day ago',
      owner: 'Emily Brown',
      shared: false,
      starred: true,
      fileType: 'image'
    },
    {
      id: 5,
      name: 'demo-video.mp4',
      type: 'file',
      size: '45.2 MB',
      modified: '5 days ago',
      owner: 'David Lee',
      shared: true,
      starred: false,
      fileType: 'video'
    },
    {
      id: 6,
      name: 'meeting-notes.docx',
      type: 'file',
      size: '124 KB',
      modified: '2 hours ago',
      owner: 'John Doe',
      shared: false,
      starred: false,
      fileType: 'document'
    },
    {
      id: 7,
      name: 'audio-recording.mp3',
      type: 'file',
      size: '8.7 MB',
      modified: '1 week ago',
      owner: 'Sarah Wilson',
      shared: true,
      starred: false,
      fileType: 'audio'
    },
    {
      id: 8,
      name: 'Reports',
      type: 'folder',
      modified: '3 days ago',
      owner: 'Mike Johnson',
      shared: false,
      starred: false
    }
  ];

  const getFileIcon = (item: FileItem) => {
    if (item.type === 'folder') {
      return <Folder className="w-8 h-8 text-blue-500" />;
    }
    
    switch (item.fileType) {
      case 'document':
        return <FileText className="w-8 h-8 text-blue-600" />;
      case 'image':
        return <FileImage className="w-8 h-8 text-green-600" />;
      case 'video':
        return <FileVideo className="w-8 h-8 text-purple-600" />;
      case 'audio':
        return <FileAudio className="w-8 h-8 text-orange-600" />;
      default:
        return <File className="w-8 h-8 text-gray-600" />;
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const storageUsed = 75; // percentage

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Files</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage and organize your files and folders</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Upload size={16} />
                Upload
              </button>
            </div>
          </div>

          {/* Storage Info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <HardDrive className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Storage</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">7.5 GB of 10 GB used</p>
                </div>
              </div>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{storageUsed}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${storageUsed}%` }}
              ></div>
            </div>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Grid3X3 size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          {selectedItems.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-blue-800 dark:text-blue-200 font-medium">
                  {selectedItems.length} item(s) selected
                </span>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download size={14} />
                    Download
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Share2 size={14} />
                    Share
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Files Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all cursor-pointer ${
                    selectedItems.includes(file.id) ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                  onClick={() => toggleSelection(file.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-3">
                      {getFileIcon(file)}
                    </div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate w-full mb-1">
                      {file.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {file.type === 'file' ? file.size : 'Folder'}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {file.modified}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {file.starred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                      {file.shared && <Share2 className="w-3 h-3 text-blue-500" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Modified
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Owner
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredFiles.map((file) => (
                      <tr
                        key={file.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
                          selectedItems.includes(file.id) ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onClick={() => toggleSelection(file.id)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {getFileIcon(file)}
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {file.name}
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                {file.starred && <Star className="w-3 h-3 text-yellow-500 fill-current" />}
                                {file.shared && <Share2 className="w-3 h-3 text-blue-500" />}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {file.type === 'file' ? file.size : '—'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {file.modified}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {file.owner}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
