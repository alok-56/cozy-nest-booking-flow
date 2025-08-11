import React, { useEffect, useState } from 'react';
import { CheckCircle, Calendar, MapPin, User, CreditCard, Download, Mail, Phone, AlertCircle, Clock, XCircle } from 'lucide-react';
import { Getbookingstatus } from '@/api/Services/api';
import { useParams } from 'react-router-dom';

const PaymentStatus = () => {
   const { merchantTransactionId } = useParams();
  const [showConfetti, setShowConfetti] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!merchantTransactionId) {
          throw new Error('Merchant Transaction ID is required');
        }

        const response = await Getbookingstatus(merchantTransactionId);
        
        if (!response || response.error) {
          throw new Error(response?.message || 'Failed to fetch booking details');
        }

        setBookingData(response.data);
        
        if (response.data?.status === 'booked') {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 3000);
        }
      } catch (err) {
        console.error('Error fetching booking data:', err);
        setError(err.message || 'Something went wrong while fetching booking details');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingData();
  }, [merchantTransactionId]);

  const handleDownloadReceipt = () => {
    console.log('Downloading receipt for booking:', bookingData?.bookingId?.bookingId);
  };

  const handleEmailReceipt = () => {
    console.log('Emailing receipt to:', bookingData?.bookingId?.userInfo?.[0]?.email);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(amount);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'booked':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-100',
          gradientFrom: 'from-green-50',
          gradientTo: 'to-blue-50',
          title: 'Payment Successful! 🎉',
          subtitle: 'Your booking has been confirmed'
        };
      case 'pending':
        return {
          icon: Clock,
          iconColor: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          gradientFrom: 'from-yellow-50',
          gradientTo: 'to-orange-50',
          title: 'Payment Pending ⏳',
          subtitle: 'Your payment is being processed'
        };
      case 'failed':
        return {
          icon: XCircle,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-100',
          gradientFrom: 'from-red-50',
          gradientTo: 'to-orange-50',
          title: 'Payment Failed ❌',
          subtitle: 'There was an issue with your payment'
        };
      default:
        return {
          icon: AlertCircle,
          iconColor: 'text-gray-600',
          bgColor: 'bg-gray-100',
          gradientFrom: 'from-gray-50',
          gradientTo: 'to-gray-50',
          title: 'Unknown Status',
          subtitle: 'Please contact support'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const booking = bookingData?.bookingId;
  const guest = booking?.userInfo?.[0];
  const gateway = bookingData?.gatewayResponse;
  const status = bookingData?.status;
  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${statusConfig.gradientFrom} ${statusConfig.gradientTo} relative overflow-hidden`}>
      {showConfetti && status === 'booked' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="confetti-container">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444'][Math.floor(Math.random() * 4)]
                }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className={`inline-flex items-center justify-center w-20 h-20 ${statusConfig.bgColor} rounded-full mb-6 ${status === 'booked' ? 'animate-bounce' : ''}`}>
              <StatusIcon className={`w-12 h-12 ${statusConfig.iconColor}`} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {statusConfig.title}
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              {statusConfig.subtitle}
            </p>
            <p className="text-lg text-gray-500">
              Booking ID: <span className="font-mono font-semibold text-blue-600">{booking?.bookingId}</span>
            </p>
            
            {status === 'pending' && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
                <p className="text-yellow-800 text-sm">
                  Please wait while we process your payment. This usually takes a few minutes.
                </p>
              </div>
            )}
            
            {status === 'failed' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
                <p className="text-red-800 text-sm">
                  Your payment could not be processed. Please try booking again or contact support.
                </p>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Booking Details</h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">BRILLS ROOMS</p>
                        
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Check-in</p>
                        <p className="text-gray-600">{formatDate(booking?.checkInDate)}</p>
                        <p className="text-sm text-gray-500">After 3:00 PM</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Check-out</p>
                        <p className="text-gray-600">{formatDate(booking?.checkOutDate)}</p>
                        <p className="text-sm text-gray-500">Before 11:00 AM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <User className="w-5 h-5 text-blue-600 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">Guest Details</p>
                        <p className="text-gray-600">{guest?.name}</p>
                        <p className="text-gray-600">
                          {booking?.guests?.adults} Adults 
                          {booking?.guests?.children > 0 && ` • ${booking?.guests?.children} Children`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="font-semibold text-blue-900">Standard Room</p>
                      <p className="text-blue-700">{booking?.stayDuration} nights</p>
                      {booking?.RoomNo?.length > 0 && (
                        <p className="text-blue-700">Room: {booking.RoomNo.join(', ')}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{guest?.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">{guest?.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="shadow-lg border-0 bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Payment Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room charges ({booking?.stayDuration} nights)</span>
                    <span className="font-semibold">{formatAmount((booking?.totalAmount || 0) - (bookingData?.tax || 0))}</span>
                  </div>
                  {bookingData?.tax > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taxes & Fees</span>
                      <span className="font-semibold">{formatAmount(bookingData?.tax)}</span>
                    </div>
                  )}
                  {bookingData?.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount Applied</span>
                      <span className="font-semibold">-{formatAmount(bookingData?.discountAmount)}</span>
                    </div>
                  )}
                  <div className="border-t pt-3 flex justify-between text-lg">
                    <span className="font-bold text-gray-900">Total Amount</span>
                    <span className="font-bold text-gray-900">{formatAmount(bookingData?.totalAmount || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className={`font-semibold ${status === 'booked' ? 'text-green-600' : 'text-gray-600'}`}>
                      {formatAmount(bookingData?.amountPaid || 0)}
                    </span>
                  </div>
                  {bookingData?.pendingAmount > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pending Amount</span>
                      <span className="font-semibold text-orange-600">{formatAmount(bookingData?.pendingAmount)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                  <CreditCard className="w-4 h-4" />
                  <span>
                    Payment via {bookingData?.paymentMethod ? 
                      bookingData.paymentMethod.charAt(0).toUpperCase() + bookingData.paymentMethod.slice(1) :
                      'Online Payment'
                    }
                  </span>
                </div>
                
               
                {bookingData?.merchantTransactionId && (
                  <p className="text-xs text-gray-500 mb-4">
                     Transaction ID: {bookingData.merchantTransactionId}
                  </p>
                )}
                
                <div className="mb-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    status === 'booked' ? 'bg-green-100 text-green-800' :
                    status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {status === 'booked' ? 'Payment Completed' :
                     status === 'pending' ? 'Payment Pending' :
                     status === 'failed' ? 'Payment Failed' :
                     'Unknown Status'}
                  </span>
                </div>

               
                
                

                {status === 'pending' && (
                  <button 
                    onClick={() => window.location.reload()} 
                    className="w-full border border-yellow-200 text-yellow-700 hover:bg-yellow-50 px-4 py-2 rounded-lg"
                  >
                    Refresh Status
                  </button>
                )}
              </div>
            </div>
          </div>

          {status === 'booked' && (
            <div className="mt-8 shadow-lg border-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">What's Next?</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Confirmation Email</h4>
                  <p className="text-sm text-gray-600">You'll receive a detailed confirmation email within 5 minutes</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Hotel Contact</h4>
                  <p className="text-sm text-gray-600">The hotel will contact you 24 hours before check-in</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">Check-in Ready</h4>
                  <p className="text-sm text-gray-600">Present your booking confirmation at the hotel reception</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        
        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          animation: confetti-fall 3s linear infinite;
        }
        
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentStatus;