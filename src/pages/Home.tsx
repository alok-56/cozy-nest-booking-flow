import { Star, Users, Shield, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchBox from '@/components/SearchBox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useSettings } from '@/contexts/SettingsContext';
import heroImage from '@/assets/hero-hotel.jpg';
import hotel1 from '@/assets/hotel-1.jpg';
import hotel2 from '@/assets/hotel-2.jpg';
import hotel3 from '@/assets/hotel-3.jpg';

const Home = () => {
  const { settings } = useSettings();

  const iconMap = {
    Shield,
    Clock,
    Star,
    Users,
    MapPin,
  };

  const getIcon = (iconName: string) => iconMap[iconName as keyof typeof iconMap] || Star;

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
            {settings.content.heroTitle.split(' ').slice(0, -2).join(' ')}
            <span className="block text-secondary">{settings.content.heroTitle.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-up">
            {settings.content.heroSubtitle}
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
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">{settings.content.featuresTitle}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              {settings.content.featuresSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {settings.content.features.map((feature, index) => {
              const IconComponent = getIcon(feature.icon);
              return (
                <Card key={feature.id} className="hotel-card hover-lift text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <IconComponent className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Nearby Places */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Nearby Places</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Explore popular attractions and landmarks near our hotels
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {settings.content.nearbyPlaces.map((place, index) => (
              <Card key={place.id} className="hotel-card hover-lift overflow-hidden animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative">
                  <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
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
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">{settings.content.hotelsTitle}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              {settings.content.hotelsSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {settings.content.featuredHotels.map((hotel, index) => (
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