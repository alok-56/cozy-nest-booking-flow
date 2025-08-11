import { Shield, Lock, Eye, Database, Globe, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Privacy = () => {
  const lastUpdated = "January 15, 2024";

  const principles = [
    {
      icon: Lock,
      title: 'Data Security',
      description: 'Your personal information is protected with bank-level encryption and security measures.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We clearly explain what data we collect, how we use it, and who we share it with.',
    },
    {
      icon: UserCheck,
      title: 'User Control',
      description: 'You have full control over your data with easy access, update, and deletion options.',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Privacy Policy
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">
            Your privacy is our priority. Learn how we protect and handle your personal information.
          </p>
          <p className="text-lg opacity-90">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in">Our Privacy Principles</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {principles.map((principle, index) => (
              <Card key={index} className="hotel-card hover-lift text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8">
                  <principle.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-semibold mb-4">{principle.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="hotel-card">
              <CardContent className="p-8 space-y-8">
                
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-2 text-primary" />
                    Information We Collect
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <h3 className="font-semibold text-foreground">Personal Information</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Name, email address, phone number, and postal address</li>
                      <li>Payment information (credit card details are processed securely and not stored)</li>
                      <li>Travel preferences and booking history</li>
                      <li>Identity verification documents when required</li>
                    </ul>
                    
                    <h3 className="font-semibold text-foreground mt-6">Usage Information</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Device information, IP address, and browser type</li>
                      <li>Website usage patterns and preferences</li>
                      <li>Location data (with your permission)</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Globe className="w-6 h-6 mr-2 text-primary" />
                    How We Use Your Information
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <h3 className="font-semibold text-foreground">Service Provision</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Process and manage your bookings</li>
                      <li>Provide customer support and assistance</li>
                      <li>Send booking confirmations and travel updates</li>
                      <li>Facilitate communication with hotels and partners</li>
                    </ul>
                    
                    <h3 className="font-semibold text-foreground mt-6">Improvement & Marketing</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Analyze usage patterns to improve our services</li>
                      <li>Send promotional offers and travel deals (with consent)</li>
                      <li>Personalize your experience and recommendations</li>
                      <li>Conduct research and analytics</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Shield className="w-6 h-6 mr-2 text-primary" />
                    Information Sharing
                  </h2>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      We may share your information only in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Hotel Partners:</strong> Necessary booking details to confirm reservations</li>
                      <li><strong>Service Providers:</strong> Trusted third parties who assist in service delivery</li>
                      <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                      <li><strong>Business Transfers:</strong> In case of merger, acquisition, or asset sale</li>
                    </ul>
                    <p className="mt-4">
                      <strong>We never sell your personal information to third parties.</strong>
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-primary" />
                    Data Security
                  </h2>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      We implement comprehensive security measures to protect your information:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>SSL/TLS encryption for all data transmission</li>
                      <li>Secure data centers with physical security controls</li>
                      <li>Regular security audits and vulnerability assessments</li>
                      <li>Employee access controls and security training</li>
                      <li>PCI DSS compliance for payment processing</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <UserCheck className="w-6 h-6 mr-2 text-primary" />
                    Your Rights
                  </h2>
                  <div className="text-muted-foreground space-y-4">
                    <p>You have the following rights regarding your personal data:</p>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Access:</strong> Request a copy of your personal information</li>
                      <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                      <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                      <li><strong>Portability:</strong> Receive your data in a portable format</li>
                      <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                      <li><strong>Object:</strong> Object to certain types of data processing</li>
                    </ul>
                    <p className="mt-4">
                      To exercise these rights, contact us at <strong>privacy@Brills Rooms.com</strong>
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Cookies & Tracking</h2>
                  <div className="text-muted-foreground space-y-4">
                    <p>
                      We use cookies and similar technologies to enhance your experience:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand usage patterns</li>
                      <li><strong>Marketing Cookies:</strong> Deliver relevant advertisements</li>
                      <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    </ul>
                    <p className="mt-4">
                      You can control cookie settings through your browser preferences.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                  <div className="text-muted-foreground">
                    <p>
                      We retain your personal information for as long as necessary to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 mt-2">
                      <li>Provide our services to you</li>
                      <li>Comply with legal obligations</li>
                      <li>Resolve disputes and enforce agreements</li>
                      <li>Maintain business records for accounting purposes</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">International Transfers</h2>
                  <div className="text-muted-foreground">
                    <p>
                      Your information may be transferred and processed in countries other than your residence. 
                      We ensure appropriate safeguards are in place through standard contractual clauses 
                      and adequacy decisions where applicable.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                  <div className="text-muted-foreground">
                    <p>
                      We may update this Privacy Policy periodically. We will notify you of significant 
                      changes via email or website notice. The "Last Updated" date reflects when changes 
                      were made.
                    </p>
                  </div>
                </div>

                {/* <div className="bg-primary/5 p-6 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <div className="text-muted-foreground">
                    <p className="mb-2">
                      For privacy-related questions or concerns, contact our Data Protection Officer:
                    </p>
                    <p><strong>Email:</strong> privacy@Brills Rooms.com</p>
                    <p><strong>Address:</strong> 123 Business Ave, Suite 100, New York, NY 10001</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Privacy;