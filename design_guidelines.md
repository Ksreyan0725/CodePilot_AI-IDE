# Design Guidelines: CodePilot_AI IDE Login Page

## Design Approach
**System-Based Approach**: Modern IDE aesthetic inspired by VS Code, Cursor, and similar developer tools. This is a utility-focused authentication interface with dark theme conventions and developer-centric visual language.

## Core Design Principles
- **Developer-First Aesthetics**: Clean, functional interface that feels like a professional code editor welcome screen
- **Glass Morphism + Neon Accents**: Maintain existing frosted glass effects enhanced with subtle neon blue glows
- **Split-Screen Layout**: Clear information hierarchy with branded content on left, functional login on right
- **Minimalist Sophistication**: No unnecessary decoration; every element serves a purpose

## Color Palette

### Dark Mode (Primary)
- **Background**: Deep charcoal/near-black (220 15% 8%) - similar to VS Code dark theme
- **Surface**: Elevated surfaces (220 15% 12%)
- **Primary Accent**: Neon blue (210 100% 60%) - for highlights, CTAs, and interactive elements
- **Secondary Accent**: Electric cyan (190 95% 55%) - for secondary emphasis
- **Glass Overlay**: White with 15% opacity + 20px blur for glassmorphism effect
- **Borders**: White/blue at 20-30% opacity for subtle separation
- **Text Primary**: Pure white (0 0% 100%)
- **Text Secondary**: Muted white (0 0% 75%)

### Accent Applications
- Neon glow effects on form container and interactive elements
- Blue gradient overlays for hover states
- Pulsing blue animations for focus states

## Typography

### Font Families
- **Primary**: 'JetBrains Mono', monospace (via Google Fonts CDN)
- **Fallback**: 'Fira Code', 'Courier New', monospace
- **Load Strategy**: Only JetBrains Mono in regular (400) and semibold (600) weights

### Type Scale
- **Hero Title**: 2.5rem (40px), semibold, tracking tight
- **Tagline**: 1.25rem (20px), regular, text-secondary
- **Feature Points**: 1rem (16px), regular, line-height relaxed
- **Form Labels**: 0.875rem (14px), medium weight
- **Form Inputs**: 0.875rem (14px), regular
- **Buttons**: 1rem (16px), semibold
- **Footer Links**: 0.8125rem (13px), regular

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm

### Grid Structure
- **Desktop (lg:)**: Two-column grid (grid-cols-2), equal width split
- **Tablet (md:)**: Single column stack, info panel above form
- **Mobile**: Single column, reduced padding

### Containers
- **Outer Wrapper**: Full viewport height (min-h-screen), overflow hidden
- **Left Panel**: Flex column, justify center, px-12 lg:px-16, py-20
- **Right Panel**: Flex column, justify center, items center
- **Form Container**: Max-width 420px, px-10 py-12, rounded-3xl

### Positioning
- Background gradient blobs: Absolute positioning with blur(80px)
- Form container: Relative z-index above background
- Floating particles: Absolute, full viewport coverage

## Component Library

### Left Information Panel
- **Logo Section**: 60px icon with subtle pulse animation, company name below
- **Title**: Large monospace heading "CodePilot_AI IDE"
- **Tagline**: Subtitle with reduced opacity
- **Feature List**: Vertical stack with 6-unit spacing, each item with:
  - Icon or bullet point in neon blue
  - Feature text in white with 90% opacity
  - Consistent left alignment

### Right Login Form
- **Glass Container**:
  - Background: rgba(255, 255, 255, 0.15)
  - Backdrop-filter: blur(20px)
  - Border: 1px solid white at 30% opacity
  - Border-radius: 20px
  - Box-shadow: Layered shadows for depth + neon blue glow (0 0 60px rgba(66, 153, 225, 0.3))

### Form Elements
- **Input Fields**:
  - Background: rgba(255, 255, 255, 0.2)
  - Border: 1px solid white at 30% opacity
  - Padding: 15px (Tailwind: px-4 py-3.5)
  - Border-radius: 10px
  - Focus state: Neon blue border glow, subtle lift (translateY(-2px))
  
- **Submit Button**:
  - Gradient background: Linear blue gradient (210 100% 60% → 220 85% 50%)
  - Full width, py-3.5, rounded-lg
  - Neon blue box-shadow on hover
  - Shine effect animation on hover (optional subtle enhancement)

- **Toggle Button** (Login/Signup switch):
  - Transparent background
  - Border: 2px solid white at 50% opacity
  - Hover: Filled with white at 20% opacity

### Background Elements
- **Gradient Blobs**: 3 floating shapes in purple, pink, and cyan gradients with 20s float animation
- **Particles**: Small white dots (4px) rising from bottom with 10-15s duration, randomized positions

## Responsive Behavior

### Breakpoints
- **Mobile** (< 768px): Stack layout, reduce padding to px-6, form width 100%
- **Tablet** (768px - 1024px): Begin split layout, smaller font sizes
- **Desktop** (> 1024px): Full split-screen, optimal spacing

### Adaptations
- Left panel: Hidden on mobile, revealed at md: breakpoint
- Form container: Full width mobile, constrained desktop
- Font sizes: Scale down 15-20% on mobile
- Spacing: Reduce by 25-30% on smaller screens

## Animations & Interactions

### Subtle Enhancements Only
- **Float animation** for background blobs: Gentle 20s loop
- **Pulse effect** on logo: 2s ease-in-out
- **Form transitions**: 0.5s slide/fade when switching login/signup
- **Input focus**: 0.3s transition for border and lift effect
- **Button hover**: 0.3s transform and shadow enhancement
- **Particle rise**: Linear infinite animation

**No excessive animations** - maintain IDE-like professionalism

## Images
Not applicable - this is a functional authentication page. Visual interest comes from glassmorphism, gradients, and neon accents rather than imagery.

## Critical Implementation Notes
- Maintain existing login/signup toggle functionality
- Preserve glassmorphism effects from original design
- Ensure all interactive elements have clear focus states for accessibility
- Test form functionality thoroughly across breakpoints
- Background blobs should be positioned absolutely outside viewport edges with overflow hidden on parent