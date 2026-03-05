"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { SentimentCard } from "@/components/SentimentCard";
import { Film } from "lucide-react";

export default function Home() {
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (imdbId) => {
    setIsLoading(true);
    setError("");
    setMovieData(null);

    try {
      const response = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imdbId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch data");
      }

      setMovieData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen gradient-bg text-white selection:bg-purple-500/30">
      <div className="container mx-auto px-4 py-12 md:py-20 lg:max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 glass-panel rounded-2xl mb-6 shadow-2xl border border-white/10">
            <Film className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            AI Movie Insight {" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
              Builder
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Enter an IMDb ID to uncover deep audience sentiment analysis powered by Gemini AI and TMDB reviews.
          </p>
        </motion.div>

        {/* Search */}
        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {/* Global Error Display */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto bg-red-900/30 border border-red-500/30 text-rose-200 px-6 py-4 rounded-xl mb-8 flex items-center gap-3 shadow-lg"
            >
              <span className="shrink-0 bg-red-500/20 p-2 rounded-full text-red-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              </span>
              <div>
                <h4 className="font-semibold text-red-300">Analysis Failed</h4>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Area */}
        <AnimatePresence mode="wait">
          {movieData && !isLoading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <MovieCard movie={movieData} />
              <SentimentCard sentiment={movieData.sentiment} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
