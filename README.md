# Reveria - Movie Explorer App

Reveria is a React.js-based Movie App that uses Appwrite for backend services and TailwindCSS for styling. Users can browse trending movies, search titles, and explore content fetched from the TMDB API. The app features a responsive layout and reusable components for easy extension and maintenance.

---

## Table of Contents
- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Assets](#assets)
- [Deployment](#deployment)
- [Extending the App](#extending-the-app)

---

## Introduction

This Movie App lets users:

- Browse trending movies
- Search for specific movie titles
- View movies with a dynamic trending algorithm

The design is modern, responsive, and optimized for user experience. Missing movie posters are handled gracefully with a default placeholder.

---

## Tech Stack

- **React.js** – For building reusable UI components and managing frontend state
- **Appwrite** – Backend-as-a-Service for authentication, database, and storage
- **React-use** – Collection of hooks for state, effects, and lifecycle handling
- **Tailwind CSS** – Utility-first framework for rapid, responsive UI development
- **Vite** – Modern frontend build tool with hot module replacement (HMR) and optimized production builds
- **TMDB API** – Source for movie data and posters

---

## Features

- Browse all movies in a clean, grid layout
- Search movies by title with debounced input
- Trending movies section based on dynamic user activity
- Modern, responsive UI/UX
- Reusable components for scalable architecture
- Handles missing movie posters with a default image
- Integration with Appwrite for tracking search activity

---

## Quick Start

### Prerequisites

- Git
- Node.js
- npm (Node Package Manager)

### Clone the Repository

```bash
git clone https://github.com/Mahesh-git888/Reveria.git
cd Reveria
nstall Dependencies
npm install

Set Up Environment Variables

Create a .env.local file in the root directory:

VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id


Replace the placeholders with your actual TMDB API key and Appwrite credentials.

Run the Project Locally
npm run dev


Open http://localhost:5173
 in your browser to view the app.

Project Structure
Reveria/
├── public/
│   ├── BG.png
│   ├── No-Poster.png
│   └── hero.png
├── src/
│   ├── components/
│   │   ├── Search.jsx
│   │   ├── Spinner.jsx
│   │   └── MovieCard.jsx
│   ├── appwrite.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── .env.local


public/ – Static assets like images

src/components/ – Reusable React components

appwrite.js – Appwrite client and API functions

App.jsx – Main app component

main.jsx – React entry point

Assets

Stored in the public/ folder:

BG.png – Background image (optional)

No-Poster.png – Default poster for missing movies

hero.png – Header banner image

Deployment

Push your project to GitHub:

git add .
git commit -m "Initial commit"
git push origin main


Go to Vercel
 and import your GitHub repository.

Set the environment variables in Vercel (same as .env.local).

Set the framework preset to Vite and build command to:

npm run build


Set the output directory to:

dist


Deploy the project. Your app will be live on the provided Vercel URL.

Extending the App

Add user authentication with Appwrite for personalized experience.

Implement advanced filtering and sorting of movies.

Use server-side rendering (SSR) with Next.js for SEO optimization.
