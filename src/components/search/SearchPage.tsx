import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Search,
  Filter,
  X,
  BookOpen,
  MapPin,
  ChevronRight,
  Star,
  PlusCircle
} from 'lucide-react';

type SearchType = 'athletes' | 'colleges' | 'agencies';

type Filters = {
  sport: string;
  position: string;
  ageMin: number;
  ageMax: number;
  gpaMin: number;
  countryOrState: string;
  divisionLevel: string;
  hasScholarship: boolean;
};

// Mock data for athletes
const mockAthletes = [
  {
    id: 1,
    name: 'Marco Rossi',
    sport: 'Soccer',
    position: 'Forward',
    age: 17,
    gpa: 3.8,
    location: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1606131731446-5568d87113aa',
    highlights: 2,
    verified: true,
  },
  {
    id: 2,
    name: 'Giulia Ricci',
    sport: 'Soccer',
    position: 'Midfielder',
    age: 16,
    gpa: 3.9,
    location: 'Milan, Italy',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    highlights: 3,
    verified: true,
  },
  {
    id: 3,
    name: 'Carlos Mendoza',
    sport: 'Basketball',
    position: 'Point Guard',
    age: 18,
    gpa: 3.5,
    location: 'Madrid, Spain',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    highlights: 4,
    verified: true,
  },
  {
    id: 4,
    name: 'Anna Schmidt',
    sport: 'Volleyball',
    position: 'Outside Hitter',
    age: 17,
    gpa: 3.7,
    location: 'Berlin, Germany',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91',
    highlights: 1,
    verified: false,
  },
];

// Mock data for colleges
const mockColleges = [
  {
    id: 1,
    name: 'Stanford University',
    location: 'Stanford, CA',
    division: 'NCAA Division I',
    sports: ['Soccer', 'Basketball', 'Swimming', 'Tennis'],
    image: 'https://images.unsplash.com/photo-1562774053-701939374585',
    hasScholarships: true,
    openPositions: 5,
  },
  {
    id: 2,
    name: 'University of Michigan',
    location: 'Ann Arbor, MI',
    division: 'NCAA Division I',
    sports: ['Football', 'Basketball', 'Soccer', 'Swimming'],
    image: 'https://images.unsplash.com/photo-1580499376047-79a6c187ece4',
    hasScholarships: true,
    openPositions: 8,
  },
  {
    id: 3,
    name: 'UCLA',
    location: 'Los Angeles, CA',
    division: 'NCAA Division I',
    sports: ['Basketball', 'Soccer', 'Volleyball', 'Tennis'],
    image: 'https://images.unsplash.com/photo-1589391886645-d51941baf7fb',
    hasScholarships: true,
    openPositions: 3,
  },
  {
    id: 4,
    name: 'Amherst College',
    location: 'Amherst, MA',
    division: 'NCAA Division III',
    sports: ['Soccer', 'Lacrosse', 'Tennis', 'Swimming'],
    image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a',
    hasScholarships: false,
    openPositions: 7,
  },
];

interface SearchPageProps {
  type: SearchType;
}

