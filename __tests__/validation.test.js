import { validateIMDbId } from "../lib/validation";

describe("validateIMDbId", () => {
    it("should return true for a valid IMDb ID", () => {
        expect(validateIMDbId("tt0133093")).toBe(true); // The Matrix
        expect(validateIMDbId("tt0068646")).toBe(true); // The Godfather
    });

    it("should return true for an 8-digit IMDb ID", () => {
        expect(validateIMDbId("tt10872600")).toBe(true); // Spider-Man: No Way Home
    });

    it("should return false for an invalid format", () => {
        expect(validateIMDbId("abc")).toBe(false);
        expect(validateIMDbId("tt123")).toBe(false); // Too short
        expect(validateIMDbId("tt123456789")).toBe(false); // Too long
        expect(validateIMDbId("1234567")).toBe(false); // Missing 'tt'
    });

    it("should return false for empty or null input", () => {
        expect(validateIMDbId("")).toBe(false);
        expect(validateIMDbId(null)).toBe(false);
        expect(validateIMDbId(undefined)).toBe(false);
    });

    it("should handle whitespace", () => {
        expect(validateIMDbId(" tt0133093 ")).toBe(true);
    })
});
