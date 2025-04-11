
// /**
//  * AI Generation Service
//  * Handles all communication with the AI generation API
//  */

export interface GenerationRequest {
  prompt: string;
  model?: string;
  type: "text" | "image" | "video" | "audio";
  parameters?: Record<string, string | number | boolean | object>;
}

export interface GenerationResponse {
  content: string;
  mediaUrl?: string;
  metadata?: Record<string, unknown>;
  success: boolean;
}

 const API_ENDPOINT = "http://20.84.98.16:3000/generate";
 const VISION_API_ENDPOINT = "http://20.84.98.16:3000/vision-generate";

// export async function generateContent(request: GenerationRequest,onChunk:any): Promise<GenerationResponse> {
//   try {
//     console.log("Generating content with request:", request);
    
//     const response = await fetch(API_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: request.prompt,

//         parameters: request.parameters || {}
//       }),
//     });

//     if (!response.ok) {
//       throw new Error(`API request failed with status ${response.status}`);
//     }

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder('utf-8');
//     let fullText = '';

//     while (true) {
//       const { done, value } = await reader.read();
     
//       if (done) break;

//       const chunk = decoder.decode(value, { stream: true });
//       console.log("test-",chunk)
//       fullText += chunk;

//       // Display it on screen incrementally
//       // document.getElementById('output').innerText += chunk;
//     }

//     const data = await response.json();
    
//     // For demo purposes - creating mock URLs if the API doesn't return them
//     // This should be removed once the real API is integrated
//     let mediaUrl = data.mediaUrl;
//     if (!mediaUrl && request.type !== "text") {
//       if (request.type === "image") {
//         mediaUrl = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=3474&auto=format&fit=crop";
//       } else if (request.type === "video") {
//         mediaUrl = "https://player.vimeo.com/external/552481870.hd.mp4?s=c312c8d5c675b22f1fa6b9ab20af41395e58b81f&profile_id=175&oauth2_token_id=57447761";
//       } else if (request.type === "audio") {
//         mediaUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
//       }
//     }

//     return {
//       content: data.content || "",
//       mediaUrl,
//       metadata: data.metadata,
//       success: true
//     };
//   } catch (error) {
//     console.error("AI generation failed:", error);
//     return {
//       content: "",
//       success: false
//     };
//   }
// }


export async function generateContent(
  request: GenerationRequest,
  onChunk: (chunk: string) => void
): Promise<GenerationResponse> {
  try {
    console.log("Generating content with request:", request);

    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: request.prompt,
        parameters: request.parameters || {},
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      fullText += chunk;

      if (onChunk) onChunk(JSON.parse(chunk)?.response); // send chunk to the consumer
    }

    // Optional: If your API sends final structured metadata at the end in headers or elsewhere,
    // you can retrieve it here.

    // Fake media URLs for demo purposes (to be replaced with actual API response logic)
    let mediaUrl: string | undefined;
    if (request.type !== "text") {
      if (request.type === "image") {
        mediaUrl =
          "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=3474&auto=format&fit=crop";
      } else if (request.type === "video") {
        mediaUrl =
          "https://player.vimeo.com/external/552481870.hd.mp4?s=c312c8d5c675b22f1fa6b9ab20af41395e58b81f&profile_id=175&oauth2_token_id=57447761";
      } else if (request.type === "audio") {
        mediaUrl =
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      }
    }

    return {
      content: fullText,
      mediaUrl,
      metadata: {},
      success: true,
    };
  } catch (error) {
    console.error("AI generation failed:", error);
    return {
      content: "",
      success: false,
    };
  }
}


// New function to generate content using the vision API
export async function generateVisionContent(prompt: string, base64Image: string): Promise<GenerationResponse> {
  try {
  console.log("Generating vision content with prompt:", prompt);
  
  const response = await fetch(VISION_API_ENDPOINT, {
  method: "POST",
  headers: {
  "Content-Type": "application/json",
  },
  body: JSON.stringify({
  prompt,
  base64: base64Image
  }),
  });
 
  if (!response.ok) {
  throw new Error(`Vision API request failed with status ${response.status}`);
  }
 
  const data = await response.json();
  
  return {
  content: data.content || "",
  mediaUrl: data.mediaUrl || data.imageUrl,
  metadata: data.metadata,
  success: true
  };
  } catch (error) {
  console.error("Vision generation failed:", error);
  return {
  content: "",
  success: false
  };
  }
 }
 
 // Function to convert file to base64
 export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
  if (typeof reader.result === 'string') {
  // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64String = reader.result.split(',')[1];
  resolve(base64String);
  } else {
  reject(new Error('Failed to convert file to base64'));
  }
  };
  reader.onerror = error => reject(error);
  });
 };