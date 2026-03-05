"use client";

import { motion } from "framer-motion";
import { Star, Calendar, Users } from "lucide-react";

export function MovieCard({ movie }) {
    if (!movie) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="glass-panel rounded-3xl overflow-hidden w-full mx-auto"
        >
            <div className="flex flex-col md:flex-row">
                {/* Poster */}
                <div className="md:w-1/3 shrink-0 relative p-4 h-full flex items-center justify-center">
                    {movie.poster && movie.poster !== "N/A" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={movie.poster}
                            alt={`${movie.title} Poster`}
                            className="w-full h-auto object-cover rounded-2xl shadow-xl border border-white/5"
                        />
                    ) : (
                        <div className="w-full aspect-[2/3] bg-gray-800 rounded-2xl flex items-center justify-center shadow-xl border border-white/5">
                            <span className="text-gray-500 font-medium">No Poster Available</span>
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-2">
                        {movie.title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300 mb-6 font-medium">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <Calendar size={14} className="text-indigo-400" />
                            {movie.year}
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <Star size={14} className="text-yellow-400" />
                            {movie.rating} / 10
                        </span>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-white/90 flex items-center gap-2 mb-2">
                            <Users size={16} className="text-purple-400" /> Cast
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {movie.cast}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white/90 mb-2">Plot</h3>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                            {movie.plot}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
