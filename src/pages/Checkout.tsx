import { useState, useEffect } from "react";
import {
  CreditCard,
  Lock,
  ArrowLeft,
  Check,
  Loader2,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking, Validatepayments } from "@/api/Services/api";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [merchantTransactionId, setMerchantTransactionId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [error, setError] = useState("");

  const {
    hotel,
    selectedRooms = [],
    checkIn,
    checkOut,
    totalPrice,
  } = location.state || {};

  useEffect(() => {
    if (!hotel || !selectedRooms.length || !checkIn || !checkOut) {
      navigate("/hotels");
    }
  }, [hotel, selectedRooms, checkIn, checkOut, navigate]);

  // Calculate booking details
  const calculateStayDuration = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateStayDuration();
  const subtotal = selectedRooms.reduce(
    (total, room) => total + room.price * room.quantity * nights,
    0
  );
  const taxes = subtotal * 0.12; // 12% tax
  const total = subtotal + taxes;

  const bookingData = {
    hotel: hotel || {},
    selectedRooms: selectedRooms || [],
    checkIn: checkIn || "",
    checkOut: checkOut || "",
    nights,
    subtotal,
    taxes,
    total,
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    agreeToTerms: false,
    subscribeNewsletter: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.agreeToTerms) {
      setError("Please accept the terms and conditions to proceed.");
      return;
    }

    setLoading(true);
    setError("");
    setStep(2);

    try {
      // Prepare booking payload matching your API structure
      const roomIds = selectedRooms.map((room) => room._id);
      const bookingPayload = {
        hotelId: hotel._id,
        roomId: roomIds,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        userInfo: [
          {
            name: `${formData.firstName} ${formData.lastName}`,
            phone: formData.phone,
            email: formData.email,
            age: 25,
          },
        ],
        guests: { adults: 2, children: 0 },
        addOns: [],
        couponCode: "",
        discountAmount: 0,
        taxAmount: 0,
        totalAmount: bookingData.subtotal,
        pendingAmount: bookingData.subtotal,
        amountPaid: 0,
        userId: null,
      };

      // Call your actual API
      const response = await createBooking(bookingPayload);

      if (response?.status && response?.data) {
        setPaymentUrl(response.data);
        // Extract transaction ID from response if available
        setMerchantTransactionId("TXN" + Date.now()); // You might get this from response
        setStep(3);
      } else {
        throw new Error(response?.message || "Failed to create booking");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setError(
        error.message ||
          "There was an error processing your booking. Please try again."
      );
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentRedirect = () => {
    window.location.href = paymentUrl;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Hotel Booking</h1>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center mb-6 sm:mb-8 px-4">
          {/* Mobile: Vertical Layout */}
          <div className="flex flex-col space-y-4 sm:hidden w-full max-w-xs">
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full ${
                  step >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                } flex items-center justify-center text-xs font-semibold flex-shrink-0`}
              >
                {step > 1 ? <Check className="w-3 h-3" /> : "1"}
              </div>
              <span className="ml-3 text-sm font-medium">Guest Details</span>
              {step >= 1 && (
                <Check className="w-4 h-4 text-green-600 ml-auto" />
              )}
            </div>
            
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full ${
                  step >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                } flex items-center justify-center text-xs font-semibold flex-shrink-0`}
              >
                {step > 2 ? <Check className="w-3 h-3" /> : "2"}
              </div>
              <span className="ml-3 text-sm font-medium">Processing</span>
              {step >= 2 && step !== 2 && (
                <Check className="w-4 h-4 text-green-600 ml-auto" />
              )}
              {step === 2 && (
                <Loader2 className="w-4 h-4 text-blue-600 ml-auto animate-spin" />
              )}
            </div>

            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full ${
                  step >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                } flex items-center justify-center text-xs font-semibold flex-shrink-0`}
              >
                {step > 3 ? <Check className="w-3 h-3" /> : "3"}
              </div>
              <span className="ml-3 text-sm font-medium">Payment</span>
              {step >= 3 && (
                <CheckCircle className="w-4 h-4 text-green-600 ml-auto" />
              )}
            </div>
          </div>

          {/* Desktop/Tablet: Horizontal Layout */}
          <div className="hidden sm:flex items-center space-x-4">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full ${
                  step >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                } flex items-center justify-center text-sm font-semibold`}
              >
                {step > 1 ? <Check className="w-4 h-4" /> : "1"}
              </div>
              <span className="ml-2 text-sm">Details</span>
            </div>
            <div
              className={`w-16 h-1 ${
                step >= 2 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full ${
                  step >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                } flex items-center justify-center text-sm font-semibold`}
              >
                {step > 2 ? <Check className="w-4 h-4" /> : "2"}
              </div>
              <span className="ml-2 text-sm">Processing</span>
            </div>
            <div
              className={`w-16 h-1 ${
                step >= 3 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full ${
                  step >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-500"
                } flex items-center justify-center text-sm font-semibold`}
              >
                {step > 3 ? <Check className="w-4 h-4" /> : "3"}
              </div>
              <span className="ml-2 text-sm">Payment</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm sm:text-base text-red-700">{error}</span>
          </div>
        )}

        {/* Step 1: Booking Form */}
        {step === 1 && (
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <div className="space-y-4 sm:space-y-6">
                {/* Guest Information */}
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4">
                    Guest Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                    <div className="sm:col-span-1">
                      <label className="block text-sm font-medium mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                        />
                        <label className="text-sm">
                          I agree to the Terms & Conditions and Privacy Policy *
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-base sm:text-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!formData.agreeToTerms || loading}
                >
                  <Lock className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="truncate">
                    Proceed to Payment - ₹{bookingData.subtotal.toFixed(2)}
                  </span>
                </button>
              </div>
            </div>

            {/* Booking Summary - Sticky on desktop, normal flow on mobile */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:sticky lg:top-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Booking Summary</h3>

                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base">
                      {bookingData.hotel.hotelName}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {bookingData.hotel.city}, {bookingData.hotel.state}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {bookingData.checkIn} - {bookingData.checkOut}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {bookingData.nights} nights
                    </p>
                  </div>

                  {bookingData.selectedRooms.map((room) => (
                    <div
                      key={room._id}
                      className="border-l-2 border-blue-500 pl-3"
                    >
                      <p className="font-medium text-sm sm:text-base">{room.roomType}</p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {room.quantity} room(s) × {bookingData.nights} nights ×
                        ₹{room.price}
                      </p>
                      <p className="text-xs sm:text-sm font-medium">
                        ₹
                        {(
                          room.price *
                          room.quantity *
                          bookingData.nights
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 border-t pt-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span>Subtotal</span>
                    <span>₹{bookingData.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base sm:text-lg font-bold border-t pt-2">
                    <span>Total</span>
                    <span>₹{bookingData.subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-700 mb-2">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    <span className="font-medium text-xs sm:text-sm">Free Cancellation</span>
                  </div>
                  <p className="text-xs sm:text-sm text-green-600">
                    Cancel until 24 hours before check-in for a full refund
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Processing */}
        {step === 2 && (
          <div className="text-center py-8 sm:py-12">
            <div className="max-w-md mx-auto px-4">
              <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-blue-600 mx-auto mb-4 animate-spin" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Processing Your Booking
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Please wait while we prepare your payment...
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Payment Redirect */}
        {step === 3 && (
          <div className="text-center py-8 sm:py-12">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-8 mx-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Ready for Payment
              </h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                You will be redirected to PhonePe to complete your payment
                securely.
              </p>

              <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-6">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Amount to Pay:</span>
                  <span className="font-semibold">
                    ₹{bookingData.subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm mt-1">
                  <span>Transaction ID:</span>
                  <span className="font-mono text-xs break-all">
                    {merchantTransactionId}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePaymentRedirect}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-semibold text-sm sm:text-base flex items-center justify-center transition-colors"
              >
                Continue to PhonePe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;