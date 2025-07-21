import { useState } from 'react';
import { Calendar, MapPin, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const SearchBox = ({ onSearch }: { onSearch?: (searchData: any) => void }) => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
  });

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchData);
    }
  };

  return (
    <Card className="p-6 hotel-card animate-scale-in">
      <div className="grid md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter city or hotel"
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
              className="pl-10"
            />
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
            />
          </div>
        </div>

        {/* Guests & Search */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Guests</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                min="1"
                max="10"
                value={searchData.guests}
                onChange={(e) => setSearchData({ ...searchData, guests: parseInt(e.target.value) || 1 })}
                className="pl-10"
              />
            </div>
          </div>
          <Button onClick={handleSearch} className="w-full primary-gradient hover-lift">
            <Search className="w-4 h-4 mr-2" />
            Search Hotels
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default SearchBox;