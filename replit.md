# CodePilot_AI IDE - Authentication System

## Overview
A modern IDE-style login and signup system with a stunning dark theme, neon blue accents, and glassmorphism effects. Built with React, TypeScript, Tailwind CSS, and Express.

## Current State
The application is a fully functional authentication system with:
- Beautiful split-screen login page (IDE-inspired design)
- User registration and login with password hashing
- Session management
- Protected dashboard page
- Responsive design for all screen sizes

## Recent Changes (October 23, 2025)
- Implemented IDE-style split-screen login page with glassmorphism effects
- Added animated background blobs and floating particles
- Created authentication backend with bcrypt password hashing
- Implemented session-based authentication
- Built protected dashboard showing user information
- Added comprehensive error handling and toast notifications

## User Preferences
- Modern IDE aesthetic (VS Code inspired)
- Dark theme with neon blue accents (#3B82F6)
- Monospace fonts (JetBrains Mono primary, Fira Code fallback)
- Smooth animations and transitions
- Professional, developer-focused UI

## Project Architecture

### Frontend Structure
- **Pages:**
  - `/` - Login/Signup page with split-screen layout
  - `/dashboard` - Protected user dashboard
  
- **Components:**
  - Shadcn UI components (Button, Input, Card, etc.)
  - Custom animations (float, rise, pulse-glow, slide-in)
  
- **Styling:**
  - Tailwind CSS for utility-first styling
  - Custom CSS animations in `index.css`
  - Dark mode enabled by default

### Backend Structure
- **API Endpoints:**
  - `POST /api/auth/login` - User login
  - `POST /api/auth/signup` - User registration
  - `POST /api/auth/logout` - User logout
  - `GET /api/auth/me` - Get current user
  
- **Authentication:**
  - bcrypt for password hashing (10 salt rounds)
  - Express sessions for state management
  - In-memory storage (MemStorage)

### Data Model
```typescript
User {
  id: string (UUID)
  email: string (unique)
  password: string (hashed)
  firstName: string | null
  lastName: string | null
  createdAt: Date
}
```

## Technical Decisions

### Why In-Memory Storage?
Currently using MemStorage as per development guidelines. Data persists only during server runtime.

### Why Session-Based Auth?
Simple, secure authentication that works well for this MVP. Sessions stored server-side with express-session.

### Design System
- **Colors:** Dark background (220 15% 8%), Primary blue (210 100% 60%)
- **Typography:** JetBrains Mono for code-like feel
- **Effects:** Glassmorphism, neon glows, floating animations
- **Spacing:** Consistent padding (12px, 20px, 40px)

## Key Features

### Login Page
- Split-screen layout (branding left, form right)
- Animated gradient background blobs
- Floating particle effects
- Glassmorphism form container with neon blue glow
- Login/Signup toggle with smooth transitions
- Password strength indicator (signup only)
- Form validation with Zod schemas
- Responsive design (mobile-first)

### Dashboard
- Welcome message with user name
- User profile information display
- Feature highlights
- Logout functionality
- Protected route (requires authentication)

## Dependencies
- **Frontend:** React, Wouter, TanStack Query, Tailwind CSS, Shadcn UI
- **Backend:** Express, bcryptjs, express-session
- **Validation:** Zod
- **TypeScript:** Full type safety across stack

## Running the Project
```bash
npm run dev
```
- Frontend: Served by Vite
- Backend: Express server
- Both run on same port via Vite proxy

## Next Steps (Future Enhancements)
1. **Backend Integration:**
   - Connect to PostgreSQL database
   - Implement password reset flow
   - Add email verification
   - Implement JWT tokens for API authentication

2. **OAuth Integration:**
   - Add GitHub OAuth
   - Add Google OAuth
   - Social login buttons on login page

3. **Enhanced Features:**
   - Animated code editor preview in left panel
   - Theme customizer (different neon colors)
   - Remember me functionality
   - Two-factor authentication
   - User profile editing

4. **Analytics & Monitoring:**
   - Track login/signup events
   - Monitor authentication failures
   - User activity logs

5. **Performance:**
   - Optimize animation performance
   - Add image optimization
   - Implement lazy loading
   - Service worker for offline support

## Security Notes
- Passwords hashed with bcrypt (10 rounds)
- Sessions use secure secret (SESSION_SECRET env var)
- Input validation on both client and server
- SQL injection prevention through parameterized queries (when DB is added)
- XSS protection via React's built-in escaping
