"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function SearchBar({ onSearch, isLoading }) {
    const [imdbId, setImdbId] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const trimmedId = imdbId.trim();
        if (!trimmedId) {
            setError("Please enter an IMDb ID.");
            return;
        }

        const imdbRegex = /^tt\d{7,8}$/;
        if (!imdbRegex.test(trimmedId)) {
            setError("Invalid format. Expected something like 'tt0133093'.");
            return;
        }

        onSearch(trimmedId);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl mx-auto mb-10"
        >
            <form onSubmit={handleSubmit} className="relative">
                <label htmlFor="search-input" className="sr-only">
                    Enter IMDb ID
                </label>
                <div className="relative flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                        <Search size={20} />
                    </div>
                    <input
                        id="search-input"
                        type="text"
                        className="block w-full pl-12 pr-32 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/10 transition-all duration-300 shadow-inner"
                        placeholder="Enter IMDb ID (e.g. tt0133093)"
                        value={imdbId}
                        onChange={(e) => setImdbId(e.target.value)}
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[100px]"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Analyze"
                        )}
                    </button>
                </div>
                {error && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute -bottom-6 left-4 text-red-400 text-sm mt-2"
                    >
                        {error}
                    </motion.p>
                )}
            </form>
        </motion.div>
    );
}
