export function validateIMDbId(imdbId) {
    if (!imdbId) return false;
    const trimmedId = imdbId.trim();
    const imdbRegex = /^tt\d{7,8}$/;
    return imdbRegex.test(trimmedId);
}
