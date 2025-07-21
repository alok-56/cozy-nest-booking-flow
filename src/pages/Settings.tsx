import React, { useState } from 'react';
import { useSettings } from '@/contexts/SettingsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, Palette, FileText, MapPin, Phone, Star } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const SettingsPage = () => {
  const { settings, updateSettings, resetSettings } = useSettings();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('branding');

  const handleBrandingUpdate = (field: string, value: string) => {
    updateSettings({
      branding: {
        ...settings.branding,
        [field]: value,
      },
    });
  };

  const handleContentUpdate = (field: string, value: string) => {
    updateSettings({
      content: {
        ...settings.content,
        [field]: value,
      },
    });
  };

  const handleContactUpdate = (field: string, value: string) => {
    updateSettings({
      contact: {
        ...settings.contact,
        [field]: value,
      },
    });
  };

  const handleFeatureUpdate = (index: number, field: string, value: string) => {
    const updatedFeatures = [...settings.content.features];
    updatedFeatures[index] = {
      ...updatedFeatures[index],
      [field]: value,
    };
    updateSettings({
      content: {
        ...settings.content,
        features: updatedFeatures,
      },
    });
  };

  const handleNearbyPlaceUpdate = (index: number, field: string, value: string) => {
    const updatedPlaces = [...settings.content.nearbyPlaces];
    updatedPlaces[index] = {
      ...updatedPlaces[index],
      [field]: value,
    };
    updateSettings({
      content: {
        ...settings.content,
        nearbyPlaces: updatedPlaces,
      },
    });
  };

  const handleHotelUpdate = (index: number, field: string, value: string | number) => {
    const updatedHotels = [...settings.content.featuredHotels];
    updatedHotels[index] = {
      ...updatedHotels[index],
      [field]: value,
    };
    updateSettings({
      content: {
        ...settings.content,
        featuredHotels: updatedHotels,
      },
    });
  };

  const handleReset = () => {
    resetSettings();
    toast({
      title: 'Settings Reset',
      description: 'All settings have been reset to default values.',
    });
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `hotelbook-settings-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: 'Settings Exported',
      description: 'Settings have been exported to a JSON file.',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-8 h-8 text-primary" />
          <h1 className="text-4xl font-bold">Settings Panel</h1>
        </div>
        
        <div className="flex gap-4 mb-6">
          <Button onClick={handleReset} variant="outline" className="text-destructive hover:bg-destructive/10">
            Reset All Settings
          </Button>
          <Button onClick={handleExport} variant="outline">
            Export Settings
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Branding
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              Features
            </TabsTrigger>
            <TabsTrigger value="places" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Places
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Branding Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={settings.branding.siteName}
                    onChange={(e) => handleBrandingUpdate('siteName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={settings.branding.logo}
                    onChange={(e) => handleBrandingUpdate('logo', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="primaryColor">Primary Color (HSL)</Label>
                  <Input
                    id="primaryColor"
                    value={settings.branding.primaryColor}
                    onChange={(e) => handleBrandingUpdate('primaryColor', e.target.value)}
                    placeholder="hsl(220, 70%, 50%)"
                  />
                </div>
                <div>
                  <Label htmlFor="secondaryColor">Secondary Color (HSL)</Label>
                  <Input
                    id="secondaryColor"
                    value={settings.branding.secondaryColor}
                    onChange={(e) => handleBrandingUpdate('secondaryColor', e.target.value)}
                    placeholder="hsl(45, 90%, 60%)"
                  />
                </div>
                <div>
                  <Label htmlFor="accentColor">Accent Color (HSL)</Label>
                  <Input
                    id="accentColor"
                    value={settings.branding.accentColor}
                    onChange={(e) => handleBrandingUpdate('accentColor', e.target.value)}
                    placeholder="hsl(280, 80%, 60%)"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    value={settings.content.heroTitle}
                    onChange={(e) => handleContentUpdate('heroTitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Textarea
                    id="heroSubtitle"
                    value={settings.content.heroSubtitle}
                    onChange={(e) => handleContentUpdate('heroSubtitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="featuresTitle">Features Section Title</Label>
                  <Input
                    id="featuresTitle"
                    value={settings.content.featuresTitle}
                    onChange={(e) => handleContentUpdate('featuresTitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="featuresSubtitle">Features Section Subtitle</Label>
                  <Textarea
                    id="featuresSubtitle"
                    value={settings.content.featuresSubtitle}
                    onChange={(e) => handleContentUpdate('featuresSubtitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hotelsTitle">Hotels Section Title</Label>
                  <Input
                    id="hotelsTitle"
                    value={settings.content.hotelsTitle}
                    onChange={(e) => handleContentUpdate('hotelsTitle', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="hotelsSubtitle">Hotels Section Subtitle</Label>
                  <Textarea
                    id="hotelsSubtitle"
                    value={settings.content.hotelsSubtitle}
                    onChange={(e) => handleContentUpdate('hotelsSubtitle', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Features Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {settings.content.features.map((feature, index) => (
                    <Card key={feature.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label>Feature Title</Label>
                          <Input
                            value={feature.title}
                            onChange={(e) => handleFeatureUpdate(index, 'title', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Icon Name</Label>
                          <Input
                            value={feature.icon}
                            onChange={(e) => handleFeatureUpdate(index, 'icon', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea
                            value={feature.description}
                            onChange={(e) => handleFeatureUpdate(index, 'description', e.target.value)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="places">
            <Card>
              <CardHeader>
                <CardTitle>Nearby Places</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {settings.content.nearbyPlaces.map((place, index) => (
                    <Card key={place.id} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Label>Place Name</Label>
                          <Input
                            value={place.name}
                            onChange={(e) => handleNearbyPlaceUpdate(index, 'name', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Distance</Label>
                          <Input
                            value={place.distance}
                            onChange={(e) => handleNearbyPlaceUpdate(index, 'distance', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <Input
                            value={place.type}
                            onChange={(e) => handleNearbyPlaceUpdate(index, 'type', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Image URL</Label>
                          <Input
                            value={place.image}
                            onChange={(e) => handleNearbyPlaceUpdate(index, 'image', e.target.value)}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.contact.phone}
                    onChange={(e) => handleContactUpdate('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    value={settings.contact.email}
                    onChange={(e) => handleContactUpdate('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={settings.contact.address}
                    onChange={(e) => handleContactUpdate('address', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default SettingsPage;