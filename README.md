# Sachin Sharma - DevOps Portfolio

A modern, futuristic portfolio website for a DevOps enthusiast, featuring 3D elements, glassmorphism, and smooth animations.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js & React Three Fiber (@react-three/drei)
- **Icons**: Lucide React
- **Typography effects**: React Simple Typewriter

## Getting Started

### Prerequisites
Make sure you have Node.js (v18.17.0 or higher) installed on your machine.

### Installation

1. Clone or download the repository to your local machine.
2. Navigate into the project directory:
   ```bash
   cd portfolio
   ```
3. Install the dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   *Note: `--legacy-peer-deps` is recommended to avoid any peer dependency warnings between React 18, Three.js, and Framer Motion.*

### Running the Project

Start the local development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production
To build the app for production use:
```bash
npm run build
```
Then you can preview the production build via:
```bash
npm run start
```

## Features Included
- **Dark Futuristic Theme**: Custom neon colors and deep blacks.
- **Glassmorphism**: Elegant translucent UI cards and sticky navigation.
- **Interactive 3D Canvas**: A rotating, distorting sphere using Three.js in the hero section.
- **Micro-Animations**: Custom cursor, hover effects, typewriting text, and scroll-activated animations using Framer Motion.
- **Responsive**: Fully responsive design tailored for mobile, tablet, and desktop views.
