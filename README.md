# AI Movie Insight Builder

A modern, full-stack Next.js web application that takes an IMDb Movie ID and displays detailed movie information along with an AI-generated summary of audience sentiment.

![AI Movie Insight Builder](https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/film.svg)

## Features

- **Movie Details**: Fetches title, poster, cast, and plot using the OMDb API.
- **AI Sentiment Analysis**: Uses the Gemini API (`@google/genai`) to generate a concise historical audience sentiment summary based on the movie data and returns an overall label (Positive / Negative / Mixed).
- **Modern UI**: Designed with Tailwind CSS and Framer Motion for smooth, premium glassmorphism layouts and animations.
- **Robust Error Handling**: Handles inline and API errors gracefully.

## Tech Stack

- **Frontend**: Next.js (React.js, App Router), Tailwind CSS, Framer Motion, Lucide React (Icons).
- **Backend**: Next.js API Routes (`/api/movie`), Node.js.
- **Data APIs**: 
  - [OMDb API](http://www.omdbapi.com/) for movie metadata.
  - [Google Gemini API](https://aistudio.google.com/) for sentiment analysis.
- **Testing**: Jest testing framework for utility validation functions.

## Assumptions Made
- The IMDb ID follows the standard format (e.g., `tt0133093`).
- If the Gemini API fails, the app falls back gracefully to display the movie details without sentiment, or uses a fallback "mixed" message to avoid breaking the core UI flow.

## Prerequisites

You need the following API keys to run the project locally:
1. `OMDB_API_KEY`
2. `GOOGLEAI_API_KEY`

## Setup Instructions

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd movie-insights
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   OMDB_API_KEY="your_omdb_key"
   GOOGLEAI_API_KEY="your_google_gemini_key"
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Testing

Run the included Jest unit tests (tests validate the IMDb ID format):
```bash
npm run test
```
(Note: we've aliased `npx jest` if using direct local configuration)

## Deployment Instructions (Vercel)

This project is built directly on Next.js, meaning it is optimized for Vercel deployment.

1. Create a GitHub/GitLab/Bitbucket repository and push your code.
2. Log in to [Vercel](https://vercel.com/) and click **Add New** -> **Project**.
3. Import your Git repository.
4. **Environment Variables**: During the deployment configuration step, ensure you add the two API keys in the Vercel Dashboard Environment Variables section:
   - `OMDB_API_KEY`
   - `GOOGLEAI_API_KEY`
5. Click **Deploy**.

Vercel will automatically build the Next.js application and provide a live production URL.
