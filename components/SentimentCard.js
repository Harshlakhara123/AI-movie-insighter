"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote, ThumbsUp, ThumbsDown, Minus } from "lucide-react";

export function SentimentCard({ sentiment }) {
    if (!sentiment) return null;

    const { summary, classification } = sentiment;

    const config = {
        positive: {
            color: "from-emerald-500 to-teal-500",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            icon: <ThumbsUp className="text-emerald-400" size={24} />,
            label: "Positive"
        },
        negative: {
            color: "from-rose-500 to-red-500",
            bg: "bg-rose-500/10",
            border: "border-rose-500/20",
            icon: <ThumbsDown className="text-rose-400" size={24} />,
            label: "Negative"
        },
        mixed: {
            color: "from-amber-500 to-orange-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            icon: <Minus className="text-amber-400" size={24} />,
            label: "Mixed"
        }
    };

    const style = config[classification?.toLowerCase()] || config.mixed;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className={`glass-panel rounded-3xl p-6 md:p-8 mt-6 border-l-4 border-l-transparent relative overflow-hidden`}
        >
            {/* Subtle accent border on the left */}
            <div className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${style.color}`}></div>

            <div className="flex flex-col md:flex-row md:items-start gap-6">

                {/* Badge Area */}
                <div className="shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-white/5 min-w-[160px]">
                    <div className={`p-4 rounded-full ${style.bg} ${style.border} border mb-3`}>
                        {style.icon}
                    </div>
                    <span className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${style.color}`}>
                        {style.label}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 uppercase tracking-wider font-semibold">Overall Sentiment</span>
                </div>

                {/* Summary Area */}
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white/90 flex items-center gap-2 mb-4">
                        <MessageSquareQuote size={20} className="text-blue-400" />
                        AI Audience Insight
                    </h3>
                    <p className="text-gray-300 leading-relaxed md:text-lg">
                        &quot;{summary}&quot;
                    </p>
                </div>

            </div>
        </motion.div>
    );
}
