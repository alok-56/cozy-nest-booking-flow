import { FileText, Scale, CreditCard, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Terms = () => {
  const lastUpdated = "January 15, 2024";

  const keyPoints = [
    {
      icon: CheckCircle,
      title: 'Booking Terms',
      description: 'Clear guidelines for making reservations and managing your bookings with us.',
    },
    {
      icon: CreditCard,
      title: 'Payment & Pricing',
      description: 'Transparent pricing, payment terms, and refund policies for all services.',
    },
    {
      icon: Shield,
      title: 'User Responsibilities',
      description: 'Your obligations as a user of our platform and booking services.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <Scale className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Terms & Conditions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Important legal information about using our services and booking platform.
          </p>
          <p className="text-lg opacity-90">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Key Points */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Key Terms Overview</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {keyPoints.map((point, index) => (
              <Card key={index} className="hotel-card hover-lift text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <point.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-4">{point.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="hotel-card">
              <CardContent className="p-8 space-y-8">
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2 text-primary" />
                    1. Acceptance of Terms
                  </h2>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      By accessing and using HotelBook's website, mobile application, or services, you agree 
                      to be bound by these Terms and Conditions. If you do not agree with these terms, 
                      please do not use our services.
                    </p>
                    <p>
                      These terms apply to all users, including visitors, registered users, and business customers. 
                      We reserve the right to modify these terms at any time with reasonable notice.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-primary" />
                    2. Booking Terms
                  </h2>
                  <div className="text-muted-foreground space-y-4">
                    <h3 className="font-semibold text-foreground">Reservation Process</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>All bookings are subject to availability and confirmation</li>
                      <li>Prices are displayed in the currency selected at the time of booking</li>
                      <li>Special requests are forwarded to hotels but cannot be guaranteed</li>
                      <li>You must be 18+ years old to make a reservation</li>
                    </ul>
                    
                    <h3 className="font-semibold text-foreground mt-6">Booking Confirmation</h3>
                    <p>
                      Your booking is confirmed when you receive a confirmation email from us. 
                      This confirmation contains your booking reference number and all relevant details.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <CreditCard className="w-6 h-6 mr-2 text-primary" />
                    3. Payment Terms
                  </h2>
                  <div className="text-muted-foreground space-y-4">
                    <h3 className="font-semibold text-foreground">Payment Processing</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Payment is required at the time of booking unless otherwise specified</li>
                      <li>We accept major credit cards, debit cards, and selected digital payments</li>
                      <li>All payments are processed securely through our payment partners</li>
                      <li>Additional taxes and fees may apply as shown during checkout</li>
                    </ul>
                    
                    <h3 className="font-semibold text-foreground mt-6">Currency and Pricing</h3>
                    <p>
                      Prices are displayed in multiple currencies for convenience. The actual charge 
                      will be in the hotel's local currency or your selected currency at the time of booking.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <AlertTriangle className="w-6 h-6 mr-2 text-primary" />
                    4. Cancellation & Modification Policy
                  </h2>
                  <div className="text-muted-foreground space-y-4">
                    <h3 className="font-semibold text-foreground">General Policy</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Cancellation policies vary by hotel and rate type</li>
                      <li>Free cancellation is typically available 24-48 hours before check-in</li>
                      <li>Late cancellations may incur charges as per hotel policy</li>
                      <li>No-show bookings will be charged the full amount</li>
                    </ul>
                    
                    <h3 className="font-semibold text-foreground mt-6">Modifications</h3>
                    <p>
                      Booking modifications are subject to availability and may incur additional charges. 
                      Contact our customer service team for assistance with modifications.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-primary" />
                    5. User Responsibilities
                  </h2>
                  <div className="text-muted-foreground space-y-4">
                    <h3 className="font-semibold text-foreground">Account Information</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Provide accurate and complete information when making bookings</li>
                      <li>Maintain the confidentiality of your account credentials</li>
                      <li>Notify us immediately of any unauthorized account access</li>
                      <li>You are responsible for all activities under your account</li>
                    </ul>
                    
                    <h3 className="font-semibold text-foreground mt-6">Prohibited Activities</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Making false or fraudulent bookings</li>
                      <li>Interfering with the proper functioning of our website</li>
                      <li>Using our services for illegal activities</li>
                      <li>Violating the rights of other users or third parties</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">6. Hotel Policies</h2>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      Each hotel has its own specific policies regarding:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Check-in and check-out times</li>
                      <li>Age restrictions and identification requirements</li>
                      <li>Pet policies and additional fees</li>
                      <li>Smoking policies and designated areas</li>
                      <li>Additional services and amenities</li>
                    </ul>
                    <p className="mt-4">
                      These policies are displayed during the booking process and in your confirmation email. 
                      You are responsible for complying with all hotel policies.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      HotelBook acts as an intermediary between you and accommodation providers. Our liability is limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>The total amount paid for your booking</li>
                      <li>Direct damages resulting from our negligence</li>
                      <li>Issues directly caused by our platform or services</li>
                    </ul>
                    <p className="mt-4">
                      We are not liable for hotel services, amenities, or any indirect, consequential, 
                      or punitive damages.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">8. Force Majeure</h2>
                  <div className="text-muted-foreground">
                    <p>
                      We are not liable for any failure to perform our obligations due to circumstances 
                      beyond our reasonable control, including but not limited to natural disasters, 
                      war, terrorism, pandemic, government regulations, or technical failures.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">9. Privacy and Data Protection</h2>
                  <div className="text-muted-foreground">
                    <p>
                      Your use of our services is also governed by our Privacy Policy, which details 
                      how we collect, use, and protect your personal information. By using our services, 
                      you consent to our privacy practices as outlined in our Privacy Policy.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">10. Dispute Resolution</h2>
                  <div className="text-muted-foreground space-y-4">
                    <h3 className="font-semibold text-foreground">Customer Service</h3>
                    <p>
                      We encourage you to contact our customer service team first for any issues 
                      or disputes. Most problems can be resolved quickly through direct communication.
                    </p>
                    
                    <h3 className="font-semibold text-foreground mt-4">Governing Law</h3>
                    <p>
                      These terms are governed by the laws of New York, United States. Any disputes 
                      will be subject to the exclusive jurisdiction of New York courts.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">11. Modifications to Terms</h2>
                  <div className="text-muted-foreground">
                    <p>
                      We reserve the right to modify these Terms and Conditions at any time. 
                      Significant changes will be communicated via email or website notice at least 
                      30 days before taking effect. Continued use after changes indicates acceptance.
                    </p>
                  </div>
                </div>

                <div className="bg-primary/5 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <div className="text-muted-foreground">
                    <p className="mb-2">
                      For questions about these Terms and Conditions, contact us:
                    </p>
                    <p><strong>Email:</strong> legal@hotelbook.com</p>
                    <p><strong>Address:</strong> 123 Business Ave, Suite 100, New York, NY 10001</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Terms;