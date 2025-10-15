# Reveria - A Modern Movie Discovery App

Reveria is a sleek and responsive movie exploration application built with React.js, Vite, and Tailwind CSS. It leverages the TMDB API to provide a rich movie browsing experience and uses Appwrite to power a dynamic trending movies section based on user search activity. The app features an optimized, debounced search for a smooth and efficient user experience.

### [View the Live Demo](https://reveria-7c41.vercel.app/)

![Reveria App Screenshot](https://i.imgur.com/uG9X1hC.png)

---

## Table of Contents

-   [Introduction](#introduction)
-   [Tech Stack](#tech-stack)
-   [Features](#features)
-   [Quick Start](#quick-start)
-   [Project Structure](#project-structure)
-   [Deployment](#deployment)

---

## Introduction

This application was built to provide a modern and seamless interface for discovering movies. Users can search for any movie and get instant, detailed results, or see what's currently trending among other users. The backend logic for trending movies is handled by Appwrite, which tracks and ranks search terms.

---

## Tech Stack

-   **React.js**: A JavaScript library for building dynamic and component-based user interfaces.
-   **Vite**: A next-generation frontend build tool that provides a faster and leaner development experience.
-   **Tailwind CSS**: A utility-first CSS framework for rapidly building custom, responsive designs.
-   **Appwrite**: An open-source Backend-as-a-Service (BaaS) used here to track search queries and generate a list of trending movies.
-   **TMDB API**: The Movie Database (TMDB) is used as the primary source for all movie data, including posters, ratings, and release information.
-   **React-use**: A collection of essential React hooks for simplifying state and lifecycle management.

---

## Features

-   **Robust Movie Search**: Find movies by title with a flexible search that returns relevant results instantly.
-   **Detailed Movie Information**: View high-quality posters, ratings, release year, and original language for each movie.
-   **Dynamic Trending Section**: Discover what's popular! The trending list is dynamically generated based on the most searched terms, powered by Appwrite.
-   **Optimized Search Experience**: Features a **0.5-second debounce** on the search input to prevent excessive API calls and ensure a smooth user experience.
-   **Fully Responsive Design**: A mobile-first approach ensures the app looks and works great on all devices, from phones to desktops.
-   **Graceful Poster Handling**: Displays a default placeholder image if a movie poster is missing, maintaining a clean UI.
-   **Reusable Component Architecture**: Built with a clean, component-based structure for easy maintenance and scalability.

---

## Quick Start

Follow these steps to set up and run the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/) (Node Package Manager)

### 1. Clone the Repository

```bash
git clone [https://github.com/Mahesh-git888/Reveria.git](https://github.com/Mahesh-git888/Reveria.git)
cd Reveria

2. Install Dependencies
Install the project dependencies using npm:

Bash

npm install
3. Set Up Environment Variables
Create a new file named .env.local in the root of your project and add your API keys and Appwrite credentials:

Code snippet

VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
4. Run the Project
Start the development server:

Bash

npm run dev
Open http://localhost:5173 in your browser to view the project.

Project Structure
Reveria/
├── public/
│   ├── No-Poster.png      # Default poster for missing images
│   └── ...
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Search.jsx
│   │   ├── Spinner.jsx
│   │   └── MovieCard.jsx
│   ├── appwrite.js        # Appwrite client setup and API functions
│   ├── App.jsx            # Main application component
│   └── main.jsx           # React entry point
├── .env.local             # Environment variables (ignored by git)
├── package.json
└── vite.config.js
Deployment
This project can be easily deployed using a platform like Vercel.

Push your project to a GitHub repository.

Go to your Vercel dashboard and import the repository.

Set the Environment Variables in the Vercel project settings (the same keys and values from your .env.local file).

Vercel will automatically detect that it is a Vite project. Set the build command to npm run build and the output directory to dist.

Deploy! Your application will be live.
