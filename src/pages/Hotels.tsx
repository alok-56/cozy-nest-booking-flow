import { useState } from 'react';
import { Star, MapPin, Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchBox from '@/components/SearchBox';
import hotel1 from '@/assets/hotel-1.jpg';
import hotel2 from '@/assets/hotel-2.jpg';
import hotel3 from '@/assets/hotel-3.jpg';

const Hotels = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const hotels = [
    {
      id: 1,
      name: 'Grand Plaza Hotel',
      location: 'Downtown Manhattan, New York',
      price: 299,
      rating: 4.8,
      reviews: 1250,
      image: hotel1,
      amenities: ['WiFi', 'Pool', 'Gym', 'Restaurant', 'Parking'],
      description: 'Luxury hotel in the heart of Manhattan with stunning city views and world-class amenities.',
    },
    {
      id: 2,
      name: 'Ocean View Resort',
      location: 'South Beach, Miami',
      price: 199,
      rating: 4.6,
      reviews: 890,
      image: hotel2,
      amenities: ['Beach Access', 'Pool', 'Spa', 'Restaurant', 'Bar'],
      description: 'Beachfront resort with panoramic ocean views and tropical paradise atmosphere.',
    },
    {
      id: 3,
      name: 'Urban Loft Hotel',
      location: 'River North, Chicago',
      price: 149,
      rating: 4.5,
      reviews: 567,
      image: hotel3,
      amenities: ['WiFi', 'Gym', 'Restaurant', 'Business Center'],
      description: 'Modern boutique hotel in Chicago\'s vibrant River North district.',
    },
    // Add more hotels for demonstration
    ...Array.from({ length: 6 }, (_, i) => ({
      id: i + 4,
      name: `Hotel ${i + 4}`,
      location: `Location ${i + 4}`,
      price: 100 + (i * 50),
      rating: 4.0 + (Math.random() * 0.8),
      reviews: Math.floor(Math.random() * 1000) + 100,
      image: [hotel1, hotel2, hotel3][i % 3],
      amenities: ['WiFi', 'Pool', 'Gym'].slice(0, Math.floor(Math.random() * 3) + 1),
      description: `Beautiful hotel offering comfort and convenience in the heart of the city.`,
    })),
  ];

  const HotelCard = ({ hotel, isListView = false }: { hotel: any; isListView?: boolean }) => (
    <Card className={`hotel-card hover-lift overflow-hidden animate-scale-in ${isListView ? 'flex-row flex' : ''}`}>
      <div className={`relative ${isListView ? 'w-80 flex-shrink-0' : ''}`}>
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className={`object-cover ${isListView ? 'w-full h-full' : 'w-full h-64'}`} 
        />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold">{hotel.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <CardContent className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{hotel.location}</span>
        </div>
        <p className="text-muted-foreground mb-4 line-clamp-2">{hotel.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity: string) => (
            <span key={amenity} className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              {amenity}
            </span>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="text-muted-foreground text-xs px-2 py-1">
              +{hotel.amenities.length - 4} more
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">${hotel.price}</span>
            <span className="text-muted-foreground">/night</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">{hotel.reviews} reviews</div>
            <Button className="mt-2 primary-gradient hover-lift">
              View Rooms
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Search Section */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <SearchBox />
        </div>
      </section>

      {/* Hotels Listing */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Available Hotels</h1>
              <p className="text-muted-foreground">{hotels.length} hotels found</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select defaultValue="recommended">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              
              <div className="flex border rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-80 space-y-6 animate-slide-up">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <Input placeholder="Min price" />
                      <Input placeholder="Max price" />
                    </div>
                    <Button variant="outline" className="w-full">Apply</Button>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Amenities</h3>
                  <div className="space-y-2">
                    {['WiFi', 'Pool', 'Gym', 'Restaurant', 'Parking', 'Spa'].map((amenity) => (
                      <label key={amenity} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>{amenity}</span>
                      </label>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* Hotels Grid/List */}
            <div className="flex-1">
              <div className={
                viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-6'
              }>
                {hotels.map((hotel, index) => (
                  <div key={hotel.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <HotelCard hotel={hotel} isListView={viewMode === 'list'} />
                  </div>
                ))}
              </div>
              
              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" className="hover-lift">
                  Load More Hotels
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hotels;