"use client";

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Edit3,
  Camera,
  Save,
  X,
  Check,
  Star,
  Award,
  Target,
  TrendingUp,
  Users,
  Clock,
  Activity
} from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    joinDate: '2023-06-15',
    bio: 'Passionate software engineer with 5+ years of experience in full-stack development. Love building scalable applications and mentoring junior developers.',
    skills: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'Docker'],
    achievements: [
      { title: 'Employee of the Month', date: 'December 2023', icon: Award },
      { title: 'Project Excellence Award', date: 'October 2023', icon: Star },
      { title: 'Innovation Champion', date: 'August 2023', icon: Target }
    ]
  });

  const stats = [
    { label: 'Projects Completed', value: '24', icon: Target, color: 'text-blue-600' },
    { label: 'Team Members', value: '8', icon: Users, color: 'text-green-600' },
    { label: 'Hours This Month', value: '156', icon: Clock, color: 'text-purple-600' },
    { label: 'Performance Score', value: '94%', icon: TrendingUp, color: 'text-orange-600' }
  ];

  const recentActivity = [
    { action: 'Completed project "Dashboard Redesign"', time: '2 hours ago', type: 'project' },
    { action: 'Updated profile information', time: '1 day ago', type: 'profile' },
    { action: 'Joined team "Frontend Development"', time: '3 days ago', type: 'team' },
    { action: 'Earned "Innovation Champion" badge', time: '1 week ago', type: 'achievement' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data logic here
    console.log('Saving profile data:', profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
  };

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Manage your personal information and preferences</p>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                {/* Avatar */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                      {profileData.firstName[0]}{profileData.lastName[0]}
                    </div>
                    {isEditing && (
                      <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
                        <Camera size={16} />
                      </button>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {profileData.firstName} {profileData.lastName}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{profileData.position}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{profileData.department}</p>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Mail size={18} />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Phone size={18} />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <MapPin size={18} />
                    <span className="text-sm">{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                    <Calendar size={18} />
                    <span className="text-sm">Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                        </div>
                        <Icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bio */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">About</h3>
                {isEditing ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{profileData.bio}</p>
                )}
              </div>

              {/* Achievements */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Achievements</h3>
                <div className="space-y-4">
                  {profileData.achievements.map((achievement, index) => {
                    const Icon = achievement.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                          <Icon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{achievement.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.date}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                      <div>
                        <p className="text-gray-900 dark:text-white">{activity.action}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
