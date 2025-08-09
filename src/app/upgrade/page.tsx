"use client";

import React, { useState } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter } from 'next/navigation';
import {
  Check,
  X,
  Star,
  Zap,
  Shield,
  Users,
  Database,
  Headphones,
  ArrowRight,
  Crown,
  Sparkles
} from 'lucide-react';

interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  popular: boolean;
  features: PlanFeature[];
  buttonText: string;
  buttonVariant: 'primary' | 'secondary' | 'outline';
}

export default function UpgradePage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      popular: false,
      features: [
        { name: 'Up to 3 users', included: true },
        { name: '5 projects', included: true },
        { name: '1GB storage', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Advanced features', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom integrations', included: false },
        { name: 'Advanced security', included: false }
      ],
      buttonText: 'Current Plan',
      buttonVariant: 'outline'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: billingCycle === 'monthly' ? 29 : 290,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: 'Best for growing teams',
      popular: true,
      features: [
        { name: 'Up to 25 users', included: true },
        { name: 'Unlimited projects', included: true },
        { name: '100GB storage', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority email support', included: true },
        { name: 'Advanced features', included: true },
        { name: 'API access', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Advanced security', included: false }
      ],
      buttonText: 'Upgrade to Pro',
      buttonVariant: 'primary'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 99 : 990,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: 'For large organizations',
      popular: false,
      features: [
        { name: 'Unlimited users', included: true },
        { name: 'Unlimited projects', included: true },
        { name: '1TB storage', included: true },
        { name: 'Advanced analytics', included: true },
        { name: '24/7 phone support', included: true },
        { name: 'All advanced features', included: true },
        { name: 'Full API access', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Enterprise security', included: true }
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    if (planId === 'free') {
      // Already on free plan
      return;
    } else if (planId === 'enterprise') {
      // Redirect to contact sales
      router.push('/contact-sales');
    } else {
      // Redirect to checkout
      router.push(`/checkout?plan=${planId}&billing=${billingCycle}`);
    }
  };

  const getYearlySavings = (monthlyPrice: number) => {
    const yearlyPrice = monthlyPrice * 10; // 2 months free
    const monthlySavings = (monthlyPrice * 12) - yearlyPrice;
    return Math.round((monthlySavings / (monthlyPrice * 12)) * 100);
  };

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Upgrade Your Plan
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Unlock powerful features and take your productivity to the next level. 
              Choose the plan that&apos;s right for you.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors relative ${
                  billingCycle === 'yearly'
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 17%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'border-blue-500 scale-105'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star size={16} />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {plan.description}
                    </p>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        /{plan.period}
                      </span>
                    </div>
                    {billingCycle === 'yearly' && plan.price > 0 && (
                      <div className="text-green-600 dark:text-green-400 text-sm font-medium">
                        Save {getYearlySavings(plan.price / 10)}% with yearly billing
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          feature.included 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {feature.name}
                          {feature.limit && (
                            <span className="text-gray-500 dark:text-gray-400 ml-1">
                              ({feature.limit})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={plan.id === 'free'}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      plan.buttonVariant === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : plan.buttonVariant === 'secondary'
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                        : 'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {plan.buttonText}
                    {plan.id !== 'free' && <ArrowRight size={16} />}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Compare All Features
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-4 px-6 text-gray-900 dark:text-white font-medium">
                      Features
                    </th>
                    {plans.map(plan => (
                      <th key={plan.id} className="text-center py-4 px-6 text-gray-900 dark:text-white font-medium">
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Users', values: ['3', '25', 'Unlimited'] },
                    { name: 'Projects', values: ['5', 'Unlimited', 'Unlimited'] },
                    { name: 'Storage', values: ['1GB', '100GB', '1TB'] },
                    { name: 'Analytics', values: ['Basic', 'Advanced', 'Advanced'] },
                    { name: 'Support', values: ['Email', 'Priority Email', '24/7 Phone'] },
                    { name: 'API Access', values: ['❌', '✅', '✅'] },
                    { name: 'Custom Integrations', values: ['❌', '✅', '✅'] },
                    { name: 'Advanced Security', values: ['❌', '❌', '✅'] }
                  ].map((feature, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                      <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">
                        {feature.name}
                      </td>
                      {feature.values.map((value, valueIndex) => (
                        <td key={valueIndex} className="py-4 px-6 text-center text-gray-600 dark:text-gray-400">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Questions?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Our team is here to help you choose the right plan for your needs.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => router.push('/contact')}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <Headphones size={16} />
                Contact Support
              </button>
              <button
                onClick={() => router.push('/faq')}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View FAQ
              </button>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}
