import { useState } from 'react';
import { Calendar, MapPin, Users, Download, Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import hotel1 from '@/assets/hotel-1.jpg';
import hotel2 from '@/assets/hotel-2.jpg';

const MyBookings = () => {
  const { toast } = useToast();
  
  const bookings = {
    upcoming: [
      {
        id: 'HB001',
        hotel: 'Grand Plaza Hotel',
        location: 'New York, NY',
        room: 'Deluxe Room',
        checkIn: '2024-03-15',
        checkOut: '2024-03-18',
        guests: 2,
        nights: 3,
        total: 597,
        status: 'confirmed',
        image: hotel1,
        bookingDate: '2024-02-15',
      },
      {
        id: 'HB002',
        hotel: 'Ocean View Resort',
        location: 'Miami, FL',
        room: 'Executive Suite',
        checkIn: '2024-04-10',
        checkOut: '2024-04-14',
        guests: 3,
        nights: 4,
        total: 1196,
        status: 'confirmed',
        image: hotel2,
        bookingDate: '2024-02-20',
      },
    ],
    past: [
      {
        id: 'HB003',
        hotel: 'Urban Loft Hotel',
        location: 'Chicago, IL',
        room: 'Standard Room',
        checkIn: '2024-01-05',
        checkOut: '2024-01-08',
        guests: 2,
        nights: 3,
        total: 447,
        status: 'completed',
        image: hotel1,
        bookingDate: '2023-12-20',
        rating: 5,
      },
    ],
    cancelled: [
      {
        id: 'HB004',
        hotel: 'Mountain Resort',
        location: 'Denver, CO',
        room: 'Mountain View Suite',
        checkIn: '2024-02-01',
        checkOut: '2024-02-05',
        guests: 4,
        nights: 4,
        total: 800,
        status: 'cancelled',
        image: hotel2,
        bookingDate: '2024-01-10',
        cancelledDate: '2024-01-25',
      },
    ],
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { label: 'Confirmed', variant: 'default' as const },
      completed: { label: 'Completed', variant: 'secondary' as const },
      cancelled: { label: 'Cancelled', variant: 'destructive' as const },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const downloadInvoice = (bookingId: string) => {
    toast({
      title: "Downloading Invoice",
      description: `Invoice for booking ${bookingId} will be downloaded shortly.`,
    });
  };

  const BookingCard = ({ booking, showActions = true }: { booking: any; showActions?: boolean }) => (
    <Card className="hotel-card hover-lift">
      <CardContent className="p-6">
        <div className="flex gap-6">
          <img 
            src={booking.image} 
            alt={booking.hotel}
            className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
          />
          
          <div className="flex-1 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{booking.hotel}</h3>
                <div className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{booking.location}</span>
                </div>
              </div>
              {getStatusBadge(booking.status)}
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Room: </span>
                <span>{booking.room}</span>
              </div>
              <div>
                <span className="font-medium">Booking ID: </span>
                <span className="font-mono">{booking.id}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>{booking.checkIn} to {booking.checkOut}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{booking.guests} guests, {booking.nights} nights</span>
              </div>
            </div>
            
            {booking.rating && (
              <div className="flex items-center">
                <span className="text-sm font-medium mr-2">Your Rating:</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < booking.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center pt-2 border-t">
              <div>
                <span className="text-2xl font-bold text-primary">${booking.total}</span>
                <span className="text-muted-foreground text-sm ml-1">total</span>
              </div>
              
              {showActions && (
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadInvoice(booking.id)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Invoice
                  </Button>
                  
                  {booking.status === 'confirmed' && (
                    <Button size="sm" className="primary-gradient">
                      Modify
                    </Button>
                  )}
                  
                  {booking.status === 'completed' && !booking.rating && (
                    <Button size="sm" variant="outline">
                      <Star className="w-4 h-4 mr-1" />
                      Rate Stay
                    </Button>
                  )}
                  
                  <Button size="sm" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Support
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const totalBookings = bookings.upcoming.length + bookings.past.length + bookings.cancelled.length;
  const totalSpent = [...bookings.upcoming, ...bookings.past].reduce((sum, booking) => sum + booking.total, 0);

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Stats */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="hotel-card">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-primary">{totalBookings}</h3>
                <p className="text-muted-foreground">Total Bookings</p>
              </CardContent>
            </Card>
            
            <Card className="hotel-card">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-primary">{bookings.upcoming.length}</h3>
                <p className="text-muted-foreground">Upcoming Trips</p>
              </CardContent>
            </Card>
            
            <Card className="hotel-card">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold text-primary">${totalSpent.toLocaleString()}</h3>
                <p className="text-muted-foreground">Total Spent</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bookings Tabs */}
        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="upcoming">
              Upcoming ({bookings.upcoming.length})
            </TabsTrigger>
            <TabsTrigger value="past">
              Past ({bookings.past.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled">
              Cancelled ({bookings.cancelled.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {bookings.upcoming.length > 0 ? (
              bookings.upcoming.map((booking, index) => (
                <div key={booking.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BookingCard booking={booking} />
                </div>
              ))
            ) : (
              <Card className="hotel-card">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No Upcoming Bookings</h3>
                  <p className="text-muted-foreground mb-4">Ready to plan your next adventure?</p>
                  <Button className="primary-gradient">
                    Browse Hotels
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {bookings.past.length > 0 ? (
              bookings.past.map((booking, index) => (
                <div key={booking.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BookingCard booking={booking} />
                </div>
              ))
            ) : (
              <Card className="hotel-card">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No Past Bookings</h3>
                  <p className="text-muted-foreground">Your travel history will appear here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-4">
            {bookings.cancelled.length > 0 ? (
              bookings.cancelled.map((booking, index) => (
                <div key={booking.id} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <BookingCard booking={booking} showActions={false} />
                </div>
              ))
            ) : (
              <Card className="hotel-card">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No Cancelled Bookings</h3>
                  <p className="text-muted-foreground">Great! You haven't cancelled any bookings.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default MyBookings;