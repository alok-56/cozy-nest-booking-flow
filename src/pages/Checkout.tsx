import { useState } from 'react';
import { CreditCard, Lock, ArrowLeft, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Guest Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Payment Information
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    
    // Billing Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Preferences
    specialRequests: '',
    agreeToTerms: false,
    subscribeNewsletter: false,
  });

  const bookingDetails = {
    hotel: 'Grand Plaza Hotel',
    rooms: [
      { name: 'Deluxe Room', quantity: 2, price: 199, nights: 3 },
      { name: 'Executive Suite', quantity: 1, price: 299, nights: 3 },
    ],
    checkIn: '2024-03-15',
    checkOut: '2024-03-18',
    guests: '2 Adults',
    subtotal: 2094,
    taxes: 251.28,
    discount: 0,
    total: 2345.28,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please accept the terms and conditions to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Simulate payment processing
    toast({
      title: "Processing Payment...",
      description: "Please wait while we process your booking.",
    });

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Booking Confirmed! 🎉",
        description: "Your hotel booking has been confirmed. Check your email for details.",
      });
      
      // Redirect to confirmation or bookings page
      setTimeout(() => {
        window.location.href = '/my-bookings';
      }, 2000);
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/cart">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Button>
        </Link>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                <Check className="w-4 h-4" />
              </div>
              <span className="ml-2 text-sm">Cart</span>
            </div>
            <div className="w-16 h-1 bg-primary"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="ml-2 text-sm font-semibold">Checkout</span>
            </div>
            <div className="w-16 h-1 bg-gray-200"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm">
                3
              </div>
              <span className="ml-2 text-sm text-gray-500">Confirmation</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Guest Information */}
              <Card className="hotel-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Guest Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name *</label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name *</label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Information */}
              <Card className="hotel-card">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Lock className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="text-xl font-semibold">Payment Information</h3>
                    <span className="ml-auto text-sm text-green-600">Secure Checkout</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name on Card *</label>
                      <Input
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number *</label>
                      <div className="relative">
                        <Input
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                        <CreditCard className="absolute right-3 top-3 w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date *</label>
                        <Input
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV *</label>
                        <Input
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Billing Address */}
              <Card className="hotel-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Billing Address</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Address *</label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City *</label>
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State *</label>
                        <Input
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">ZIP Code *</label>
                        <Input
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Country *</label>
                        <select 
                          name="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange(e as any)}
                          className="w-full p-2 border rounded-lg"
                          required
                        >
                          <option value="">Select Country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Special Requests & Terms */}
              <Card className="hotel-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Special Requests</label>
                      <textarea
                        name="specialRequests"
                        rows={3}
                        className="w-full p-2 border rounded-lg resize-none"
                        placeholder="Any special requests or preferences..."
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, agreeToTerms: checked as boolean }))
                          }
                        />
                        <label className="text-sm">
                          I agree to the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link> *
                        </label>
                      </div>
                      
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={formData.subscribeNewsletter}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, subscribeNewsletter: checked as boolean }))
                          }
                        />
                        <label className="text-sm text-muted-foreground">
                          Subscribe to our newsletter for exclusive deals and updates
                        </label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                type="submit" 
                className="w-full primary-gradient hover-lift py-6 text-lg"
                disabled={!formData.agreeToTerms}
              >
                <Lock className="w-5 h-5 mr-2" />
                Complete Booking - ${bookingDetails.total.toFixed(2)}
              </Button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="hotel-card sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Booking Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold">{bookingDetails.hotel}</h4>
                    <p className="text-sm text-muted-foreground">
                      {bookingDetails.checkIn} - {bookingDetails.checkOut}
                    </p>
                    <p className="text-sm text-muted-foreground">{bookingDetails.guests}</p>
                  </div>
                  
                  {bookingDetails.rooms.map((room, index) => (
                    <div key={index} className="border-l-2 border-primary pl-3">
                      <p className="font-medium">{room.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {room.quantity} room(s) × {room.nights} nights × ${room.price}
                      </p>
                      <p className="text-sm font-medium">
                        ${room.quantity * room.nights * room.price}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${bookingDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>${bookingDetails.taxes.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>${bookingDetails.total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-700 mb-2">
                    <Check className="w-4 h-4 mr-2" />
                    <span className="font-medium">Free Cancellation</span>
                  </div>
                  <p className="text-sm text-green-600">
                    Cancel until 24 hours before check-in for a full refund
                  </p>
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

export default Checkout;