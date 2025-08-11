import { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { Getmybooking } from '@/api/Services/api';

const MyBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const searchBookings = async () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number to search bookings",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await Getmybooking(phoneNumber);
      if (response.status) {
        setBookings(response.data || []);
        setHasSearched(true);
        if (response.data?.length === 0) {
          toast({
            title: "No Bookings Found",
            description: "No bookings found for this phone number",
          });
        }
      } else {
        throw new Error(response.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch bookings. Please try again.",
        variant: "destructive",
      });
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'pending': { variant: 'secondary' as const, label: 'Pending' },
      'booked': { variant: 'default' as const, label: 'Confirmed' },
      'checkin': { variant: 'default' as const, label: 'Checked In' },
      'checkout': { variant: 'outline' as const, label: 'Completed' },
      'cancelled': { variant: 'destructive' as const, label: 'Cancelled' },
      'failed': { variant: 'destructive' as const, label: 'Failed' }
    };
    
    const config = statusMap[status as keyof typeof statusMap] || { variant: 'secondary' as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const categorizeBookings = () => {
    const now = new Date();
    const upcoming = bookings.filter(booking => 
      ['booked', 'pending'].includes(booking.status) && 
      new Date(booking.checkInDate) > now
    );
    const past = bookings.filter(booking => 
      ['checkout'].includes(booking.status) || 
      (['booked', 'checkin'].includes(booking.status) && new Date(booking.checkOutDate) < now)
    );
    const cancelled = bookings.filter(booking => 
      ['cancelled', 'failed'].includes(booking.status)
    );

    return { upcoming, past, cancelled };
  };

  const { upcoming, past, cancelled } = categorizeBookings();

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card className="hotel-card hover-lift">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">{booking.hotelId?.hotelName || 'Hotel Name'}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{booking.hotelId?.city}, {booking.hotelId?.state}</span>
            </div>
          </div>
          {getStatusBadge(booking.status)}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Check-in</div>
              <div className="font-medium">{formatDate(booking.checkInDate)}</div>
            </div>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            <div>
              <div className="text-sm text-muted-foreground">Check-out</div>
              <div className="font-medium">{formatDate(booking.checkOutDate)}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm">
              {booking.guests?.adults || 1} Adult{(booking.guests?.adults || 1) > 1 ? 's' : ''}
              {booking.guests?.children > 0 && `, ${booking.guests.children} Child${booking.guests.children > 1 ? 'ren' : ''}`}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm">{booking.stayDuration || 1} Night{(booking.stayDuration || 1) > 1 ? 's' : ''}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-muted-foreground mb-1">Booking ID</div>
          <div className="font-mono text-sm">{booking.bookingId}</div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-muted-foreground mb-1">Room Types</div>
          <div className="text-sm">
            {booking.roomId?.map((room: any, index: number) => (
              <span key={room._id}>
                {room.roomType}
                {index < booking.roomId.length - 1 && ', '}
              </span>
            )) || 'Room details unavailable'}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <div className="text-sm text-muted-foreground">Total Amount</div>
            <div className="text-xl font-bold text-primary">₹{booking.totalAmount}</div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            My Bookings
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Manage and track all your hotel bookings in one place
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="hotel-card max-w-md mx-auto">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-center">Find Your Bookings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && searchBookings()}
                  />
                </div>
                <Button 
                  onClick={searchBookings}
                  className="w-full primary-gradient hover-lift"
                  disabled={loading}
                >
                  {loading ? 'Searching...' : 'Search Bookings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Bookings Results */}
      {hasSearched && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-muted rounded-lg p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold mb-2">No Bookings Found</h3>
                  <p className="text-muted-foreground mb-4">
                    We couldn't find any bookings for this phone number.
                  </p>
                  <Button onClick={() => window.location.href = '/hotels'}>
                    Browse Hotels
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Summary Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <Card className="hotel-card text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">{bookings.length}</div>
                      <div className="text-muted-foreground">Total Bookings</div>
                    </CardContent>
                  </Card>
                  <Card className="hotel-card text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">{upcoming.length}</div>
                      <div className="text-muted-foreground">Upcoming Trips</div>
                    </CardContent>
                  </Card>
                  <Card className="hotel-card text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">
                        ₹{bookings.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0).toLocaleString()}
                      </div>
                      <div className="text-muted-foreground">Total Spent</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bookings Tabs */}
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-8">
                    <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
                    <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming" className="space-y-6">
                    {upcoming.length === 0 ? (
                      <div className="text-center py-12">
                        <h3 className="text-xl font-semibold mb-2">No Upcoming Bookings</h3>
                        <p className="text-muted-foreground mb-4">Ready to plan your next trip?</p>
                        <Button onClick={() => window.location.href = '/hotels'}>
                          Book Your Next Stay
                        </Button>
                      </div>
                    ) : (
                      upcoming.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} />
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="past" className="space-y-6">
                    {past.length === 0 ? (
                      <div className="text-center py-12">
                        <h3 className="text-xl font-semibold mb-2">No Past Bookings</h3>
                        <p className="text-muted-foreground">Your completed trips will appear here.</p>
                      </div>
                    ) : (
                      past.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} />
                      ))
                    )}
                  </TabsContent>

                  <TabsContent value="cancelled" className="space-y-6">
                    {cancelled.length === 0 ? (
                      <div className="text-center py-12">
                        <h3 className="text-xl font-semibold mb-2">No Cancelled Bookings</h3>
                        <p className="text-muted-foreground">Your cancelled bookings will appear here.</p>
                      </div>
                    ) : (
                      cancelled.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} />
                      ))
                    )}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default MyBookings;