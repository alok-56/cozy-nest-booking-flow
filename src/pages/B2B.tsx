import { Building, Users, Globe, Shield, TrendingUp, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { createB2B } from '@/api/Services/api';
import { useState } from 'react';

const B2B = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const benefits = [
    {
      icon: Building,
      title: 'Corporate Rates',
      description: 'Access exclusive corporate discounts and negotiated rates for your business travels.',
    },
    {
      icon: Users,
      title: 'Dedicated Account Manager',
      description: 'Get a dedicated account manager to handle all your corporate booking needs.',
    },
    {
      icon: Globe,
      title: 'Global Inventory',
      description: 'Access our worldwide network of premium hotels and accommodations.',
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security and compliance for your corporate travel data.',
    },
    {
      icon: TrendingUp,
      title: 'Analytics & Reporting',
      description: 'Comprehensive reporting and analytics for better travel management.',
    },
    {
      icon: Phone,
      title: '24/7 Support',
      description: 'Round-the-clock dedicated support for all your business travel needs.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      companyName: formData.get('companyName') as string,
      companyWebsite: formData.get('companyWebsite') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      industry: formData.get('industry') as string,
      companySize: formData.get('companySize') as string,
    };

    try {
      await createB2B(payload);
      toast({
        title: "Request Submitted!",
        description: "We'll contact you within 24 hours to discuss your corporate travel needs.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            B2B Travel Solutions
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Streamline your corporate travel with our comprehensive B2B platform. 
            Save time, reduce costs, and ensure seamless business travel experiences.
          </p>
          <Button size="lg" className="secondary-gradient text-foreground hover-lift animate-scale-in">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Why Choose Our B2B Solution?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Powerful features designed specifically for businesses and corporate travel management
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hotel-card hover-lift text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <benefit.icon className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <h2 className="text-4xl font-bold">Advanced Corporate Features</h2>
              <div className="space-y-6">
                <div className="flex space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Multi-Location Management</h3>
                    <p className="text-muted-foreground">Manage bookings across multiple office locations and departments with ease.</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Approval Workflows</h3>
                    <p className="text-muted-foreground">Set up custom approval workflows for different booking types and amounts.</p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cost Control & Budgeting</h3>
                    <p className="text-muted-foreground">Set budgets, spending limits, and get real-time expense tracking.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-up">
              <Card className="hotel-card p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">Ready to Get Started?</h3>
                  <p className="text-muted-foreground">Contact our B2B team for a personalized demo</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input name="name" placeholder="Name" required />
                  <Input name="email" type="email" placeholder="Business Email" required />
                  <Input name="phone" type="tel" placeholder="Phone Number" />
                  <Input name="companyName" placeholder="Company Name" required />
                  <Input name="companyWebsite" placeholder="Company Website" />
                  <Input name="subject" placeholder="Subject" />
                  <Input name="industry" placeholder="Industry" />
                  <select name="companySize" className="w-full p-2 border rounded-lg">
                    <option value="">Company Size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-1000">201-1000 employees</option>
                    <option value="1000+">1000+ employees</option>
                  </select>
                  <Textarea
                    name="message"
                    placeholder="Tell us about your travel needs..."
                    rows={4}
                  />
                  <Button 
                    type="submit" 
                    className="w-full primary-gradient hover-lift"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Request Demo'}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  );
};

export default B2B;