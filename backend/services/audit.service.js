import axios from "axios";
import { load } from "cheerio";

export const auditWebsite = async (url) => {
  const startTime = Date.now();

  const response = await axios.get(url, {
    timeout: 10000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0 Safari/537.36",
    },
  });

  const responseTime = Date.now() - startTime;

  const contentType = response.headers["content-type"] || "";

  if (!contentType.includes("text/html")) {
    throw new Error("URL does not return HTML content");
  }

  const $ = load(response.data);

  const title = $("title").text().trim();

  const metaDescription =
    $('meta[name="description"]').attr("content") || "Not Found";

  const h1Count = $("h1").length;

  const images = $("img");
  const imageCount = images.length;

  let missingAltImages = 0;

  images.each((index, image) => {
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
    status: response.status,
    responseTime,
    title,
    metaDescription,
    h1Count,
    imageCount,
    missingAltImages,
    wordCount,
  };
};