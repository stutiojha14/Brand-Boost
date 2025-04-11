# Brand-Boost AI Ads

## Overview

Brand-Boost AI Ads is an advanced AI-powered platform that helps businesses create high-quality, brand-consistent advertising content across multiple platforms. The system leverages state-of-the-art AI models to generate creative content, including text, images, audio, and video.

## Features

- **AI-Powered Content Generation**
  - Text ads with brand voice adaptation
  - Custom image generation
  - Professional voiceovers
  - Video content creation

- **Multi-Platform Support**
  - Social media ads
  - Search ads
  - Display ads
  - Email marketing
  - Website content

- **Brand Consistency**
  - Maintains brand voice and tone
  - Style matching
  - Platform-specific optimization
  - Creativity level control

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Shadcn UI** components
- **Tailwind CSS** for styling
- **React Query** for data management
- **Sonner** for notifications
- **Lucide React** icons
- **Vite** for build tooling

### Backend(Will be use for data management and Publish API's)
- **Node.js** runtime
- **Express.js** API framework
- **TypeScript** for type safety
- **PostgreSQL** database
- **Redis** caching

### AI Services
- **GPT-4** for text generation
- **Stable Diffusion** for images
- **ElevenLabs** for voice
- **D-ID** for video

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL
- Redis
- OpenAI API key
- ElevenLabs API key
- D-ID API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stutiojha14/Brand-Boost
cd brand-boost-ai-ads-main
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file with the following variables:
```
NODE_ENV=development
PORT=3000
DATABASE_URL=your_postgres_url
REDIS_URL=your_redis_url
OPENAI_API_KEY=your_openai_key
ELEVENLABS_API_KEY=your_elevenlabs_key
DID_API_KEY=your_did_key
```

4. Run the development server:
```bash
npm run dev
```

The development server will run on `http://localhost:8080` (configured in vite.config.ts)

## Build Configuration

The project uses Vite for build configuration with the following settings:

```typescript
// vite.config.ts
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // Enable IPv6 support
    port: 8080, // Development server port
  },
  plugins: [
    react(), // React plugin with SWC for faster compilation
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Path alias for src directory
    },
  },
}));
```

## Usage

1. **Create New Ad**
   - Navigate to the Create page
   - Enter brand details
   - Select platform and tone
   - Generate content

2. **Image Generation**
   - Describe desired visuals
   - Select style
   - Upload reference images
   - Generate custom images

3. **Audio Generation**
   - Write script
   - Choose voice type
   - Select background music
   - Generate professional voiceovers

4. **Video Generation**
   - Describe concept
   - Choose style
   - Set video length
   - Generate video content

## Development Commands

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint
- `npm run format`: Format code

## Architecture

### Frontend Architecture
- Modern React components
- Responsive design
- Real-time updates
- User-friendly interface

### Backend Architecture
- RESTful API endpoints
- Caching layer
- Database integration
- Authentication

### AI Services Architecture
- Modular service layer
- Model integration
- Error handling
- Performance optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please:
- Check the documentation
- Open an issue
- Contact support@brandboost.ai

## Security

If you discover any security issues, please:
- Do not open a public issue
- Email security@brandboost.ai
- Follow responsible disclosure guidelines

## Acknowledgments

- OpenAI for GPT-4
- Stability AI for Stable Diffusion
- ElevenLabs for voice generation
- D-ID for video synthesis
- Vite for fast build system