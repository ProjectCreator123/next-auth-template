// src/app/calendar/page.tsx
'use client';

import React, { useState } from 'react';
import LayoutWrapper from '@/app/components/layout/LayoutWrapper';
import AuthGuard from '@/app/components/AuthGuard';
import { useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Filter,
  Search
} from 'lucide-react';
import Button from '@/app/components/ui/Button';
import Card from '@/app/components/ui/Card';

// Sample events data
const events = [
  {
    id: 1,
    title: 'Team Meeting',
    date: '2024-01-15',
    time: '10:00 AM',
    duration: '1 hour',
    location: 'Conference Room A',
    attendees: 5,
    color: 'bg-blue-500',
    type: 'meeting'
  },
  {
    id: 2,
    title: 'Project Review',
    date: '2024-01-15',
    time: '2:00 PM',
    duration: '2 hours',
    location: 'Virtual',
    attendees: 8,
    color: 'bg-green-500',
    type: 'review'
  },
  {
    id: 3,
    title: 'Client Presentation',
    date: '2024-01-16',
    time: '11:00 AM',
    duration: '1.5 hours',
    location: 'Client Office',
    attendees: 3,
    color: 'bg-purple-500',
    type: 'presentation'
  },
  {
    id: 4,
    title: 'Training Session',
    date: '2024-01-17',
    time: '9:00 AM',
    duration: '3 hours',
    location: 'Training Room',
    attendees: 12,
    color: 'bg-orange-500',
    type: 'training'
  }
];

const CalendarPage = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your schedule and events</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {['month', 'week', 'day'].map((viewType) => (
                  <button
                    key={viewType}
                    onClick={() => setView(viewType as 'month' | 'week' | 'day')}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                      view === viewType
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                  </button>
                ))}
              </div>
              <Button
                icon={<Plus size={16} />}
                onClick={() => router.push('/calendar/add')}
              >
                Add Event
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar */}
            <div className="lg:col-span-3">
              <Card>
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => navigateMonth('prev')}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <button
                      onClick={() => navigateMonth('next')}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day headers */}
                  {daysOfWeek.map(day => (
                    <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                      {day}
                    </div>
                  ))}
                  
                  {/* Calendar days */}
                  {days.map((date, index) => {
                    if (!date) {
                      return <div key={index} className="p-3 h-24" />;
                    }
                    
                    const dayEvents = getEventsForDate(date);
                    const isCurrentDay = isToday(date);
                    const isSelectedDay = isSelected(date);
                    
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedDate(date)}
                        className={`p-2 h-24 border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          isCurrentDay ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        } ${isSelectedDay ? 'ring-2 ring-blue-500' : ''}`}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          isCurrentDay ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                        }`}>
                          {date.getDate()}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs px-2 py-1 rounded text-white truncate ${event.color}`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 px-2">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Mini Calendar */}
              <Card>
                <Card.Header>
                  <Card.Title>Quick Navigation</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {new Date().getDate()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
                    </div>
                  </div>
                </Card.Content>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <Card.Header>
                  <Card.Title>Upcoming Events</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-3">
                    {events.slice(0, 4).map(event => (
                      <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className={`w-3 h-3 rounded-full ${event.color} mt-1.5`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {event.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <Clock size={12} />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <MapPin size={12} />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Content>
              </Card>

              {/* Event Types */}
              <Card>
                <Card.Header>
                  <Card.Title>Event Types</Card.Title>
                </Card.Header>
                <Card.Content>
                  <div className="space-y-2">
                    {[
                      { name: 'Meetings', color: 'bg-blue-500', count: 12 },
                      { name: 'Reviews', color: 'bg-green-500', count: 5 },
                      { name: 'Presentations', color: 'bg-purple-500', count: 3 },
                      { name: 'Training', color: 'bg-orange-500', count: 8 }
                    ].map(type => (
                      <div key={type.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${type.color}`} />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{type.name}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{type.count}</span>
                      </div>
                    ))}
                  </div>
                </Card.Content>
              </Card>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
};

export default CalendarPage;