const SearchPage: React.FC<SearchPageProps> = ({ type }) => {
  const [query, setQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    sport: '',
    position: '',
    ageMin: 14,
    ageMax: 19,
    gpaMin: 2.0,
    countryOrState: '',
    divisionLevel: '',
    hasScholarship: false,
  });

  const sportOptions = ['Soccer', 'Basketball', 'Volleyball', 'Swimming', 'Tennis', 'Track & Field'];
  
  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      sport: '',
      position: '',
      ageMin: 14,
      ageMax: 19,
      gpaMin: 2.0,
      countryOrState: '',
      divisionLevel: '',
      hasScholarship: false,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          {type === 'athletes' ? 'Find Athletes' : type === 'colleges' ? 'Find Colleges' : 'Find Agencies'}
        </h1>
        
        <Button 
          variant="outline" 
          className="md:hidden" 
          onClick={() => setShowMobileFilters(true)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          placeholder={`Search ${type}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Filters */}
        <div className="hidden md:block">
          <div className="bg-white rounded-lg border p-6 sticky top-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg">Filters</h2>
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset
              </Button>
            </div>

            <Accordion type="multiple" defaultValue={['sport', 'location', 'academic']}>
              <AccordionItem value="sport">
                <AccordionTrigger>Sport</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="sport">Sport</Label>
                      <Select 
                        value={filters.sport} 
                        onValueChange={(value) => handleFilterChange('sport', value)}
                      >
                        <SelectTrigger id="sport">
                          <SelectValue placeholder="Select sport" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Sport</SelectItem>
                          {sportOptions.map(sport => (
                            <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {type === 'athletes' && (
                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Input 
                          id="position" 
                          placeholder="Any position"
                          value={filters.position}
                          onChange={(e) => handleFilterChange('position', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {type === 'athletes' && (
                <AccordionItem value="age">
                  <AccordionTrigger>Age Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Age Range: {filters.ageMin} - {filters.ageMax}</Label>
                        </div>
                        <div className="py-4">
                          <Slider
                            defaultValue={[filters.ageMin, filters.ageMax]}
                            min={14}
                            max={19}
                            step={1}
                            onValueChange={(value) => {
                              handleFilterChange('ageMin', value[0]);
                              handleFilterChange('ageMax', value[1]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem value="location">
                <AccordionTrigger>Location</AccordionTrigger>
                <AccordionContent>
                  <div>
                    <Label htmlFor="location">{type === 'athletes' ? 'Country' : 'State'}</Label>
                    <Input 
                      id="location" 
                      placeholder={type === 'athletes' ? "Any country" : "Any state"}
                      value={filters.countryOrState}
                      onChange={(e) => handleFilterChange('countryOrState', e.target.value)}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>

              {type === 'athletes' && (
                <AccordionItem value="academic">
                  <AccordionTrigger>Academic</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Minimum GPA: {filters.gpaMin.toFixed(1)}</Label>
                        </div>
                        <div className="py-4">
                          <Slider
                            defaultValue={[filters.gpaMin]}
                            min={2.0}
                            max={4.0}
                            step={0.1}
                            onValueChange={(value) => {
                              handleFilterChange('gpaMin', value[0]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {type === 'colleges' && (
                <>
                  <AccordionItem value="division">
                    <AccordionTrigger>Division Level</AccordionTrigger>
                    <AccordionContent>
                      <div>
                        <Select 
                          value={filters.divisionLevel} 
                          onValueChange={(value) => handleFilterChange('divisionLevel', value)}
                        >
                          <SelectTrigger id="division">
                            <SelectValue placeholder="Any division" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Division</SelectItem>
                            <SelectItem value="NCAA Division I">NCAA Division I</SelectItem>
                            <SelectItem value="NCAA Division II">NCAA Division II</SelectItem>
                            <SelectItem value="NCAA Division III">NCAA Division III</SelectItem>
                            <SelectItem value="NAIA">NAIA</SelectItem>
                            <SelectItem value="NJCAA">NJCAA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="scholarships">
                    <AccordionTrigger>Scholarships</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="hasScholarship"
                          checked={filters.hasScholarship}
                          onCheckedChange={(checked) => handleFilterChange('hasScholarship', checked)}
                        />
                        <Label htmlFor="hasScholarship">Offers Scholarships</Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </>
              )}
            </Accordion>
          </div>
        </div>
        
        {/* Mobile Filters Slide-in Panel */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
            <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white p-6 overflow-y-auto animate-slide-in-right">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Same accordion as desktop filters */}
              <Accordion type="multiple" defaultValue={['sport']}>
                {/* Same content as desktop filters */}
                <AccordionItem value="sport">
                  <AccordionTrigger>Sport</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="sport-mobile">Sport</Label>
                        <Select 
                          value={filters.sport} 
                          onValueChange={(value) => handleFilterChange('sport', value)}
                        >
                          <SelectTrigger id="sport-mobile">
                            <SelectValue placeholder="Select sport" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Any Sport</SelectItem>
                            {sportOptions.map(sport => (
                              <SelectItem key={sport} value={sport}>{sport}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                {/* Additional filters would be added here */}
              </Accordion>
              
              <div className="flex gap-4 mt-8">
                <Button variant="outline" className="flex-1" onClick={resetFilters}>
                  Reset
                </Button>
                <Button className="flex-1" onClick={() => setShowMobileFilters(false)}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {/* Results */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {type === 'athletes' ? (
              mockAthletes.map(athlete => (
                <Card key={athlete.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={athlete.image} 
                      alt={athlete.name}
                      className="w-full h-full object-cover"
                    />
                    {athlete.verified && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Verified
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{athlete.name}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Star className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{athlete.sport}</span>
                      <span className="font-medium">{athlete.position}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{athlete.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-1" />
                      <span>GPA: {athlete.gpa}</span>
                    </div>
                    <div className="bg-gray-100 rounded-md px-2 py-1 text-xs">
                      {athlete.highlights} highlight videos
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View Profile</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              mockColleges.map(college => (
                <Card key={college.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={college.image} 
                      alt={college.name}
                      className="w-full h-full object-cover"
                    />
                    {college.hasScholarships && (
                      <div className="absolute top-2 right-2 bg-highlyt-blue text-white text-xs px-2 py-1 rounded-full">
                        Scholarships Available
                      </div>
                    )}
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center">
                      <span>{college.name}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Star className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{college.location}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {college.division}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {college.sports.slice(0, 3).map((sport, idx) => (
                        <span key={idx} className="bg-gray-100 rounded-md px-2 py-1 text-xs">
                          {sport}
                        </span>
                      ))}
                      {college.sports.length > 3 && (
                        <span className="bg-gray-100 rounded-md px-2 py-1 text-xs">
                          +{college.sports.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="text-highlyt-blue text-sm font-medium">
                      {college.openPositions} open positions
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">View College</Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
