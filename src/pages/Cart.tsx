import { useState } from 'react';
import { Trash2, Plus, Minus, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import roomDeluxe from '@/assets/room-deluxe.jpg';

const Cart = () => {
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      hotelName: 'Grand Plaza Hotel',
      roomName: 'Deluxe Room',
      price: 199,
      quantity: 2,
      image: roomDeluxe,
      checkIn: '2024-03-15',
      checkOut: '2024-03-18',
      nights: 3,
      guests: '2 Adults',
    },
    {
      id: 2,
      hotelName: 'Grand Plaza Hotel',
      roomName: 'Executive Suite',
      price: 299,
      quantity: 1,
      image: roomDeluxe,
      checkIn: '2024-03-15',
      checkOut: '2024-03-18',
      nights: 3,
      guests: '2 Adults, 1 Child',
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Room has been removed from your cart.",
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE20') {
      setDiscount(0.2);
      toast({
        title: "Promo Code Applied!",
        description: "You saved 20% on your booking!",
      });
    } else if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(0.1);
      toast({
        title: "Promo Code Applied!",
        description: "You saved 10% on your booking!",
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      });
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.nights * item.quantity), 0);
  };

  const getTaxes = () => {
    return getSubtotal() * 0.12; // 12% tax
  };

  const getDiscountAmount = () => {
    return getSubtotal() * discount;
  };

  const getTotal = () => {
    return getSubtotal() + getTaxes() - getDiscountAmount();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any rooms to your cart yet.
            </p>
            <Link to="/hotels">
              <Button className="primary-gradient hover-lift">
                Browse Hotels
              </Button>
            </Link>
          </div>
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
        <Link to="/rooms">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
            
            {cartItems.map((item, index) => (
              <Card key={item.id} className="hotel-card animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img 
                      src={item.image} 
                      alt={item.roomName}
                      className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{item.roomName}</h3>
                          <p className="text-muted-foreground">{item.hotelName}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Check-in: </span>
                          <span>{new Date(item.checkIn).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium">Check-out: </span>
                          <span>{new Date(item.checkOut).toLocaleDateString()}</span>
                        </div>
                        <div>
                          <span className="font-medium">Guests: </span>
                          <span>{item.guests}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center space-x-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <span className="text-sm text-muted-foreground">rooms</span>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">
                            ${item.price} × {item.nights} nights × {item.quantity} rooms
                          </div>
                          <div className="text-xl font-bold text-primary">
                            ${item.price * item.nights * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="hotel-card sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                
                {/* Promo Code */}
                <div className="space-y-3 mb-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium">Promo Code</h4>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Apply
                    </Button>
                  </div>
                  {discount > 0 && (
                    <p className="text-green-600 text-sm">
                      ✓ {discount * 100}% discount applied!
                    </p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>${getTaxes().toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount * 100}%)</span>
                      <span>-${getDiscountAmount().toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${getTotal().toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link to="/checkout">
                  <Button className="w-full primary-gradient hover-lift mb-4">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <div className="text-xs text-muted-foreground text-center">
                  <p>Free cancellation until 24 hours before check-in</p>
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

export default Cart;