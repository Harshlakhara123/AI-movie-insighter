import { NextResponse } from "next/server";
import { fetchMovieByIMDBId } from "@/lib/fetchMovie";
import { analyzeSentiment } from "@/lib/aiSentiment";

export async function POST(request) {
    try {
        const body = await request.json();
        const { imdbId } = body;

        if (!imdbId) {
            return NextResponse.json(
                { error: "IMDb ID is required" },
                { status: 400 }
            );
        }

        // 1. Fetch from OMDB (validates ID format)
        let movieData;
        try {
            movieData = await fetchMovieByIMDBId(imdbId);
        } catch (omdbError) {
            return NextResponse.json(
                { error: omdbError.message || "Failed to fetch movie details" },
                { status: 404 }
            );
        }

        // 2. Analyze sentiment with Gemini API directly based on movie data
        const sentimentAnalaysis = await analyzeSentiment(movieData);

        // 4. Return combined result
        return NextResponse.json({
            ...movieData,
            sentiment: sentimentAnalaysis
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
