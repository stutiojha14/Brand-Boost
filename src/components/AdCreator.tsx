import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { 
  Loader2, Image, Type, Layout, Wand2, 
  VideoIcon, MicIcon, Volume2, Globe, ZapIcon, CirclePlay,
  Share2, Download, Send, Lightbulb, Save, FilePlus2, FileCheck
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import MediaPreview from "@/components/MediaPreview";
import { generateContent, GenerationRequest,fileToBase64 } from "@/services/aiGenerationService";
import { GoogleGenAI } from "@google/genai"; // Adjust the import path as needed

// Ad state interfaces
interface AdFields {
  brand: string;
  product: string;
  tone: string;
  platform: string;
  creativityLevel: number;
  imagePrompt: string;
  imageStyle: string;
  audioScript: string;
  voiceType: string;
  audioBackground: string;
  videoConcept: string;
  videoStyle: string;
  videoLength: string;
}

interface AdState {
  id?: string;
  name: string;
  status: "draft" | "published" | "scheduled";
  fields: AdFields;
  generatedContent?: string;
  generatedMedia?: {
    type: "image" | "video" | "audio";
    url: string;
  };
  insights?: {
    engagement: number;
    clickThrough: number;
    sentiment: string;
    suggestions: string[];
  };
  createdAt: string;
  updatedAt: string;
}

const initialAdState: AdState = {
  name: "Untitled Ad",
  status: "draft",
  fields: {
    brand: "",
    product: "",
    tone: "professional",
    platform: "social",
    creativityLevel: 65,
    imagePrompt: "",
    imageStyle: "photorealistic",
    audioScript: "",
    voiceType: "professional",
    audioBackground: "none",
    videoConcept: "",
    videoStyle: "modern",
    videoLength: "30"
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

const AdCreator = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatingMedia, setGeneratingMedia] = useState(false);
  const [activeTab, setActiveTab] = useState("text");
  const [generatedText, setGeneratedText] = useState('');
  const [adState, setAdState] = useState<AdState>(initialAdState);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [textResponse, setTextResponse] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePrompt, setImagePrompt] = useState("");
  const [imgBase64, setimgBase64] = useState("");


const handleGenerateImage = async () => {
console.log('qqqqqq=====',adState.fields.imagePrompt,imgBase64,file);
const ai = new GoogleGenAI({ apiKey: 'API_KEY'}) 

const contents = [{
  role:"user",
  parts:[{
     text:adState.fields.imagePrompt},...(imgBase64?[{inlineData:{mimeType:file.type,data:imgBase64}}]:[]),
  ]
}]




const response = await ai.models.generateContent({
model: "gemini-2.0-flash-exp-image-generation",
contents,
config: {
responseModalities: ["Text", "Image"],
},
});

const parts = response.candidates?.[0]?.content?.parts || [];

parts.forEach((part) => {
if (part.text) {
setTextResponse(part.text);
} else if (part.inlineData) {
const base64Image = part.inlineData.data;
const imageBlobUrl = `data:image/png;base64,${base64Image}`;
setAdState(prev => ({
  ...prev,
  generatedMedia: {
  type:"image",
  url: imageBlobUrl
  },
  updatedAt: new Date().toISOString()
  }))
console.log(adState.fields.imagePrompt);
setImageUrl(imageBlobUrl);
}
});
}
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      fileToBase64(selectedFile).then((base64) => {
        
        setimgBase64(base64)
         toast({
        title: "File Selected",
        description: `Selected file: ${selectedFile.name}`,
      });
      })
      // Here you would typically process the file (e.g., upload to server)
      // toast({
      //   title: "File Selected",
      //   description: `Selected file: ${selectedFile.name}`,
      // });
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
      toast({
        title: "File Dropped",
        description: `Dropped file: ${files[0].name}`,
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  // Save status handling
  useEffect(() => {
    const timer = setTimeout(() => {
      if (saveStatus === "saving") {
        setSaveStatus("saved");
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [saveStatus]);

  // Update field values
  const updateField = (field: keyof AdFields, value: string | number) => {
    setAdState(prev => ({
      ...prev,
      fields: {
        ...prev.fields,
        [field]: value
      },
      updatedAt: new Date().toISOString()
    }));
    setSaveStatus("unsaved");
  };

  // Generate content using the AI service
  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedText('')
    
    try {
      const request: GenerationRequest = {
        prompt: `Create advertising content for ${adState.fields.brand} about ${adState.fields.product}. 
                The tone should be ${adState.fields.tone} and it's for ${adState.fields.platform}.`,
        type: "text",
        parameters: {
          creativityLevel: adState.fields.creativityLevel / 100
        }
      };
      
      const response = await generateContent(request, (chunk) => {
        // console.log("chunk-", chunk);
        setGeneratedText((prev) => prev + chunk); // update UI in real-time
      });
      
      if (response.success) {
        setAdState(prev => ({
          ...prev,
          generatedContent: response.content["response"],
          insights: {
            engagement: Math.floor(Math.random() * 30) + 60, // Simulated values
            clickThrough: Math.floor(Math.random() * 8) + 2,
            sentiment: Math.random() > 0.7 ? "Neutral" : "Positive",
            suggestions: [
              "Add more specificity about your product features",
              "Consider including a customer testimonial",
              "Try a more action-oriented call to action"
            ]
          },
          updatedAt: new Date().toISOString()
        }));
        
        toast({
          title: "Content Generated Successfully",
          description: "Your ad content has been generated based on your inputs.",
        });
      } else {
        throw new Error("Failed to generate content");
      }
    } catch (error) {
      console.error("Generation error:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setSaveStatus("unsaved");
    }
  };

  // Generate media using the AI service
  const handleMediaGenerate = async (type: "image" | "video" | "audio") => {
    setGeneratingMedia(true);
    
    try {
      let prompt = "";
      let parameters: Record<string, string | number> = {};
      
      if (type === "image") {
        prompt = adState.fields.imagePrompt;
        parameters = { style: adState.fields.imageStyle };
      } else if (type === "audio") {
        prompt = adState.fields.audioScript;
        parameters = { voiceType: adState.fields.voiceType, background: adState.fields.audioBackground };
      } else if (type === "video") {
        prompt = adState.fields.videoConcept;
        parameters = { style: adState.fields.videoStyle, length: parseInt(adState.fields.videoLength) };
      }
      
      const request: GenerationRequest = {
        prompt,
        type,
        parameters
      };
      
      const response = await generateContent(request,(chunk) => {
        console.log("test2-",chunk)
        setGeneratedText((prev) => prev + chunk); // update UI in real-time
      });
      
      if (response.success && response.mediaUrl) {
        setAdState(prev => ({
          ...prev,
          generatedMedia: {
            type,
            url: response.mediaUrl!
          },
          updatedAt: new Date().toISOString()
        }));
        
        toast({
          title: `${type.charAt(0).toUpperCase() + type.slice(1)} Generated`,
          description: `Your AI-generated ${type} is ready to preview.`,
        });
      } else {
        throw new Error(`Failed to generate ${type}`);
      }
    } catch (error) {
      console.error(`${type} generation error:`, error);
      toast({
        title: "Generation Failed",
        description: `There was an error generating your ${type}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setGeneratingMedia(false);
      setSaveStatus("unsaved");
    }
  };

  // Save ad as draft
  const handleSaveDraft = () => {
    setSaveStatus("saving");
    
    // Simulating save to backend
    setTimeout(() => {
      setAdState(prev => ({
        ...prev,
        status: "draft",
        id: prev.id || `ad-${Date.now()}`,
        updatedAt: new Date().toISOString()
      }));
      
      toast({
        title: "Draft Saved",
        description: "Your ad has been saved as a draft."
      });
    }, 800);
  };

  // Publish the ad
  const handlePublish = () => {
    setLoading(true);
    
    // Simulating publish to backend
    setTimeout(() => {
      setAdState(prev => ({
        ...prev,
        status: "published",
        id: prev.id || `ad-${Date.now()}`,
        updatedAt: new Date().toISOString()
      }));
      
      setLoading(false);
      setSaveStatus("saved");
      
      toast({
        title: "Advertisement Published!",
        description: "Your ad has been published and is now live.",
        variant: "default",
      });
    }, 1500);
  };

  // Apply AI refinements to the content
  const handleRefinement = async() => {
    setLoading(true);
    
   try{
    const request: GenerationRequest = {
      prompt: `Refine the following ad content to make it more engaging and effective: ${generatedText}`,
      type: "text",
      parameters: {
        creativityLevel: adState.fields.creativityLevel / 100
      }
    };

    setGeneratedText('')
    
    const response = await generateContent(request, (chunk) => {
      // console.log("chunk-", chunk);
      setGeneratedText((prev) => prev + chunk); // update UI in real-time
    });
   
    setLoading(false);
    if (response.success) { 
      setLoading(false);
      toast({
        title: "Content Refined", 
        description: "Your ad content has been improved based on AI insights.",
      });
    }
    setLoading(false);
      
  

  }catch(error){
    setLoading(false);
         toast({
        title: "Content Refinement Failed",
        description: "There was an error refining your content. Please try again.",   
        variant: "destructive",
        
      });

    // Simulating API call
    // setTimeout(() => {
    //   setAdState(prev => ({
    //     ...prev,
    //     generatedContent: "Experience the power of innovation with our professional-grade solution. Engineered for those who refuse to compromise, our product consistently outperforms competitors. Take action today and transform your workflow with measurable results.",
    //     updatedAt: new Date().toISOString()
    //   }));
      
    //   setLoading(false);
    //   setSaveStatus("unsaved");
      
    //   toast({
    //     title: "Content Refined",
    //     description: "Your ad content has been improved based on AI insights.",
    //   });
    // }, 1000);
  };
}

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Create Brand-Perfect Ads</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate on-brand creative content in minutes, not days
          </p>
        </div>

        {/* Save status indicator */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Input 
              value={adState.name} 
              onChange={(e) => setAdState(prev => ({
                ...prev, 
                name: e.target.value,
                updatedAt: new Date().toISOString()
              }))}
              className="max-w-xs font-medium text-lg"
            />
            <Badge variant={adState.status === "published" ? "default" : "secondary"}>
              {adState.status === "published" ? "Published" : "Draft"}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {saveStatus === "saved" && <FileCheck className="h-4 w-4 text-green-500" />}
            {saveStatus === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
            {saveStatus === "unsaved" && <FilePlus2 className="h-4 w-4 text-amber-500" />}
            <span>
              {saveStatus === "saved" && "All changes saved"}
              {saveStatus === "saving" && "Saving..."}
              {saveStatus === "unsaved" && "Unsaved changes"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>AI Ad Generator</CardTitle>
                <CardDescription>
                  Create complete ad campaigns with text, image, audio, and video
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="text">
                      <Type className="h-4 w-4 mr-2" />
                      Text
                    </TabsTrigger>
                    <TabsTrigger value="image">
                      <Image className="h-4 w-4 mr-2" />
                      Image
                    </TabsTrigger>
                    <TabsTrigger value="audio">
                      <Volume2 className="h-4 w-4 mr-2" />
                      Audio
                    </TabsTrigger>
                    <TabsTrigger value="video">
                      <VideoIcon className="h-4 w-4 mr-2" />
                      Video
                    </TabsTrigger>
                    <TabsTrigger value="layout">
                      <Layout className="h-4 w-4 mr-2" />
                      Layout
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand Name</Label>
                      <Input 
                        id="brand" 
                        placeholder="Your brand name"
                        value={adState.fields.brand}
                        onChange={(e) => updateField("brand", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="product">Product Description</Label>
                      <Textarea 
                        id="product" 
                        placeholder="Describe your product or service in detail" 
                        className="min-h-[120px]"
                        value={adState.fields.product}
                        onChange={(e) => updateField("product", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tone">Tone of Voice</Label>
                      <Select 
                        value={adState.fields.tone}
                        onValueChange={(value) => updateField("tone", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                          <SelectItem value="authoritative">Authoritative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select 
                        value={adState.fields.platform}
                        onValueChange={(value) => updateField("platform", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="search">Search Ads</SelectItem>
                          <SelectItem value="display">Display Ads</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="website">Website</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="flex items-center justify-between">
                        <span>Creativity Level</span>
                        <span className="text-muted-foreground text-xs">Higher values produce more varied outputs</span>
                      </Label>
                      <Slider 
                        value={[adState.fields.creativityLevel]} 
                        onValueChange={(value) => updateField("creativityLevel", value[0])}
                        max={100} 
                        step={5} 
                        className="my-4" 
                      />
                    </div>
                    
                    <Button 
                      onClick={handleGenerate} 
                      disabled={loading} 
                      className="w-full"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate Ad Content
                        </>
                      )}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="image">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="image-prompt">Image Description</Label>
                        <Textarea 
                          id="image-prompt" 
                          placeholder="Describe the image you want to generate in detail..." 
                          className="min-h-[100px]"
                          value={adState.fields.imagePrompt}
                          onChange={(e) => updateField("imagePrompt", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="image-style">Style</Label>
                        <Select 
                          value={adState.fields.imageStyle}
                          onValueChange={(value) => updateField("imageStyle", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="photorealistic">Photorealistic</SelectItem>
                            <SelectItem value="illustration">Illustration</SelectItem>
                            <SelectItem value="3d">3D Render</SelectItem>
                            <SelectItem value="cartoon">Cartoon</SelectItem>
                            <SelectItem value="abstract">Abstract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Label className="mt-4 block">Or upload reference image</Label>
                      <div 
                        className={`text-center p-8 border-2 border-dashed rounded-md transition-all duration-200
                          ${isDragging ? 'border-primary bg-primary/10' : 'hover:border-primary hover:bg-primary/5'}`}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                      >
                        <Image className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                        <p className="text-muted-foreground mb-2">Drop your reference image or</p>
                        <input
                          type="file"
                          id="fileInput"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileSelect}
                        />
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => {
                          document.getElementById('fileInput')?.click();
                          // handleGenerateImage();
                          }}
                        >
                          Browse Files
                        </Button>
                      </div>
                      
                      <Button 
                        onClick={() => handleGenerateImage()}//handleMediaGenerate("image")} 
                        disabled={generatingMedia} 
                        className="w-full mt-4"
                      >
                        {generatingMedia && adState.generatedMedia?.type === "image" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            Generating Image...
                          </>
                        ) : (
                          <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Image
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="audio">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="voice-script">Audio Script</Label>
                        <Textarea 
                          id="voice-script" 
                          placeholder="Write the script for your audio ad..." 
                          className="min-h-[100px]"
                          value={adState.fields.audioScript}
                          onChange={(e) => updateField("audioScript", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="voice-type">Voice Type</Label>
                        <Select 
                          value={adState.fields.voiceType}
                          onValueChange={(value) => updateField("voiceType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select voice" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional Male</SelectItem>
                            <SelectItem value="casual">Professional Female</SelectItem>
                            <SelectItem value="friendly">Friendly Male</SelectItem>
                            <SelectItem value="warm">Friendly Female</SelectItem>
                            <SelectItem value="authoritative">Authoritative</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="audio-background">Background Music</Label>
                        <Select 
                          value={adState.fields.audioBackground}
                          onValueChange={(value) => updateField("audioBackground", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select music" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="upbeat">Upbeat</SelectItem>
                            <SelectItem value="relaxed">Relaxed</SelectItem>
                            <SelectItem value="inspirational">Inspirational</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        onClick={() => handleMediaGenerate("audio")} 
                        disabled={generatingMedia} 
                        className="w-full mt-4"
                      >
                        {generatingMedia && adState.generatedMedia?.type === "audio" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            Generating Audio...
                          </>
                        ) : (
                          <>
                            <MicIcon className="mr-2 h-4 w-4" />
                            Generate Audio
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="video">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="video-concept">Video Concept</Label>
                        <Textarea 
                          id="video-concept" 
                          placeholder="Describe your video concept in detail..." 
                          className="min-h-[100px]"
                          value={adState.fields.videoConcept}
                          onChange={(e) => updateField("videoConcept", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="video-style">Visual Style</Label>
                        <Select 
                          value={adState.fields.videoStyle}
                          onValueChange={(value) => updateField("videoStyle", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select style" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="cinematic">Cinematic</SelectItem>
                            <SelectItem value="corporate">Corporate</SelectItem>
                            <SelectItem value="animated">Animated</SelectItem>
                            <SelectItem value="minimalist">Minimalist</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="video-length">Video Length</Label>
                        <Select 
                          value={adState.fields.videoLength}
                          onValueChange={(value) => updateField("videoLength", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select length" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 seconds</SelectItem>
                            <SelectItem value="30">30 seconds</SelectItem>
                            <SelectItem value="60">60 seconds</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button 
                        onClick={() => handleMediaGenerate("video")} 
                        disabled={generatingMedia} 
                        className="w-full mt-4"
                      >
                        {generatingMedia && adState.generatedMedia?.type === "video" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                            Generating Video...
                          </>
                        ) : (
                          <>
                            <VideoIcon className="mr-2 h-4 w-4" />
                            Generate Video
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="layout">
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div 
                          key={item} 
                          className="aspect-video border rounded-md flex items-center justify-center cursor-pointer hover:border-primary"
                        >
                          <p className="text-muted-foreground">Layout {item}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Ad Preview</CardTitle>
                    <CardDescription>
                      Preview your AI-generated advertisement
                    </CardDescription>
                  </div>
                  {(adState.generatedContent || adState.generatedMedia) && (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      <CirclePlay className="w-3 h-3 mr-1" />
                      Live Preview
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col">
                {adState.generatedMedia?.url ? (
                  <div className="flex-grow">
                    <MediaPreview 
                      mediaUrl={adState.generatedMedia.url} 
                      mediaType={adState.generatedMedia.type}
                      title={adState.name}
                    />
                  </div>
                ) : (
                  <div className="bg-muted/30 rounded-md flex-grow min-h-[240px] p-6 flex items-center justify-center border">
                    {adState.generatedContent ? (
                      <div className="animate-fade-in">
                        <p className="text-lg">{adState.generatedContent}</p>
                      </div>
                    ) : (
                      // <p className="text-muted-foreground">
                        <div dangerouslySetInnerHTML={{__html:generatedText}}/>
                        
                        
                    // Your generated content will appear here</p>
                  
                    )} 
                  </div>
                )}

                {adState.insights && (
                  <div className="mt-4 border rounded-md p-4 bg-blue-50 dark:bg-blue-950/20">
                    <div className="flex items-center mb-2">
                      <Lightbulb className="text-blue-500 h-5 w-5 mr-2" />
                      <h4 className="text-sm font-semibold">AI Insights</h4>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                      <div className="p-2">
                        <div className="text-xl font-bold text-blue-600">{adState.insights.engagement}%</div>
                        <div className="text-xs text-muted-foreground">Est. Engagement</div>
                      </div>
                      <div className="p-2">
                        <div className="text-xl font-bold text-blue-600">{adState.insights.clickThrough}%</div>
                        <div className="text-xs text-muted-foreground">Est. CTR</div>
                      </div>
                      <div className="p-2">
                        <div className="text-xl font-bold text-blue-600">{adState.insights.sentiment}</div>
                        <div className="text-xs text-muted-foreground">Sentiment</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <button 
                        onClick={handleRefinement}
                        className="text-blue-600 text-xs hover:underline flex items-center mr-1 mb-2"
                      >
                        <ZapIcon className="h-3 w-3 mr-1" /> Apply AI refinements
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                {(adState.generatedContent || adState.generatedMedia) && (
                  <>
                    <Button 
                      className="w-full" 
                      onClick={handlePublish}
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Publish Campaign
                    </Button>
                    
                    <div className="flex gap-2 w-full">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleSaveDraft}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save Draft
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Globe className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full" >
                          <Wand2 className="w-4 h-4 mr-2" />
                          Customize & Refine
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Customize Your Ad</DialogTitle>
                          <DialogDescription>
                            Make adjustments to your generated advertisement
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-content">Edit Content</Label>
                            <Textarea 
                              id="edit-content"
                              defaultValue={adState.generatedContent}
                              className="min-h-[120px]"
                              onChange={(e) => {
                                setAdState(prev => ({
                                  ...prev,
                                  generatedContent: e.target.value,
                                  updatedAt: new Date().toISOString()
                                }));
                                setSaveStatus("unsaved");
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Tone Adjustment</Label>
                            <div className="grid grid-cols-3 gap-2">
                              <Button size="sm" variant="outline">More Formal</Button>
                              <Button size="sm" variant="outline">More Casual</Button>
                              <Button size="sm" variant="outline">More Persuasive</Button>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdCreator;
