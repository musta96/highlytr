
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Camera, 
  File, 
  Upload, 
  Youtube,
  GraduationCap,
  Trophy,
  MapPin
} from 'lucide-react';

// This would be loaded from the backend in a real app
const mockAthleteProfile = {
  name: 'Marco Rossi',
  sport: 'Soccer',
  position: 'Forward',
  height: '5\'11"',
  weight: '175 lbs',
  age: 17,
  location: 'Rome, Italy',
  school: 'International High School of Rome',
  graduationYear: 2024,
  gpa: 3.8,
  bio: 'Passionate striker with excellent ball control and finishing skills. Captain of my high school team for the past two years.',
  profileImage: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa',
  highlights: [
    {
      id: 1,
      title: 'Season Highlights 2023',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6',
    },
    {
      id: 2,
      title: 'Tournament MVP Performance',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55',
    }
  ],
  stats: [
    { label: 'Games', value: 28 },
    { label: 'Goals', value: 17 },
    { label: 'Assists', value: 12 },
    { label: 'Minutes', value: 2240 },
  ],
  awards: [
    'Regional Tournament MVP 2023',
    'All-City First Team 2022',
    'Team Captain 2022-2023',
  ],
  isPublic: true,
};

const AthleteProfile = () => {
  const [profile, setProfile] = useState(mockAthleteProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleProfileVisibilityChange = () => {
    setProfile(prev => ({ ...prev, isPublic: !prev.isPublic }));
    // In a real app, this would be saved to the backend
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch 
              id="profile-visibility" 
              checked={profile.isPublic}
              onCheckedChange={handleProfileVisibilityChange}
            />
            <Label htmlFor="profile-visibility">
              {profile.isPublic ? 'Public Profile' : 'Private Profile'}
            </Label>
          </div>
          <Button 
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="h-32 w-32 rounded-full overflow-hidden">
                  <img 
                    src={profile.profileImage} 
                    alt={profile.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                {isEditing && (
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-0 right-0 rounded-full" 
                    title="Change Photo"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{profile.location}</span>
              </div>
              <div className="bg-highlyt-blue/10 text-highlyt-blue px-3 py-1 rounded-full text-sm font-medium mb-4">
                {profile.sport} • {profile.position}
              </div>

              {!isEditing ? (
                <div className="text-center">
                  <p className="text-gray-600">{profile.bio}</p>
                </div>
              ) : (
                <div className="w-full">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    className="mt-1"
                    placeholder="Tell coaches about yourself..."
                  />
                </div>
              )}
            </div>

            <div className="mt-6 border-t pt-6">
              <h3 className="font-medium mb-4 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Academic Information
              </h3>
              {!isEditing ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">School:</span>
                    <span>{profile.school}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Graduation:</span>
                    <span>{profile.graduationYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">GPA:</span>
                    <span>{profile.gpa}</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="school">School</Label>
                    <Input 
                      id="school"
                      value={profile.school}
                      onChange={(e) => setProfile({...profile, school: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="graduation">Graduation Year</Label>
                    <Input 
                      id="graduation"
                      type="number"
                      value={profile.graduationYear}
                      onChange={(e) => setProfile({...profile, graduationYear: parseInt(e.target.value)})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gpa">GPA</Label>
                    <Input 
                      id="gpa"
                      type="number"
                      step="0.1"
                      value={profile.gpa}
                      onChange={(e) => setProfile({...profile, gpa: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="highlights">Highlights</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!isEditing ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {profile.awards.map((award, index) => (
                        <li key={index}>{award}</li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-3">
                      {profile.awards.map((award, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input 
                            value={award}
                            onChange={(e) => {
                              const newAwards = [...profile.awards];
                              newAwards[index] = e.target.value;
                              setProfile({...profile, awards: newAwards});
                            }}
                          />
                          <Button 
                            variant="destructive" 
                            size="icon"
                            onClick={() => {
                              const newAwards = profile.awards.filter((_, i) => i !== index);
                              setProfile({...profile, awards: newAwards});
                            }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6L6 18M6 6l12 12"></path>
                            </svg>
                          </Button>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setProfile({...profile, awards: [...profile.awards, '']});
                        }}
                      >
                        Add Achievement
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Physical Attributes</CardTitle>
                </CardHeader>
                <CardContent>
                  {!isEditing ? (
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-600">Height</p>
                        <p className="font-medium">{profile.height}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="font-medium">{profile.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Age</p>
                        <p className="font-medium">{profile.age}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Position</p>
                        <p className="font-medium">{profile.position}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="height">Height</Label>
                        <Input 
                          id="height"
                          value={profile.height}
                          onChange={(e) => setProfile({...profile, height: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="weight">Weight</Label>
                        <Input 
                          id="weight"
                          value={profile.weight}
                          onChange={(e) => setProfile({...profile, weight: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input 
                          id="age"
                          type="number"
                          value={profile.age}
                          onChange={(e) => setProfile({...profile, age: parseInt(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Input 
                          id="position"
                          value={profile.position}
                          onChange={(e) => setProfile({...profile, position: e.target.value})}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="highlights" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Highlight Reels</span>
                    {isEditing && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Video
                        </Button>
                        <Button variant="outline" size="sm">
                          <Youtube className="h-4 w-4 mr-2" />
                          Link YouTube
                        </Button>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profile.highlights.map((highlight) => (
                      <div key={highlight.id} className="group relative rounded-lg overflow-hidden">
                        <img 
                          src={highlight.thumbnail} 
                          alt={highlight.title}
                          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                          <h3 className="text-white font-medium">{highlight.title}</h3>
                          <div className="flex justify-between items-center mt-2">
                            <Button variant="default" size="sm">
                              Watch
                            </Button>
                            {isEditing && (
                              <Button variant="destructive" size="sm">
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {profile.stats.map((stat, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                        <p className="text-3xl font-bold text-highlyt-blue">{stat.value}</p>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                  {isEditing && (
                    <Button variant="outline" className="mt-6 w-full">
                      Edit Statistics
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AthleteProfile;
