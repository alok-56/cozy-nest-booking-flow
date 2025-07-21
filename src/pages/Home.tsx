import { Star, Users, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchBox from '@/components/SearchBox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import heroImage from '@/assets/hero-hotel.jpg';
import hotel1 from '@/assets/hotel-1.jpg';
import hotel2 from '@/assets/hotel-2.jpg';
import hotel3 from '@/assets/hotel-3.jpg';

const Home = () => {
  const featuredHotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'New York City',
      price: 299,
      rating: 4.8,
      reviews: 1250,
      image: hotel1,
    },
    {
      id: 2,
      name: 'Ocean View Resort',
      location: 'Miami Beach',
      price: 199,
      rating: 4.6,
      reviews: 890,
      image: hotel2,
    },
    {
      id: 3,
      name: 'Urban Loft Hotel',
      location: 'Chicago',
      price: 149,
      rating: 4.5,
      reviews: 567,
      image: hotel3,
    },
  ];

  const features = [
    {
      icon: Shield,
      title: 'Best Price Guarantee',
      description: 'We guarantee the best prices for your hotel bookings',
    },
    {
      icon: Clock,
      title: '24/7 Customer Support',
      description: 'Round-the-clock assistance for all your travel needs',
    },
    {
      icon: Star,
      title: 'Premium Hotels',
      description: 'Handpicked selection of luxury and comfort accommodations',
    },
    {
      icon: Users,
      title: 'Trusted by Millions',
      description: 'Join millions of satisfied customers worldwide',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
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
            Discover amazing hotels, resorts, and accommodations for your next adventure. 
            Book with confidence and travel with ease.
          </p>
          <Button size="lg" className="secondary-gradient text-foreground hover-lift animate-scale-in">
            Explore Hotels
          </Button>
        </div>
        
        {/* Search Box Overlay */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-6xl px-4">
          <SearchBox />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Why Choose HotelBook?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              We provide the best hotel booking experience with unmatched service and value
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hotel-card hover-lift text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
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
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Featured Hotels</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Discover our handpicked selection of premium hotels and resorts
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredHotels.map((hotel, index) => (
              <Card key={hotel.id} className="hotel-card hover-lift overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img src={hotel.image} alt={hotel.name} className="w-full h-64 object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">{hotel.rating}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
                  <p className="text-muted-foreground mb-4">{hotel.location}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">${hotel.price}</span>
                      <span className="text-muted-foreground">/night</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">{hotel.reviews} reviews</div>
                    </div>
                  </div>
                  <Button className="w-full mt-4 primary-gradient hover-lift">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;