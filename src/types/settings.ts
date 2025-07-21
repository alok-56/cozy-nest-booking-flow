export interface BrandingSettings {
  siteName: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export interface ContactSettings {
  phone: string;
  email: string;
  address: string;
  social: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface NearbyPlace {
  id: string;
  name: string;
  distance: string;
  type: string;
  image: string;
}

export interface HotelItem {
  id: number;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}

export interface ContentSettings {
  heroTitle: string;
  heroSubtitle: string;
  featuresTitle: string;
  featuresSubtitle: string;
  hotelsTitle: string;
  hotelsSubtitle: string;
  aboutContent: string;
  features: FeatureItem[];
  nearbyPlaces: NearbyPlace[];
  featuredHotels: HotelItem[];
}

export interface AppSettings {
  branding: BrandingSettings;
  contact: ContactSettings;
  content: ContentSettings;
}