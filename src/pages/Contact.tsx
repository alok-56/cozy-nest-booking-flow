import { Phone, Mail, MapPin, Clock, MessageCircle, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();

  const contactMethods = [
    {
      icon: Phone,
      title: '24/7 Phone Support',
      details: '+1 (555) 123-4567',
      description: 'Speak directly with our travel experts anytime',
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@hotelbook.com',
      description: 'Get detailed assistance via email',
    },
  ];

  const offices = [
    {
      city: 'New York (HQ)',
      address: '123 Business Ave, Suite 100\nNew York, NY 10001',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 9AM-6PM EST',
    },
    {
      city: 'Los Angeles',
      address: '456 Sunset Blvd, Floor 15\nLos Angeles, CA 90028',
      phone: '+1 (555) 987-6543',
      hours: 'Mon-Fri: 9AM-6PM PST',
    },
    {
      city: 'London',
      address: '789 King\'s Road\nLondon SW3 4NX, UK',
      phone: '+44 20 1234 5678',
      hours: 'Mon-Fri: 9AM-5PM GMT',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            We're here to help! Reach out to our friendly team for any questions, 
            support, or assistance with your travel booking needs.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Get in Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Multiple ways to reach us - choose what works best for you
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hotel-card hover-lift text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <method.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{method.details}</p>
                  <p className="text-muted-foreground">{method.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <Card className="hotel-card">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name *</label>
                        <Input required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name *</label>
                        <Input required />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Email *</label>
                      <Input type="email" required />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input type="tel" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Subject *</label>
                      <select className="w-full p-2 border rounded-lg" required>
                        <option value="">Select a subject</option>
                        <option value="booking">Booking Support</option>
                        <option value="technical">Technical Issue</option>
                        <option value="business">Business Inquiry</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message *</label>
                      <textarea
                        rows={6}
                        className="w-full p-2 border rounded-lg resize-none"
                        placeholder="How can we help you?"
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full primary-gradient hover-lift">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ */}
            <div className="space-y-6 animate-slide-up">
              <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
              
              <Card className="hotel-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">How can I modify my booking?</h4>
                  <p className="text-muted-foreground">
                    You can modify your booking through your account dashboard or by contacting our support team. 
                    Modification policies depend on the hotel's terms and conditions.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hotel-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">What is your cancellation policy?</h4>
                  <p className="text-muted-foreground">
                    Cancellation policies vary by hotel. Most bookings can be cancelled free of charge 
                    up to 24-48 hours before check-in. Check your booking confirmation for specific details.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hotel-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Do you offer group booking discounts?</h4>
                  <p className="text-muted-foreground">
                    Yes! We offer special rates for group bookings (10+ rooms). Contact our B2B team 
                    for customized packages and pricing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hotel-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold mb-2">Is my payment information secure?</h4>
                  <p className="text-muted-foreground">
                    Absolutely. We use bank-level SSL encryption and are PCI DSS compliant. 
                    Your payment information is never stored on our servers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Our Offices</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Visit us at our locations around the world
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {offices.map((office, index) => (
              <Card key={index} className="hotel-card hover-lift animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-5 h-5 text-primary mr-2" />
                    <h3 className="text-lg font-semibold">{office.city}</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div className="whitespace-pre-line text-muted-foreground">
                      {office.address}
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-primary mr-2" />
                      <span>{office.phone}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-primary mr-2" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Emergency Support */}
      {/* <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <Headphones className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">24/7 Emergency Support</h2>
            <p className="text-xl mb-8">
              Need immediate assistance while traveling? Our emergency support team is available 
              around the clock to help with urgent booking issues and travel emergencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="secondary-gradient text-foreground hover-lift">
                <Phone className="w-5 h-5 mr-2" />
                Call Emergency Line
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                <MessageCircle className="w-5 h-5 mr-2" />
                Emergency Chat
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
};

export default Contact;