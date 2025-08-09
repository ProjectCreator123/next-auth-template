"use client";

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import {
  Search,
  Plus,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Star,
  Archive,
  Trash2,
  Circle,
  CheckCheck,
  MessageSquare
} from 'lucide-react';

interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: 'me' | 'other';
  status?: 'sent' | 'delivered' | 'read';
}

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  type: 'direct' | 'group';
}

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const chats: Chat[] = [
    {
      id: 1,
      name: 'Sarah Wilson',
      avatar: 'SW',
      lastMessage: 'Hey! How are you doing?',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      type: 'direct'
    },
    {
      id: 2,
      name: 'Development Team',
      avatar: 'DT',
      lastMessage: 'Mike: The new feature is ready for testing',
      timestamp: '15 min ago',
      unread: 1,
      online: false,
      type: 'group'
    },
    {
      id: 3,
      name: 'John Smith',
      avatar: 'JS',
      lastMessage: 'Thanks for the update!',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      type: 'direct'
    },
    {
      id: 4,
      name: 'Marketing Team',
      avatar: 'MT',
      lastMessage: 'Emily: Campaign results are looking great',
      timestamp: '2 hours ago',
      unread: 0,
      online: false,
      type: 'group'
    },
    {
      id: 5,
      name: 'Alex Johnson',
      avatar: 'AJ',
      lastMessage: 'See you at the meeting tomorrow',
      timestamp: '1 day ago',
      unread: 0,
      online: true,
      type: 'direct'
    }
  ];

  const messages: Message[] = [
    {
      id: 1,
      text: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      sender: 'other'
    },
    {
      id: 2,
      text: 'I\'m doing great! Just finished the project we discussed.',
      timestamp: '10:32 AM',
      sender: 'me',
      status: 'read'
    },
    {
      id: 3,
      text: 'That\'s awesome! Can you share the details?',
      timestamp: '10:33 AM',
      sender: 'other'
    },
    {
      id: 4,
      text: 'Sure! I\'ll send you the documentation in a few minutes.',
      timestamp: '10:35 AM',
      sender: 'me',
      status: 'delivered'
    }
  ];

  const currentChat = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Add message logic here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="h-[calc(100vh-2rem)] flex">
          {/* Sidebar */}
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h1>
                <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Plus size={20} />
                </button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`p-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                    selectedChat === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {chat.avatar}
                      </div>
                      {chat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">{chat.name}</h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{chat.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{chat.lastMessage}</p>
                    </div>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                        {chat.unread}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {currentChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {currentChat.avatar}
                      </div>
                      {currentChat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h2 className="font-medium text-gray-900 dark:text-white">{currentChat.name}</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {currentChat.online ? 'Online' : 'Last seen 2 hours ago'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Phone size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Video size={18} />
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Info size={18} />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.sender === 'me'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <div className={`flex items-center justify-between mt-1 ${
                          message.sender === 'me' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          <span className="text-xs">{message.timestamp}</span>
                          {message.sender === 'me' && message.status && (
                            <div className="ml-2">
                              {message.status === 'sent' && <Circle size={12} />}
                              {message.status === 'delivered' && <CheckCheck size={12} />}
                              {message.status === 'read' && <CheckCheck size={12} className="text-blue-200" />}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Paperclip size={18} />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <Smile size={18} />
                      </button>
                    </div>
                    <button
                      onClick={handleSendMessage}
                      className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No conversation selected</h3>
                  <p className="text-gray-500 dark:text-gray-400">Choose a conversation from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
