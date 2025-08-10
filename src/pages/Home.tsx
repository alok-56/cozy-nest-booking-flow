import { Star, Users, Shield, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import SearchBox from "@/components/SearchBox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import heroImage from "@/assets/hero-hotel.jpg";
import hotel1 from "@/assets/hotel-1.jpg";
import hotel2 from "@/assets/hotel-2.jpg";
import hotel3 from "@/assets/hotel-3.jpg";

const Home = () => {
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
      {/* <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 hero-gradient" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Find Your Perfect
            <span className="block text-secondary">Hotel Stay</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-up">
            Discover amazing hotels, resorts, and accommodations for your next adventure. Book with confidence and travel with ease.
          </p>
          <Link to="/hotels">
            <Button size="lg" className="secondary-gradient text-foreground hover-lift animate-scale-in">
              Explore Hotels
            </Button>
          </Link>
        </div>
        
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4">
          <SearchBox />
        </div>
      </section> */}

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
            <Link to="/hotels">
              <Button
                size="lg"
                className="secondary-gradient text-foreground hover-lift animate-scale-in"
              >
                Explore Hotels
              </Button>
            </Link>
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

      {/* Nearby Places */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">
              Nearby Places
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Explore popular attractions and landmarks near our hotels
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="hotel-card hover-lift overflow-hidden animate-scale-in">
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Central Park"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 rounded text-sm">
                  0.5 km
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Central Park</h3>
                <p className="text-sm text-muted-foreground">Park</p>
              </CardContent>
            </Card>
            <Card
              className="hotel-card hover-lift overflow-hidden animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Times Square"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 rounded text-sm">
                  1.2 km
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Times Square</h3>
                <p className="text-sm text-muted-foreground">
                  Tourist Attraction
                </p>
              </CardContent>
            </Card>
            <Card
              className="hotel-card hover-lift overflow-hidden animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Metropolitan Museum"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 rounded text-sm">
                  2.1 km
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Metropolitan Museum</h3>
                <p className="text-sm text-muted-foreground">Museum</p>
              </CardContent>
            </Card>
            <Card
              className="hotel-card hover-lift overflow-hidden animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Empire State Building"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3 bg-primary/90 text-white px-2 py-1 rounded text-sm">
                  1.8 km
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">Empire State Building</h3>
                <p className="text-sm text-muted-foreground">Landmark</p>
              </CardContent>
            </Card>
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

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hotel-card hover-lift overflow-hidden animate-scale-in">
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Grand Plaza Hotel"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">4.8</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Grand Plaza Hotel
                </h3>
                <p className="text-muted-foreground mb-4">New York City</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      $299
                    </span>
                    <span className="text-muted-foreground">/night</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      1250 reviews
                    </div>
                  </div>
                </div>
                <Link to="/hotel/1">
                  <Button className="w-full mt-4 primary-gradient hover-lift">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card
              className="hotel-card hover-lift overflow-hidden animate-scale-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Ocean View Resort"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">4.6</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Ocean View Resort
                </h3>
                <p className="text-muted-foreground mb-4">Miami Beach</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      $199
                    </span>
                    <span className="text-muted-foreground">/night</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      890 reviews
                    </div>
                  </div>
                </div>
                <Link to="/hotel/2">
                  <Button className="w-full mt-4 primary-gradient hover-lift">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
            <Card
              className="hotel-card hover-lift overflow-hidden animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Urban Loft Hotel"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">4.5</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Urban Loft Hotel</h3>
                <p className="text-muted-foreground mb-4">Chicago</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary">
                      $149
                    </span>
                    <span className="text-muted-foreground">/night</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      567 reviews
                    </div>
                  </div>
                </div>
                <Link to="/hotel/3">
                  <Button className="w-full mt-4 primary-gradient hover-lift">
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
