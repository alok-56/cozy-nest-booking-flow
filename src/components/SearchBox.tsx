import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { getAllHotels } from '@/api/Services/api';

const SearchBox = ({ onSearch }: { onSearch?: (searchData: any) => void }) => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    hotelId: '',
  });
  const [hotels, setHotels] = useState<any[]>([]);
  const [showHotelDropdown, setShowHotelDropdown] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState<any[]>([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getAllHotels();
        if (response?.status) {
          setHotels(response.data);
          setFilteredHotels(response.data); // Show all hotels initially
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    if (searchData.location && hotels.length > 0) {
      const filtered = hotels.filter(hotel => 
        hotel.name?.toLowerCase().includes(searchData.location.toLowerCase()) ||
        hotel.location?.toLowerCase().includes(searchData.location.toLowerCase()) ||
        hotel.city?.toLowerCase().includes(searchData.location.toLowerCase()) ||
        hotel.address?.toLowerCase().includes(searchData.location.toLowerCase())
      );
      setFilteredHotels(filtered);
    } else {
      setFilteredHotels(hotels); // Show all hotels when no search
    }
  }, [searchData.location, hotels]);

  const handleSearch = () => {
    if (searchData.hotelId) {
      // Navigate to hotel details page with ID and search parameters
     navigate(`/hotel/${searchData.hotelId}?checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}`)
    } else if (onSearch) {
      onSearch(searchData);
    } else {
      // Navigate to hotels page with search parameters if no specific hotel selected
      navigate('/hotels', { state: searchData });
    }
    setShowHotelDropdown(false);
  };

  const selectHotel = (hotel: any) => {
    setSearchData({ 
      ...searchData, 
      location: `${hotel.hotelName}, ${hotel.city}`,
      hotelId: hotel._id 
    });
    setShowHotelDropdown(false);
  };

  const handleLocationFocus = () => {
    setShowHotelDropdown(true);
  };

  const handleLocationBlur = () => {
    // Delay hiding dropdown to allow for hotel selection
    setTimeout(() => setShowHotelDropdown(false), 200);
  };

  return (
    <Card className="p-6 hotel-card animate-scale-in">
      <div className="grid md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2 relative">
          <label className="text-sm font-medium text-foreground">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Select hotel or enter location"
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value, hotelId: '' })}
              onFocus={handleLocationFocus}
              onBlur={handleLocationBlur}
              className="pl-10 pr-10"
            />
            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
            
            {/* Hotel Dropdown */}
            {showHotelDropdown && filteredHotels.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                    onClick={() => selectHotel(hotel)}
                  >
                    <div className="font-medium text-sm">{hotel.hotelName}</div>
                    <div className="text-xs text-gray-500">
                      {hotel.address || `${hotel.city}, ${hotel.state}`}
                    </div>
                    {hotel.location && (
                      <div className="text-xs text-gray-400">{hotel.location}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Check-in */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={searchData.checkIn}
              onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
              className="pl-10"
              min={new Date().toISOString().split('T')[0]} // Prevent past dates
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={searchData.checkOut}
              onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
              className="pl-10"
              min={searchData.checkIn || new Date().toISOString().split('T')[0]} // Ensure checkout is after checkin
            />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button onClick={handleSearch} className="w-full primary-gradient hover-lift h-10">
            {searchData.hotelId ? 'View Hotel Details' : 'Search Hotels'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchBox;