import axios from "axios";
import { load } from "cheerio";

export const auditWebsite = async (url) => {
  try {
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
      throw {
        statusCode: 415,
        message: "The provided URL does not return an HTML page.",
      };
    }

    const $ = load(response.data);

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
      status: response.status,
      responseTime,
      title,
      metaDescription,
      h1Count,
      imageCount,
      missingAltImages,
      wordCount,
    };
  } catch (error) {
    // Invalid domain 
    if (error.code === "ENOTFOUND") {
      throw {
        statusCode: 404,
        message: "Website not found. Please check the URL.",
      };
    }

    // Request timeout
    if (error.code === "ECONNABORTED") {
      throw {
        statusCode: 408,
        message: "The request timed out. Please try again.",
      };
    }

    // Website responded with an error (404, 500, etc.)
    if (error.response) {
      throw {
        statusCode: error.response.status,
        message: `The website returned HTTP ${error.response.status}.`,
      };
    }

    // Network issue
    if (error.request) {
      throw {
        statusCode: 503,
        message: "Unable to connect to the website.",
      };
    }

    // Our custom errors
    if (error.statusCode) {
      throw error;
    }

    // Fallback
    throw {
      statusCode: 500,
      message: "Something went wrong while analyzing the website.",
    };
  }
};