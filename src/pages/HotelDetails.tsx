import { useState, useEffect } from 'react';
import { Star, MapPin, Wifi, Car, Utensils, Waves, Dumbbell, Coffee, ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllHotelsbyid, searchRooms } from '@/api/Services/api';
import hotel1 from '@/assets/hotel-1.jpg';
import roomDeluxe from '@/assets/room-deluxe.jpg';

const HotelDetails = () => {
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hotel, setHotel] = useState<any>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchData, setSearchData] = useState({
    checkIn: '',
    checkOut: ''
  });

  useEffect(() => {
    const fetchHotelDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await getAllHotelsbyid(id, {});
        if (response?.data) {
          setHotel(response.data);
        }
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHotelDetails();
  }, [id]);

  const handleCheckAvailability = async () => {
    if (!id || !searchData.checkIn || !searchData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    try {
      const response = await searchRooms(id, searchData.checkIn, searchData.checkOut);
      if (response?.data) {
        setRooms(response.data);
      }
    } catch (error) {
      console.error('Error searching rooms:', error);
    }
  };

  const amenityIcons = [
    { icon: Wifi, name: 'Free WiFi' },
    { icon: Car, name: 'Parking' },
    { icon: Utensils, name: 'Restaurant' },
    { icon: Waves, name: 'Pool' },
    { icon: Dumbbell, name: 'Fitness Center' },
    { icon: Coffee, name: '24/7 Room Service' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading hotel details...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Hotel not found</div>
        </div>
        <Footer />
      </div>
    );
  }

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
              src={hotel.images?.[selectedImageIndex] || hotel1} 
              alt={hotel.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-2">
            {(hotel.images || [hotel1, hotel1, hotel1]).slice(1, 4).map((image, index) => (
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
                  <span>{hotel.city}, {hotel.state}</span>
                </div>
              </div>
              <p className="text-lg leading-relaxed">{hotel.description || 'Experience luxury and comfort at this beautiful hotel.'}</p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Amenities</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {(hotel.amenities || amenityIcons.map(a => a.name)).slice(0, 6).map((amenityName, index) => {
                  const amenityData = amenityIcons.find(a => a.name === amenityName) || amenityIcons[index % amenityIcons.length];
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <amenityData.icon className="w-5 h-5 text-primary" />
                      <span>{amenityName}</span>
                    </div>
                  );
                })}
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
                      <input 
                        type="date" 
                        className="w-full p-2 border rounded-lg"
                        value={searchData.checkIn}
                        onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Check-out</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border rounded-lg"
                        value={searchData.checkOut}
                        onChange={(e) => setSearchData({...searchData, checkOut: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleCheckAvailability}
                    className="w-full primary-gradient hover-lift"
                  >
                    Check Availability
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Available Rooms */}
        {rooms.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Available Rooms</h2>
            <div className="space-y-6">
              {rooms.map((room, index) => (
                <Card key={room._id} className="hotel-card hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <img 
                        src={room.images?.[0] || roomDeluxe} 
                        alt={room.name}
                        className="w-64 h-48 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                            <div className="flex space-x-4 text-muted-foreground mb-3">
                              <span>{room.size || '350 sq ft'}</span>
                              <span>{room.occupancy || '2 Adults'}</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {(room.amenities || ['AC', 'WiFi', 'TV']).slice(0, 4).map((feature: string) => (
                                <Badge key={feature} variant="secondary">{feature}</Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">
                              ${room.pricing?.basePrice || room.price || 199}
                            </div>
                            <div className="text-sm text-muted-foreground">per night</div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            {room.availability > 0 ? (
                              <span className="text-green-600 font-medium">
                                {room.availability} rooms available
                              </span>
                            ) : (
                              <span className="text-red-600 font-medium">Sold out</span>
                            )}
                          </div>
                          <Link 
                            to="/checkout" 
                            state={{ 
                              hotel, 
                              room, 
                              checkIn: searchData.checkIn, 
                              checkOut: searchData.checkOut 
                            }}
                          >
                            <Button 
                              className="primary-gradient hover-lift"
                              disabled={room.availability === 0}
                            >
                              {room.availability > 0 ? 'Book Now' : 'Sold Out'}
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
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetails;