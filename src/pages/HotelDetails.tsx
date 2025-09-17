// Updated HotelDetails component with scroll to Available Rooms functionality

import { useState, useEffect, useRef } from 'react';
import { Star, MapPin, Wifi, Car, Utensils, Waves, Dumbbell, Coffee, ArrowLeft } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [hotel, setHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Ref for Available Rooms section
  const availableRoomsRef = useRef(null);
  
  // Get dates from URL query params or use empty strings
  const [searchData, setSearchData] = useState({
    checkIn: searchParams.get('checkIn') || '',
    checkOut: searchParams.get('checkOut') || ''
  });
  const [selectedRooms, setSelectedRooms] = useState<Record<string, number>>({});

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

  // Auto-search rooms if dates are provided in URL
  useEffect(() => {
    const autoSearchRooms = async () => {
      const checkIn = searchParams.get('checkIn');
      const checkOut = searchParams.get('checkOut');
      
      if (id && checkIn && checkOut && hotel) {
        try {
          const response = await searchRooms(id, checkIn, checkOut);
          if (response?.data) {
            setRooms(response.data);
            // Auto-scroll to available rooms if rooms are found
            setTimeout(() => {
              scrollToAvailableRooms();
            }, 500);
          }
        } catch (error) {
          console.error('Error auto-searching rooms:', error);
        }
      }
    };

    autoSearchRooms();
  }, [id, searchParams, hotel]);

  // Function to scroll to Available Rooms section
  const scrollToAvailableRooms = () => {
    if (availableRoomsRef.current) {
      availableRoomsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  const handleCheckAvailability = async () => {
    if (!id || !searchData.checkIn || !searchData.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    try {
      const response = await searchRooms(id, searchData.checkIn, searchData.checkOut);
      if (response?.data) {
        setRooms(response.data);
        // Scroll to available rooms after successful search
        setTimeout(() => {
          scrollToAvailableRooms();
        }, 300);
      }
    } catch (error) {
      console.error('Error searching rooms:', error);
    }
  };

  // Helper function to format date for input[type="date"]
  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Helper function to get minimum date (today)
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Helper function to get minimum checkout date (day after checkin)
  const getMinCheckoutDate = () => {
    if (!searchData.checkIn) return getMinDate();
    const checkInDate = new Date(searchData.checkIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    return checkInDate.toISOString().split('T')[0];
  };
  
  const getHotelImages = () => {
    return hotel?.images?.hotel || [];
  };

  const getRoomImages = (room) => {
    // Check if room has its own images
    if (room.images && Array.isArray(room.images)) {
      return room.images;
    }
    // Check if hotel has room images for this room type
    if (hotel?.images?.rooms) {
      const roomTypeImages = hotel.images.rooms.filter(img => 
        img.roomType === room.type || img.roomType === room.name
      );
      return roomTypeImages;
    }
    return [];
  };

  const getFacilityIcon = (facilityName) => {
    const iconMap = {
      'Free WiFi': Wifi,
      'WiFi': Wifi,
      'Parking': Car,
      'Restaurant': Utensils,
      'Pool': Waves,
      'Gym': Dumbbell,
      'Fitness Center': Dumbbell,
      '24/7 Room Service': Coffee
    };
    return iconMap[facilityName] || Wifi;
  };

  // Room selection functions
  const updateRoomQuantity = (roomId: string, quantity: number) => {
    setSelectedRooms(prev => {
      if (quantity === 0) {
        const { [roomId]: removed, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [roomId]: quantity
      };
    });
  };

  const getTotalSelectedRooms = () => {
    return Object.values(selectedRooms).reduce((sum, qty) => sum + (qty as number), 0);
  };

  const getTotalPrice = () => {
    return rooms.reduce((total, room) => {
      const quantity = (selectedRooms[room._id] as number) || 0;
      return total + (room.price * quantity);
    }, 0);
  };

  const getSelectedRoomsData = () => {
    return rooms.filter(room => (selectedRooms[room._id] as number) > 0).map(room => ({
      ...room,
      quantity: selectedRooms[room._id] as number
    }));
  };

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

  const hotelImages = getHotelImages();
  const currentImage = hotelImages[selectedImageIndex];

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
              src={currentImage?.url || hotel1} 
              alt={currentImage?.caption || hotel.hotelName}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          {hotelImages.length > 1 && (
            <div className="space-y-2">
              {hotelImages.slice(1, 4).map((image, index) => (
                <img
                  key={image._id}
                  src={image.url}
                  alt={image.caption || `${hotel.hotelName} ${index + 1}`}
                  className="w-full h-[120px] object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedImageIndex(index + 1)}
                />
              ))}
              {hotelImages.length > 4 && (
                <div className="w-full h-[120px] bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                  <span className="text-gray-600 font-medium">
                    +{hotelImages.length - 4} more
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hotel Basic Info */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{hotel.hotelName}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="font-semibold">{hotel.starRating}</span>
              <span className="text-muted-foreground">({hotel.propertyType})</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{hotel.city}, {hotel.state}</span>
            </div>
          </div>
          <p className="text-lg leading-relaxed">{hotel.description}</p>
        </div>

        {/* Quick Booking Card - Mobile Only */}
        <div className="block lg:hidden mb-8">
          <Card className="hotel-card">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Booking</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">Check-in</label>
                    <input 
                      type="date" 
                      className="w-full p-2 border rounded-lg"
                      value={formatDateForInput(searchData.checkIn)}
                      min={getMinDate()}
                      onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Check-out</label>
                    <input 
                      type="date" 
                      className="w-full p-2 border rounded-lg"
                      value={formatDateForInput(searchData.checkOut)}
                      min={getMinCheckoutDate()}
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
                
                {/* Selected Rooms Summary */}
                  {getTotalSelectedRooms() > 0 && (
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-3">Selected Rooms</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {getSelectedRoomsData().map(room => (
                        <div key={room._id} className="flex justify-between items-center text-sm">
                          <span>{room.roomType} × {room.quantity}</span>
                          <span className="font-medium">₹{room.price * room.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 mt-2 border-t flex justify-between items-center font-semibold">
                      <span>Total ({getTotalSelectedRooms()} rooms)</span>
                      <span className="text-primary">₹{getTotalPrice()}</span>
                    </div>
                    <Link 
                      to="/checkout" 
                      state={{ 
                        hotel, 
                        selectedRooms: getSelectedRoomsData(), 
                        checkIn: searchData.checkIn, 
                        checkOut: searchData.checkOut,
                        totalPrice: getTotalPrice()
                      }}
                    >
                      <Button className="w-full mt-3 primary-gradient hover-lift">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                )}
                
                {/* Payment Methods */}
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">Accepted Payment Methods</h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.acceptedPaymentMethods?.map((method, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {method}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Hotel Info Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">

            {/* Available Rooms - Moved above Facilities */}
            {rooms.length > 0 && (
              <div ref={availableRoomsRef}>
                <h2 className="text-3xl font-bold mb-6">Available Rooms</h2>
                <div className="space-y-6">
                  {rooms.map((room, index) => {
                    const roomImages = getRoomImages(room);
                    const roomImageUrl = roomImages.length > 0 
                      ? roomImages[0].url || roomImages[0]
                      : (hotel.images?.rooms?.[0]?.url || roomDeluxe);

                    const isAvailable = room.availableUnits > 0;
                    const availabilityText = isAvailable 
                      ? `${room.availableUnits} rooms available` 
                      : 'Sold out';
                    const availabilityColor = isAvailable ? 'text-green-600' : 'text-red-600';

                    return (
                      <Card key={room._id} className="hotel-card hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <CardContent className="p-4 sm:p-6">
                          {/* Mobile Layout */}
                          <div className="block md:hidden space-y-4">
                            <img 
                              src={roomImageUrl} 
                              alt={room.roomType}
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <h3 className="text-lg font-semibold">{room.roomType}</h3>
                                <div className="text-right">
                                  <div className="text-xl font-bold text-primary">₹{room.price}</div>
                                  <div className="text-xs text-muted-foreground">per night</div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                                <span>Capacity: {room.maxcapacity || 'N/A'}</span>
                                <span>Total: {room.totalAvailable}</span>
                                <span>Booked: {room.currentlyBooked}</span>
                              </div>
                              
                              <div className="flex flex-wrap gap-1">
                                {room.amenities?.slice(0, 3).map((feature) => (
                                  <Badge key={feature} variant="secondary" className="text-xs">{feature}</Badge>
                                ))}
                                {room.amenities?.length > 3 && (
                                  <Badge variant="outline" className="text-xs">+{room.amenities.length - 3} more</Badge>
                                )}
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="text-xs">
                                  
                                  {/* <span className={`font-medium ${availabilityColor}`}>
                                    {availabilityText}
                                  </span>
                                  {isAvailable && room.availableUnits <= 3 && (
                                    <div className="text-orange-600 text-xs mt-1">
                                      Only {room.availableUnits} left!
                                    </div>
                                  )} */}
                                </div>
                                <div className="flex items-center space-x-2">
                                  {isAvailable && (
                                    <div className="flex items-center space-x-1">
                                      <button 
                                        onClick={() => updateRoomQuantity(room._id, Math.max(0, (selectedRooms[room._id] || 0) - 1))}
                                        className="w-7 h-7 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-sm"
                                        disabled={!selectedRooms[room._id] || selectedRooms[room._id] === 0}
                                      >
                                        −
                                      </button>
                                      <span className="w-6 text-center text-sm font-medium">
                                        {selectedRooms[room._id] || 0}
                                      </span>
                                      <button 
                                        onClick={() => updateRoomQuantity(room._id, Math.min(room.availableUnits, (selectedRooms[room._id] || 0) + 1))}
                                        className="w-7 h-7 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center text-sm"
                                        disabled={selectedRooms[room._id] >= room.availableUnits}
                                      >
                                        +
                                      </button>
                                    </div>
                                  )}
                                  <Button 
                                    size="sm"
                                    className="primary-gradient hover-lift text-xs px-3 py-1"
                                    disabled={!isAvailable}
                                    onClick={() => updateRoomQuantity(room._id, selectedRooms[room._id] > 0 ? 0 : 1)}
                                  >
                                    {selectedRooms[room._id] > 0 ? 'Remove' : (isAvailable ? 'Select' : 'Sold Out')}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Desktop Layout */}
                          <div className="hidden md:flex gap-6">
                            <img 
                              src={roomImageUrl} 
                              alt={room.roomType}
                              className="w-64 h-48 object-cover rounded-lg flex-shrink-0"
                            />
                            <div className="flex-1 space-y-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-xl font-semibold mb-2">{room.roomType}</h3>
                                  <div className="flex space-x-4 text-muted-foreground mb-3">
                                    <span>Max Capacity: {room.maxcapacity || 'N/A'}</span>
                                    <span>Total: {room.totalAvailable}</span>
                                    <span>Booked: {room.currentlyBooked}</span>
                                  </div>
                                  <div className="flex flex-wrap gap-2">
                                    {room.amenities?.slice(0, 4).map((feature) => (
                                      <Badge key={feature} variant="secondary">{feature}</Badge>
                                    ))}
                                    {room.amenities?.length > 4 && (
                                      <Badge variant="outline">+{room.amenities.length - 4} more</Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-primary">
                                    ₹{room.price}
                                  </div>
                                  <div className="text-sm text-muted-foreground">per night</div>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                {/* <div className="text-sm">
                                  <span className={`font-medium ${availabilityColor}`}>
                                    {availabilityText}
                                  </span>
                                  {isAvailable && room.availableUnits <= 3 && (
                                    <div className="text-orange-600 text-xs mt-1">
                                      Only {room.availableUnits} left!
                                    </div>
                                  )}
                                </div> */}
                                <div className="flex items-center space-x-3">
                                  {isAvailable && (
                                    <div className="flex items-center space-x-2">
                                      <button 
                                        onClick={() => updateRoomQuantity(room._id, Math.max(0, (selectedRooms[room._id] || 0) - 1))}
                                        className="w-8 h-8 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                                        disabled={!selectedRooms[room._id] || selectedRooms[room._id] === 0}
                                      >
                                        −
                                      </button>
                                      <span className="w-8 text-center font-medium">
                                        {selectedRooms[room._id] || 0}
                                      </span>
                                      <button 
                                        onClick={() => updateRoomQuantity(room._id, Math.min(room.availableUnits, (selectedRooms[room._id] || 0) + 1))}
                                        className="w-8 h-8 rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors flex items-center justify-center"
                                        disabled={selectedRooms[room._id] >= room.availableUnits}
                                      >
                                        +
                                      </button>
                                    </div>
                                  )}
                                  <Button 
                                    className="primary-gradient hover-lift"
                                    disabled={!isAvailable}
                                    onClick={() => updateRoomQuantity(room._id, selectedRooms[room._id] > 0 ? 0 : 1)}
                                  >
                                    {selectedRooms[room._id] > 0 ? 'Remove' : (isAvailable ? 'Select' : 'Sold Out')}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Facilities */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Facilities</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {hotel.facilities?.map((facility, index) => {
                  const IconComponent = getFacilityIcon(facility);
                  return (
                    <div key={index} className="flex items-center space-x-3">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <span>{facility}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Hotel Policies</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Check-in:</span>
                  <span>{hotel.policies?.checkIn}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Check-out:</span>
                  <span>{hotel.policies?.checkOut}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Smoking Policy:</span>
                  <span>{hotel.policies?.smokingPolicy}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Pet Policy:</span>
                  <span>{hotel.policies?.petPolicy === 'no' ? 'Pets not allowed' : 'Pets allowed'}</span>
                </div>
              </div>
            </div>

            {/* Facility Images */}
            {hotel.images?.facilities && hotel.images.facilities.length > 0 && (
              <div>
                <h3 className="text-2xl font-semibold mb-4">Facility Gallery</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hotel.images.facilities.map((facility) => (
                    <div key={facility._id} className="relative">
                      <img 
                        src={facility.url} 
                        alt={facility.caption}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                        {facility.caption}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-2">
                <p><span className="font-medium">Contact Person:</span> {hotel.contactName}</p>
                <p><span className="font-medium">Email:</span> {hotel.email}</p>
                <p><span className="font-medium">Phone:</span> {hotel.phone}</p>
                <p><span className="font-medium">Website:</span> {hotel.website}</p>
                <p><span className="font-medium">Address:</span> {hotel.address}, {hotel.city}, {hotel.state} - {hotel.postalCode}</p>
              </div>
            </div>
          </div>

          {/* Quick Booking Card - Desktop Only */}
          <div className="lg:col-span-1 hidden lg:block">
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
                        value={formatDateForInput(searchData.checkIn)}
                        min={getMinDate()}
                        onChange={(e) => setSearchData({...searchData, checkIn: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Check-out</label>
                      <input 
                        type="date" 
                        className="w-full p-2 border rounded-lg"
                        value={formatDateForInput(searchData.checkOut)}
                        min={getMinCheckoutDate()}
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
                  
                  {/* Selected Rooms Summary */}
                  {getTotalSelectedRooms() > 0 && (
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Selected Rooms</h4>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {getSelectedRoomsData().map(room => (
                          <div key={room._id} className="flex justify-between items-center text-sm">
                            <span>{room.roomType} × {room.quantity}</span>
                            <span className="font-medium">₹{room.price * room.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-2 mt-2 border-t flex justify-between items-center font-semibold">
                      <span>Total ({getTotalSelectedRooms()} rooms)</span>
                        <span className="text-primary">₹{getTotalPrice()}</span>
                      </div>
                      <Link 
                        to="/checkout" 
                        state={{ 
                          hotel, 
                          selectedRooms: getSelectedRoomsData(), 
                          checkIn: searchData.checkIn, 
                          checkOut: searchData.checkOut,
                          totalPrice: getTotalPrice()
                        }}
                      >
                        <Button className="w-full mt-3 primary-gradient hover-lift">
                          Proceed to Checkout
                        </Button>
                      </Link>
                    </div>
                  )}
                  
                  {/* Payment Methods */}
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Accepted Payment Methods</h4>
                    <div className="flex flex-wrap gap-2">
                      {hotel.acceptedPaymentMethods?.map((method, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HotelDetails;