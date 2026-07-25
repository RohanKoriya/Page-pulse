import { load } from "cheerio";

export const parseHtml = (html, status, responseTime) => {
  const $ = load(html);

  const title = $("title").text().trim() || "Not Found";

  const metaDescription =
    $('meta[name="description"]').attr("content") || "Not Found";

  const h1Count = $("h1").length;

  const images = $("img");
  const imageCount = images.length;

  let missingAltImages = 0;

  images.each((_, image) => {
    const alt = $(image).attr("alt");

    if (!alt || alt.trim() === "") {
      missingAltImages++;
    }
  });

  const bodyText = $("body").text();

  const wordCount = bodyText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return {
    status,
    responseTime,
    title,
    metaDescription,
    h1Count,
    imageCount,
    missingAltImages,
    wordCount,
  };
};