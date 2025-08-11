import React, { useState, useEffect } from 'react';
import { Star, Users, Shield, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Link } from "react-router-dom"; // Removed - not available in artifact environment
import SearchBox from "@/components/SearchBox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import heroImage from "@/assets/hero-hotel.jpg";
import { getAllHotels } from '@/api/Services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kolkata nearby places
  const kolkataNearbyPlaces = [
    {
      name: "Victoria Memorial",
      type: "Historical Monument",
      distance: "2.5 km",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
    },
    {
      name: "Howrah Bridge",
      type: "Iconic Bridge",
      distance: "3.8 km",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=300&fit=crop"
    },
    {
      name: "Park Street",
      type: "Shopping & Dining",
      distance: "1.2 km",
      image: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=400&h=300&fit=crop"
    },
    {
      name: "Eden Gardens",
      type: "Cricket Stadium",
      distance: "4.1 km",
      image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=300&fit=crop"
    }
  ];

  // Fetch hotels from API
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        let response=await getAllHotels()

      

       
          setHotels(response.data.slice(0, 3));
       
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const iconMap = {
    Shield,
    Clock,
    Star,
    Users,
    MapPin,
  };

  const getIcon = (iconName: string) =>
    iconMap[iconName as keyof typeof iconMap] || Star;

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-56 text-white">
          {/* Text block (only visible on md and up) */}
          <div className="hidden md:block text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Find Your Perfect
              <span className="block text-secondary">Hotel Stay</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-up">
              Discover amazing hotels, resorts, and accommodations for your next
              adventure. Book with confidence and travel with ease.
            </p>
            {/* <Link to="/hotels"> */}
              <Button
                size="lg"
                className="secondary-gradient text-foreground hover-lift animate-scale-in"
                onClick={() => console.log('Navigate to hotels page')}
              >
                Explore Hotels
              </Button>
            {/* </Link> */}
          </div>

          {/* SearchBox (visible on all screens) */}
          <div className="w-full max-w-6xl mx-auto animate-slide-up">
            <SearchBox />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">
              Why Choose HotelBook?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              We provide the best hotel booking experience with unmatched
              service and value
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <Card className="hotel-card hover-lift text-center animate-scale-in">
              <CardContent className="p-6">
                <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Best Price Guarantee
                </h3>
                <p className="text-muted-foreground">
                  We guarantee the best prices for your hotel bookings
                </p>
              </CardContent>
            </Card>
            <Card
              className="hotel-card hover-lift text-center animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="p-6">
                <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  24/7 Customer Support
                </h3>
                <p className="text-muted-foreground">
                  Round-the-clock assistance for all your travel needs
                </p>
              </CardContent>
            </Card>
            <Card
              className="hotel-card hover-lift text-center animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-6">
                <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Premium Hotels</h3>
                <p className="text-muted-foreground">
                  Handpicked selection of luxury and comfort accommodations
                </p>
              </CardContent>
            </Card>
            <Card
              className="hotel-card hover-lift text-center animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <CardContent className="p-6">
                <Users className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">
                  Trusted by Millions
                </h3>
                <p className="text-muted-foreground">
                  Join millions of satisfied customers worldwide
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nearby Places - Kolkata */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">
              Nearby Places in Kolkata
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Explore popular attractions and landmarks in the City of Joy
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {kolkataNearbyPlaces.map((place, index) => (
              <Card 
                key={index}
                className="hotel-card hover-lift overflow-hidden animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 rounded text-sm">
                    {place.distance}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-1">{place.name}</h3>
                  <p className="text-sm text-muted-foreground">{place.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">
              Featured Hotels
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Discover our handpicked selection of premium hotels and resorts
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="hotel-card animate-pulse">
                  <div className="bg-gray-300 h-64 w-full"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-red-800 font-semibold mb-2">Unable to load hotels</h3>
                <p className="text-red-600 text-sm">{error}</p>
                <Button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-red-600 hover:bg-red-700"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {hotels.map((hotel, index) => (
                <Card 
                  key={hotel._id} 
                  className="hotel-card hover-lift overflow-hidden animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={hotel.images?.hotel?.[0]?.url || "/placeholder.svg"}
                      alt={hotel.hotelName}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold">{hotel.starRating || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {hotel.hotelName}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {hotel.city}, {hotel.state}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-sm text-muted-foreground">From</span>
                        <div>
                          <span className="text-2xl font-bold text-primary">
                            ₹2,999
                          </span>
                          <span className="text-muted-foreground">/night</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          {hotel.propertyType}
                        </div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {hotel.facilities?.slice(0, 3).map((facility, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                          >
                            {facility}
                          </span>
                        ))}
                        {hotel.facilities?.length > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{hotel.facilities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <Link to={`/hotel/${hotel._id}`}>
                                  <Button className="mt-2 primary-gradient hover-lift">
                                    View Details
                                  </Button>
                                </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && !error && hotels.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="text-gray-800 font-semibold mb-2">No hotels available</h3>
                <p className="text-gray-600 text-sm">Please check back later for available hotels.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;