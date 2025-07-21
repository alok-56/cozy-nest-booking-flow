import { useState } from 'react';
import { Star, Users, Maximize, ArrowLeft, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import roomDeluxe from '@/assets/room-deluxe.jpg';

const Rooms = () => {
  const { toast } = useToast();
  const [selectedRooms, setSelectedRooms] = useState<{[key: number]: number}>({});
  
  const rooms = [
    {
      id: 1,
      name: 'Deluxe Room',
      price: 199,
      originalPrice: 249,
      image: roomDeluxe,
      size: '350 sq ft',
      occupancy: '2 Adults',
      bedType: 'King Size Bed',
      view: 'City View',
      features: ['Free WiFi', 'Mini Bar', 'Air Conditioning', 'Room Service'],
      amenities: ['Flat Screen TV', 'Safe', 'Coffee Machine', 'Bathrobes'],
      available: 5,
      description: 'Elegant and comfortable room with modern amenities and stunning city views.',
    },
    {
      id: 2,
      name: 'Executive Suite',
      price: 299,
      originalPrice: 349,
      image: roomDeluxe,
      size: '500 sq ft',
      occupancy: '2 Adults + 1 Child',
      bedType: 'King Size Bed',
      view: 'Ocean View',
      features: ['Separate Living Area', 'Balcony', 'Free WiFi', 'Mini Bar'],
      amenities: ['Premium TV', 'Safe', 'Espresso Machine', 'Premium Toiletries'],
      available: 3,
      description: 'Spacious suite with separate living area and breathtaking ocean views.',
    },
    {
      id: 3,
      name: 'Presidential Suite',
      price: 499,
      originalPrice: 599,
      image: roomDeluxe,
      size: '800 sq ft',
      occupancy: '4 Adults',
      bedType: '2 King Size Beds',
      view: 'Premium View',
      features: ['2 Bedrooms', 'Living Room', 'Kitchen', 'Butler Service'],
      amenities: ['Smart TV', 'Premium Safe', 'Full Kitchen', 'Premium Bath'],
      available: 1,
      description: 'Luxurious suite with multiple rooms and premium amenities for the ultimate stay.',
    },
  ];

  const updateRoomQuantity = (roomId: number, change: number) => {
    const currentQty = selectedRooms[roomId] || 0;
    const room = rooms.find(r => r.id === roomId);
    const maxQty = room?.available || 0;
    
    const newQty = Math.max(0, Math.min(maxQty, currentQty + change));
    
    if (newQty === 0) {
      const { [roomId]: removed, ...rest } = selectedRooms;
      setSelectedRooms(rest);
    } else {
      setSelectedRooms({ ...selectedRooms, [roomId]: newQty });
    }
  };

  const addToCart = (roomId: number) => {
    const quantity = selectedRooms[roomId] || 1;
    const room = rooms.find(r => r.id === roomId);
    
    toast({
      title: "Added to Cart!",
      description: `${quantity} × ${room?.name} added to your cart.`,
    });
    
    // Here you would typically update a global cart state
  };

  const getTotalPrice = () => {
    return Object.entries(selectedRooms).reduce((total, [roomId, quantity]) => {
      const room = rooms.find(r => r.id === parseInt(roomId));
      return total + (room?.price || 0) * quantity;
    }, 0);
  };

  const getTotalRooms = () => {
    return Object.values(selectedRooms).reduce((total, qty) => total + qty, 0);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/hotel/1">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hotel Details
          </Button>
        </Link>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Rooms List */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Select Your Room</h1>
              <p className="text-muted-foreground">Grand Plaza Hotel - Choose from our available rooms</p>
            </div>

            {rooms.map((room, index) => (
              <Card key={room.id} className="hotel-card hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Room Image */}
                    <div className="md:col-span-1">
                      <img 
                        src={room.image} 
                        alt={room.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>

                    {/* Room Details */}
                    <div className="md:col-span-1 space-y-3">
                      <h3 className="text-xl font-semibold">{room.name}</h3>
                      <p className="text-muted-foreground text-sm">{room.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Maximize className="w-4 h-4 text-primary" />
                          <span>{room.size}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{room.occupancy}</span>
                        </div>
                        <div>
                          <span className="font-medium">Bed: </span>
                          <span>{room.bedType}</span>
                        </div>
                        <div>
                          <span className="font-medium">View: </span>
                          <span>{room.view}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Room Features</h4>
                        <div className="flex flex-wrap gap-1">
                          {room.features.map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium">Amenities</h4>
                        <div className="flex flex-wrap gap-1">
                          {room.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary" className="text-xs">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Booking Section */}
                    <div className="md:col-span-1 flex flex-col justify-between">
                      <div className="text-right">
                        {room.originalPrice > room.price && (
                          <div className="text-sm text-muted-foreground line-through">
                            ${room.originalPrice}
                          </div>
                        )}
                        <div className="text-2xl font-bold text-primary">
                          ${room.price}
                        </div>
                        <div className="text-sm text-muted-foreground">per night</div>
                        
                        <div className="mt-2 text-sm">
                          {room.available > 0 ? (
                            <span className="text-green-600 font-medium">
                              {room.available} rooms available
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">Sold out</span>
                          )}
                        </div>
                      </div>

                      {room.available > 0 && (
                        <div className="space-y-3 mt-4">
                          {/* Quantity Selector */}
                          <div className="flex items-center justify-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateRoomQuantity(room.id, -1)}
                              disabled={!selectedRooms[room.id]}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {selectedRooms[room.id] || 0}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateRoomQuantity(room.id, 1)}
                              disabled={(selectedRooms[room.id] || 0) >= room.available}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <Button
                            onClick={() => addToCart(room.id)}
                            className="w-full primary-gradient hover-lift"
                            disabled={!selectedRooms[room.id]}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="hotel-card sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Booking Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <label className="font-medium">Check-in</label>
                      <input type="date" className="w-full p-2 border rounded text-xs" />
                    </div>
                    <div>
                      <label className="font-medium">Check-out</label>
                      <input type="date" className="w-full p-2 border rounded text-xs" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="font-medium text-sm">Guests</label>
                    <select className="w-full p-2 border rounded text-sm">
                      <option>2 Adults</option>
                      <option>2 Adults, 1 Child</option>
                      <option>4 Adults</option>
                    </select>
                  </div>
                </div>

                {getTotalRooms() > 0 && (
                  <div className="space-y-3 mb-6">
                    <h4 className="font-medium">Selected Rooms</h4>
                    {Object.entries(selectedRooms).map(([roomId, quantity]) => {
                      const room = rooms.find(r => r.id === parseInt(roomId));
                      return (
                        <div key={roomId} className="flex justify-between text-sm">
                          <span>{quantity}× {room?.name}</span>
                          <span>${room ? room.price * quantity : 0}</span>
                        </div>
                      );
                    })}
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                  </div>
                )}

                <Link to="/cart">
                  <Button 
                    className="w-full primary-gradient hover-lift"
                    disabled={getTotalRooms() === 0}
                  >
                    Go to Cart ({getTotalRooms()})
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Rooms;