import { useState } from 'react';
import { Star, MapPin, Wifi, Car, Utensils, Waves, Dumbbell, Coffee, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import hotel1 from '@/assets/hotel-1.jpg';
import roomDeluxe from '@/assets/room-deluxe.jpg';

const HotelDetails = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const hotel = {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'Downtown Manhattan, New York',
    rating: 4.8,
    reviews: 1250,
    images: [hotel1, roomDeluxe, hotel1, roomDeluxe],
    description: 'Experience luxury and elegance at Grand Plaza Hotel, located in the heart of Manhattan. Our hotel offers world-class amenities, stunning city views, and exceptional service that will make your stay unforgettable.',
    amenities: [
      { icon: Wifi, name: 'Free WiFi' },
      { icon: Car, name: 'Parking' },
      { icon: Utensils, name: 'Restaurant' },
      { icon: Waves, name: 'Pool' },
      { icon: Dumbbell, name: 'Fitness Center' },
      { icon: Coffee, name: '24/7 Room Service' },
    ],
  };

  const rooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      price: 199,
      originalPrice: 249,
      image: roomDeluxe,
      size: '350 sq ft',
      occupancy: '2 Adults',
      features: ['King Size Bed', 'City View', 'Free WiFi', 'Mini Bar'],
      available: 5,
    },
    {
      id: 2,
      name: 'Executive Suite',
      price: 299,
      originalPrice: 349,
      image: roomDeluxe,
      size: '500 sq ft',
      occupancy: '2 Adults + 1 Child',
      features: ['King Size Bed', 'Separate Living Area', 'Ocean View', 'Balcony'],
      available: 3,
    },
    {
      id: 3,
      name: 'Presidential Suite',
      price: 499,
      originalPrice: 599,
      image: roomDeluxe,
      size: '800 sq ft',
      occupancy: '4 Adults',
      features: ['2 Bedrooms', 'Living Room', 'Kitchen', 'Premium View'],
      available: 1,
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/hotels">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hotels
          </Button>
        </Link>

        {/* Hotel Images */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2">
            <img 
              src={hotel.images[selectedImageIndex]} 
              alt={hotel.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-2">
            {hotel.images.slice(1, 4).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${hotel.name} ${index + 1}`}
                className="w-full h-[120px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedImageIndex(index + 1)}
              />
            ))}
          </div>
        </div>

        {/* Hotel Info */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{hotel.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{hotel.rating}</span>
                  <span className="text-muted-foreground">({hotel.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{hotel.location}</span>
                </div>
              </div>
              <p className="text-lg leading-relaxed">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <amenity.icon className="w-5 h-5 text-primary" />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Booking Card */}
          <div className="lg:col-span-1">
            <Card className="hotel-card sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Quick Booking</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium">Check-in</label>
                      <input type="date" className="w-full p-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Check-out</label>
                      <input type="date" className="w-full p-2 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Guests</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>2 Adults</option>
                      <option>2 Adults, 1 Child</option>
                      <option>4 Adults</option>
                    </select>
                  </div>
                  <Button className="w-full primary-gradient hover-lift">
                    Check Availability
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Rooms */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Available Rooms</h2>
          <div className="space-y-6">
            {rooms.map((room, index) => (
              <Card key={room.id} className="hotel-card hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img 
                      src={room.image} 
                      alt={room.name}
                      className="w-64 h-48 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                          <div className="flex space-x-4 text-muted-foreground mb-3">
                            <span>{room.size}</span>
                            <span>{room.occupancy}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {room.features.map((feature) => (
                              <Badge key={feature} variant="secondary">{feature}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground line-through">
                            ${room.originalPrice}
                          </div>
                          <div className="text-2xl font-bold text-primary">
                            ${room.price}
                          </div>
                          <div className="text-sm text-muted-foreground">per night</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          {room.available > 0 ? (
                            <span className="text-green-600 font-medium">
                              Only {room.available} rooms left
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">Sold out</span>
                          )}
                        </div>
                        <Link to="/rooms">
                          <Button 
                            className="primary-gradient hover-lift"
                            disabled={room.available === 0}
                          >
                            {room.available > 0 ? 'Select Room' : 'Sold Out'}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetails;