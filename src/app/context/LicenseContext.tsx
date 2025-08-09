"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LicenseType = 'free' | 'pro' | 'enterprise';

interface LicenseFeatures {
  dashboards: number | 'unlimited';
  components: number | 'unlimited';
  users: number | 'unlimited';
  support: boolean;
  analytics: 'basic' | 'advanced' | 'enterprise';
  customBranding: boolean;
  apiAccess: boolean;
  exportData: boolean;
  multiTenant: boolean;
  sourceCode: boolean;
}

interface LicenseInfo {
  type: LicenseType;
  features: LicenseFeatures;
  expiryDate?: string;
  isValid: boolean;
  licenseKey?: string;
}

interface LicenseContextType {
  license: LicenseInfo;
  checkFeature: (feature: keyof LicenseFeatures) => boolean;
  hasAccess: (feature: string) => boolean;
  upgradeLicense: (newLicense: LicenseType, licenseKey: string) => void;
  isProUser: boolean;
  isEnterpriseUser: boolean;
}

const LICENSE_FEATURES: Record<LicenseType, LicenseFeatures> = {
  free: {
    dashboards: 5,
    components: 20,
    users: 1,
    support: false,
    analytics: 'basic',
    customBranding: false,
    apiAccess: false,
    exportData: false,
    multiTenant: false,
    sourceCode: false
  },
  pro: {
    dashboards: 25,
    components: 100,
    users: 25,
    support: true,
    analytics: 'advanced',
    customBranding: true,
    apiAccess: true,
    exportData: true,
    multiTenant: false,
    sourceCode: false
  },
  enterprise: {
    dashboards: 'unlimited',
    components: 'unlimited',
    users: 'unlimited',
    support: true,
    analytics: 'enterprise',
    customBranding: true,
    apiAccess: true,
    exportData: true,
    multiTenant: true,
    sourceCode: true
  }
};

const LicenseContext = createContext<LicenseContextType | undefined>(undefined);

export const LicenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [license, setLicense] = useState<LicenseInfo>({
    type: 'free',
    features: LICENSE_FEATURES.free,
    isValid: true
  });

  useEffect(() => {
    // Check for existing license in localStorage
    const storedLicense = localStorage.getItem('dashboard_license');
    if (storedLicense) {
      try {
        const parsedLicense = JSON.parse(storedLicense);
        if (validateLicense(parsedLicense)) {
          setLicense(parsedLicense);
        }
      } catch (error) {
        console.error('Invalid license data:', error);
      }
    }
  }, []);

  const validateLicense = (licenseData: { type: string; licenseKey?: string }): boolean => {
    // In a real application, this would validate against your server
    if (!licenseData.licenseKey) return licenseData.type === 'free';
    
    // Simple validation - in production, use proper JWT verification
    const validKeys = {
      pro: 'PRO-2024-DASHBOARD-KEY',
      enterprise: 'ENT-2024-DASHBOARD-KEY'
    };
    
    return validKeys[licenseData.type as keyof typeof validKeys] === licenseData.licenseKey;
  };

  const checkFeature = (feature: keyof LicenseFeatures): boolean => {
    const featureValue = license.features[feature];
    if (typeof featureValue === 'boolean') {
      return featureValue;
    }
    return featureValue === 'unlimited' || (typeof featureValue === 'number' && featureValue > 0);
  };

  const hasAccess = (feature: string): boolean => {
    // Define feature access rules
    const featureAccess: Record<string, LicenseType[]> = {
      'advanced-analytics': ['pro', 'enterprise'],
      'custom-branding': ['pro', 'enterprise'],
      'api-access': ['pro', 'enterprise'],
      'export-data': ['pro', 'enterprise'],
      'priority-support': ['pro', 'enterprise'],
      'multi-tenant': ['enterprise'],
      'source-code': ['enterprise'],
      'white-label': ['enterprise'],
      'custom-development': ['enterprise']
    };

    const allowedLicenses = featureAccess[feature] || ['free', 'pro', 'enterprise'];
    return allowedLicenses.includes(license.type);
  };

  const upgradeLicense = (newLicense: LicenseType, licenseKey: string) => {
    const newLicenseInfo: LicenseInfo = {
      type: newLicense,
      features: LICENSE_FEATURES[newLicense],
      licenseKey,
      isValid: validateLicense({ type: newLicense, licenseKey }),
      expiryDate: newLicense !== 'free' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : undefined
    };

    if (newLicenseInfo.isValid) {
      setLicense(newLicenseInfo);
      localStorage.setItem('dashboard_license', JSON.stringify(newLicenseInfo));
    }
  };

  const value: LicenseContextType = {
    license,
    checkFeature,
    hasAccess,
    upgradeLicense,
    isProUser: license.type === 'pro' || license.type === 'enterprise',
    isEnterpriseUser: license.type === 'enterprise'
  };

  return (
    <LicenseContext.Provider value={value}>
      {children}
    </LicenseContext.Provider>
  );
};

export const useLicense = (): LicenseContextType => {
  const context = useContext(LicenseContext);
  if (!context) {
    throw new Error('useLicense must be used within a LicenseProvider');
  }
  return context;
};

// HOC for protecting pro features
export const withProAccess = <P extends object>(
  Component: React.ComponentType<P>,
  fallbackComponent?: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P) => {
    const { isProUser } = useLicense();
    
    if (!isProUser && fallbackComponent) {
      const FallbackComponent = fallbackComponent;
      return <FallbackComponent {...props} />;
    }
    
    if (!isProUser) {
      return (
        <div className="p-6 text-center bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Pro Feature
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This feature is available in the Pro version
          </p>
          <button
            onClick={() => window.location.href = '/upgrade'}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upgrade to Pro
          </button>
        </div>
      );
    }
    
    return <Component {...props} />;
  };

  WrappedComponent.displayName = `withProAccess(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

// Component for showing feature limitations
export const FeatureLimitBanner: React.FC<{
  feature: string;
  currentUsage?: number;
  limit?: number;
}> = ({ feature, currentUsage, limit }) => {
  const { license, hasAccess } = useLicense();
  
  if (hasAccess(feature)) return null;
  
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-yellow-600 dark:text-yellow-400">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
              Feature Limited
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              {currentUsage && limit ? 
                `You've used ${currentUsage} of ${limit} available ${feature}` :
                `${feature} is limited in the ${license.type} plan`
              }
            </p>
          </div>
        </div>
        <button
          onClick={() => window.location.href = '/upgrade'}
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors text-sm font-medium"
        >
          Upgrade
        </button>
      </div>
    </div>
  );
};
