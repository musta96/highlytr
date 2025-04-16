
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Youtube, Trash2, Edit, Play } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

interface HighlightVideo {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  videoUrl: string;
  source: 'upload' | 'youtube';
  uploadDate: string;
}

interface HighlightReelsProps {
  profile: any;
  isEditing: boolean;
  setProfile: (profile: any) => void;
}

const HighlightReels = ({ profile, isEditing, setProfile }: HighlightReelsProps) => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isYouTubeDialogOpen, setIsYouTubeDialogOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [isEditing2, setIsEditing2] = useState<string | null>(null);

  const handleDeleteHighlight = (id: string) => {
    const updatedHighlights = profile.highlights.filter((highlight: HighlightVideo) => highlight.id !== id);
    setProfile({ ...profile, highlights: updatedHighlights });
    toast.success('Highlight video removed');
  };

  const handleAddHighlight = (highlight: HighlightVideo) => {
    setProfile({
      ...profile,
      highlights: [...profile.highlights, highlight]
    });
    toast.success('Highlight video added');
  };

  const handleUpdateHighlight = (updatedHighlight: HighlightVideo) => {
    const updatedHighlights = profile.highlights.map((highlight: HighlightVideo) => 
      highlight.id === updatedHighlight.id ? updatedHighlight : highlight
    );
    setProfile({ ...profile, highlights: updatedHighlights });
    setIsEditing2(null);
    toast.success('Highlight video updated');
  };

  const handlePlayVideo = (id: string) => {
    setIsPlaying(id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Highlight Reels</span>
          {isEditing && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsUploadDialogOpen(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsYouTubeDialogOpen(true)}>
                <Youtube className="h-4 w-4 mr-2" />
                Link YouTube
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {profile.highlights.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No highlight reels added yet.</p>
            {isEditing && (
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <Button onClick={() => setIsUploadDialogOpen(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First Highlight
                </Button>
                <Button variant="outline" onClick={() => setIsYouTubeDialogOpen(true)}>
                  <Youtube className="h-4 w-4 mr-2" />
                  Add YouTube Link
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profile.highlights.map((highlight: HighlightVideo) => (
              <div key={highlight.id} className="group relative rounded-lg overflow-hidden">
                <img 
                  src={highlight.thumbnail} 
                  alt={highlight.title}
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h3 className="text-white font-medium">{highlight.title}</h3>
                  {highlight.description && (
                    <p className="text-white/80 text-sm line-clamp-2 mt-1">{highlight.description}</p>
                  )}
                  <div className="flex justify-between items-center mt-2">
                    <Button variant="default" size="sm" onClick={() => handlePlayVideo(highlight.id)}>
                      <Play className="h-3 w-3 mr-1" />
                      Watch
                    </Button>
                    {isEditing && (
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" onClick={() => setIsEditing2(highlight.id)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDeleteHighlight(highlight.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Upload Dialog */}
        <VideoUploadDialog 
          isOpen={isUploadDialogOpen} 
          onClose={() => setIsUploadDialogOpen(false)}
          onAddHighlight={handleAddHighlight}
        />

        {/* YouTube Link Dialog */}
        <YouTubeLinkDialog
          isOpen={isYouTubeDialogOpen}
          onClose={() => setIsYouTubeDialogOpen(false)}
          onAddHighlight={handleAddHighlight}
        />

        {/* Video Player Dialog */}
        <Dialog open={!!isPlaying} onOpenChange={() => setIsPlaying(null)}>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {isPlaying && profile.highlights.find((h: HighlightVideo) => h.id === isPlaying)?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="aspect-video">
              {isPlaying && (
                <VideoPlayer 
                  videoUrl={profile.highlights.find((h: HighlightVideo) => h.id === isPlaying)?.videoUrl}
                  source={profile.highlights.find((h: HighlightVideo) => h.id === isPlaying)?.source}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Highlight Dialog */}
        <EditHighlightDialog
          isOpen={!!isEditing2}
          highlight={isEditing2 ? profile.highlights.find((h: HighlightVideo) => h.id === isEditing2) : null}
          onClose={() => setIsEditing2(null)}
          onUpdateHighlight={handleUpdateHighlight}
        />
      </CardContent>
    </Card>
  );
};

// Video Upload Dialog Component
const VideoUploadDialog = ({ isOpen, onClose, onAddHighlight }: { 
  isOpen: boolean, 
  onClose: () => void,
  onAddHighlight: (highlight: HighlightVideo) => void 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setIsUploading(true);
    
    // Simulate file upload - In a real app, this would upload to a server/storage
    setTimeout(() => {
      const newHighlight: HighlightVideo = {
        id: crypto.randomUUID(),
        title,
        description,
        // Use a placeholder thumbnail - in a real app this would be generated from the video
        thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1470',
        videoUrl: URL.createObjectURL(file), // This is temporary and will not persist
        source: 'upload',
        uploadDate: new Date().toISOString()
      };
      
      onAddHighlight(newHighlight);
      setIsUploading(false);
      resetForm();
      onClose();
    }, 1500);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Highlight Video</DialogTitle>
          <DialogDescription>
            Upload a video highlighting your skills and performance.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Game Winner vs. Rivals"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happens in this highlight..."
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video">Video File</Label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              {file ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="bg-primary/10 text-primary rounded-full p-2">
                    <Upload className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setFile(null)}
                  >
                    Change File
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Input
                    id="video"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label htmlFor="video" className="cursor-pointer flex flex-col items-center gap-2">
                    <div className="bg-primary/10 text-primary rounded-full p-2">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-medium">Click to upload video</p>
                    <p className="text-xs text-muted-foreground">MP4, MOV, or WebM (Max 100MB)</p>
                  </Label>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!file || !title || isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// YouTube Link Dialog Component
const YouTubeLinkDialog = ({ isOpen, onClose, onAddHighlight }: {
  isOpen: boolean,
  onClose: () => void,
  onAddHighlight: (highlight: HighlightVideo) => void
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const extractYouTubeId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl || !title) return;

    const youtubeId = extractYouTubeId(youtubeUrl);
    if (!youtubeId) {
      toast.error('Invalid YouTube URL');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing the link
    setTimeout(() => {
      const newHighlight: HighlightVideo = {
        id: crypto.randomUUID(),
        title,
        description,
        thumbnail: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        videoUrl: `https://www.youtube.com/embed/${youtubeId}`,
        source: 'youtube',
        uploadDate: new Date().toISOString()
      };
      
      onAddHighlight(newHighlight);
      setIsProcessing(false);
      resetForm();
      onClose();
    }, 1000);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setYoutubeUrl('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Link YouTube Video</DialogTitle>
          <DialogDescription>
            Add a YouTube video showcasing your highlights.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="youtube-url">YouTube URL</Label>
            <Input 
              id="youtube-url"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="youtube-title">Title</Label>
            <Input 
              id="youtube-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Championship Game Highlights"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="youtube-description">Description (Optional)</Label>
            <Textarea 
              id="youtube-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what happens in this highlight..."
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!youtubeUrl || !title || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Add Video'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Edit Highlight Dialog Component
const EditHighlightDialog = ({ isOpen, highlight, onClose, onUpdateHighlight }: {
  isOpen: boolean,
  highlight: HighlightVideo | null,
  onClose: () => void,
  onUpdateHighlight: (highlight: HighlightVideo) => void
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Initialize form when highlight changes
  React.useEffect(() => {
    if (highlight) {
      setTitle(highlight.title);
      setDescription(highlight.description || '');
    }
  }, [highlight]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!highlight || !title) return;

    const updatedHighlight: HighlightVideo = {
      ...highlight,
      title,
      description
    };
    
    onUpdateHighlight(updatedHighlight);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Highlight</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title</Label>
            <Input 
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description (Optional)</Label>
            <Textarea 
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Video Player Component
const VideoPlayer = ({ videoUrl, source }: { videoUrl?: string, source?: 'upload' | 'youtube' }) => {
  if (!videoUrl) return null;

  if (source === 'youtube') {
    return (
      <iframe
        src={videoUrl}
        className="w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />
    );
  }

  return (
    <video
      src={videoUrl}
      controls
      className="w-full h-full"
    />
  );
};

export default HighlightReels;
