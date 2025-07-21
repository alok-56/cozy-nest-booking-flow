import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppSettings, BrandingSettings, ContactSettings, ContentSettings } from '@/types/settings';

const defaultSettings: AppSettings = {
  branding: {
    siteName: 'HotelBook',
    logo: '/placeholder.svg',
    primaryColor: 'hsl(220, 70%, 50%)',
    secondaryColor: 'hsl(45, 90%, 60%)',
    accentColor: 'hsl(280, 80%, 60%)',
  },
  contact: {
    phone: '+1 (555) 123-4567',
    email: 'contact@hotelbook.com',
    address: '123 Business Street, Suite 100, City, State 12345',
    social: {
      facebook: 'https://facebook.com/hotelbook',
      twitter: 'https://twitter.com/hotelbook',
      instagram: 'https://instagram.com/hotelbook',
    },
  },
  content: {
    heroTitle: 'Find Your Perfect Hotel Stay',
    heroSubtitle: 'Discover amazing hotels, resorts, and accommodations for your next adventure. Book with confidence and travel with ease.',
    featuresTitle: 'Why Choose HotelBook?',
    featuresSubtitle: 'We provide the best hotel booking experience with unmatched service and value',
    hotelsTitle: 'Featured Hotels',
    hotelsSubtitle: 'Discover our handpicked selection of premium hotels and resorts',
    aboutContent: 'We are a leading hotel booking platform dedicated to providing exceptional travel experiences.',
    features: [
      {
        id: '1',
        icon: 'Shield',
        title: 'Best Price Guarantee',
        description: 'We guarantee the best prices for your hotel bookings',
      },
      {
        id: '2',
        icon: 'Clock',
        title: '24/7 Customer Support',
        description: 'Round-the-clock assistance for all your travel needs',
      },
      {
        id: '3',
        icon: 'Star',
        title: 'Premium Hotels',
        description: 'Handpicked selection of luxury and comfort accommodations',
      },
      {
        id: '4',
        icon: 'Users',
        title: 'Trusted by Millions',
        description: 'Join millions of satisfied customers worldwide',
      },
    ],
    nearbyPlaces: [
      {
        id: '1',
        name: 'Central Park',
        distance: '0.5 km',
        type: 'Park',
        image: '/placeholder.svg',
      },
      {
        id: '2',
        name: 'Times Square',
        distance: '1.2 km',
        type: 'Tourist Attraction',
        image: '/placeholder.svg',
      },
      {
        id: '3',
        name: 'Metropolitan Museum',
        distance: '2.1 km',
        type: 'Museum',
        image: '/placeholder.svg',
      },
      {
        id: '4',
        name: 'Empire State Building',
        distance: '1.8 km',
        type: 'Landmark',
        image: '/placeholder.svg',
      },
    ],
    featuredHotels: [
      {
        id: 1,
        name: 'Grand Plaza Hotel',
        location: 'New York City',
        price: 299,
        rating: 4.8,
        reviews: 1250,
        image: '/placeholder.svg',
      },
      {
        id: 2,
        name: 'Ocean View Resort',
        location: 'Miami Beach',
        price: 199,
        rating: 4.6,
        reviews: 890,
        image: '/placeholder.svg',
      },
      {
        id: 3,
        name: 'Urban Loft Hotel',
        location: 'Chicago',
        price: 149,
        rating: 4.5,
        reviews: 567,
        image: '/placeholder.svg',
      },
    ],
  },
};

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('hotelbook-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsedSettings });
      } catch (error) {
        console.error('Error parsing saved settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('hotelbook-settings', JSON.stringify(updatedSettings));
    
    // Update CSS custom properties for colors
    if (newSettings.branding) {
      const root = document.documentElement;
      if (newSettings.branding.primaryColor) {
        root.style.setProperty('--primary', newSettings.branding.primaryColor);
      }
      if (newSettings.branding.secondaryColor) {
        root.style.setProperty('--secondary', newSettings.branding.secondaryColor);
      }
      if (newSettings.branding.accentColor) {
        root.style.setProperty('--accent', newSettings.branding.accentColor);
      }
    }
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('hotelbook-settings');
    
    // Reset CSS custom properties
    const root = document.documentElement;
    root.style.setProperty('--primary', defaultSettings.branding.primaryColor);
    root.style.setProperty('--secondary', defaultSettings.branding.secondaryColor);
    root.style.setProperty('--accent', defaultSettings.branding.accentColor);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};