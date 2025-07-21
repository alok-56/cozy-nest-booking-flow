import { Heart, Globe, Users, Award, Target, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We put our customers at the heart of everything we do, ensuring exceptional service and memorable experiences.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connecting travelers with amazing accommodations worldwide through our extensive network of partners.',
    },
    {
      icon: Users,
      title: 'Trust & Reliability',
      description: 'Building lasting relationships through transparent pricing, secure bookings, and dependable service.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Continuously striving for excellence in all aspects of our service and customer experience.',
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      description: 'Former VP at leading travel company with 15+ years in hospitality industry.',
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      description: 'Tech innovator focused on creating seamless booking experiences through cutting-edge technology.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'VP of Operations',
      description: 'Operations expert ensuring smooth processes and exceptional service delivery worldwide.',
    },
    {
      name: 'David Kim',
      role: 'VP of Business Development',
      description: 'Partnership specialist building relationships with hotels and travel companies globally.',
    },
  ];

  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'HotelBook was founded with a vision to simplify hotel bookings.' },
    { year: '2019', title: '10,000+ Hotels', description: 'Expanded our network to include over 10,000 properties worldwide.' },
    { year: '2020', title: '1M Bookings', description: 'Reached the milestone of 1 million successful bookings.' },
    { year: '2021', title: 'B2B Launch', description: 'Launched our B2B platform for corporate travel management.' },
    { year: '2022', title: 'Global Expansion', description: 'Expanded operations to over 50 countries worldwide.' },
    { year: '2023', title: '5M+ Users', description: 'Our platform now serves over 5 million registered users.' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            About HotelBook
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            We're on a mission to make travel booking simple, transparent, and accessible for everyone. 
            Discover the story behind your trusted travel companion.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-8 h-8 text-primary" />
                <h2 className="text-4xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg leading-relaxed text-muted-foreground">
                At HotelBook, we believe that everyone deserves access to amazing travel experiences. 
                Our mission is to connect travelers with perfect accommodations while providing 
                transparent pricing, reliable service, and exceptional customer support.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We're committed to making travel planning effortless and enjoyable, whether you're 
                booking a weekend getaway or managing corporate travel for hundreds of employees.
              </p>
            </div>
            
            <div className="animate-slide-up">
              <Card className="hotel-card p-8">
                <div className="text-center">
                  <Zap className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h3 className="text-2xl font-bold mb-4">Innovation Driven</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We leverage cutting-edge technology and data-driven insights to continuously 
                    improve our platform and provide the best possible experience for our users.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              The principles that guide us in everything we do
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hotel-card hover-lift text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Our Journey</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              Key milestones in our growth and development
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-24 text-right">
                    <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up">
              The passionate people behind HotelBook's success
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hotel-card hover-lift text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">By the Numbers</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center animate-scale-in">
              <div className="text-4xl font-bold text-primary mb-2">5M+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Hotel Partners</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-primary mb-2">180+</div>
              <div className="text-muted-foreground">Countries</div>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-primary mb-2">10M+</div>
              <div className="text-muted-foreground">Bookings Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Be part of the HotelBook community and experience the future of travel booking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="secondary-gradient text-foreground hover-lift">
              Start Booking Today
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;