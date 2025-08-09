"use client";

import React, { useState, useEffect, Suspense } from 'react';
import LayoutWrapper from "@/app/components/layout/LayoutWrapper";
import AuthGuard from "@/app/components/AuthGuard";
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Check,
  Shield,
  Calendar,
  DollarSign
} from 'lucide-react';

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  
  const plan = searchParams.get('plan') || 'pro';
  const billing = searchParams.get('billing') || 'monthly';

  const [formData, setFormData] = useState({
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  const planDetails = {
    pro: {
      name: 'Pro Plan',
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        'Up to 25 users',
        'Unlimited projects',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'API access'
      ]
    },
    enterprise: {
      name: 'Enterprise Plan',
      monthlyPrice: 99,
      yearlyPrice: 990,
      features: [
        'Unlimited users',
        'Unlimited projects',
        '1TB storage',
        'Advanced analytics',
        '24/7 phone support',
        'Full API access',
        'Enterprise security'
      ]
    }
  };

  const currentPlan = planDetails[plan as keyof typeof planDetails];
  const price = billing === 'yearly' ? currentPlan.yearlyPrice : currentPlan.monthlyPrice;
  const savings = billing === 'yearly' ? (currentPlan.monthlyPrice * 12) - currentPlan.yearlyPrice : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('billing.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        billingAddress: { ...prev.billingAddress, [field]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      router.push('/checkout/success');
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formatted }));
  };

  return (
    <AuthGuard>
      <LayoutWrapper>
        <div className="p-6 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push('/upgrade')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Complete Your Purchase</h1>
              <p className="text-gray-600 dark:text-gray-400">Secure checkout powered by Stripe</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{currentPlan.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Billed {billing === 'yearly' ? 'annually' : 'monthly'}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      ${price}
                    </div>
                    {billing === 'yearly' && (
                      <div className="text-sm text-green-600 dark:text-green-400">
                        Save ${savings}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Included features:</h4>
                  <ul className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Check size={16} className="text-green-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center text-lg font-semibold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${price}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {billing === 'yearly' ? 'Per year' : 'Per month'} • Cancel anytime
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-6">
                <Lock size={20} className="text-green-500" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Secure Payment</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Card Information */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Card Information
                  </label>
                  <div className="space-y-3">
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        required
                        maxLength={19}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="1234 1234 1234 1234"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        required
                        placeholder="CVV"
                        maxLength={4}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Cardholder Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    name="cardholderName"
                    value={formData.cardholderName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Full name on card"
                  />
                </div>

                {/* Billing Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Billing Address
                  </label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="billing.street"
                      value={formData.billingAddress.street}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Street address"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="billing.city"
                        value={formData.billingAddress.city}
                        onChange={handleInputChange}
                        required
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="City"
                      />
                      <input
                        type="text"
                        name="billing.state"
                        value={formData.billingAddress.state}
                        onChange={handleInputChange}
                        required
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="State"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        name="billing.zipCode"
                        value={formData.billingAddress.zipCode}
                        onChange={handleInputChange}
                        required
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="ZIP code"
                      />
                      <select
                        name="billing.country"
                        value={formData.billingAddress.country}
                        onChange={handleInputChange}
                        required
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="">Select country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Shield size={16} />
                      Complete Purchase - ${price}
                    </>
                  )}
                </button>

                {/* Security Notice */}
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Lock size={14} />
                    Your payment information is secure and encrypted
                  </div>
                  <p>30-day money-back guarantee • Cancel anytime</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </AuthGuard>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
