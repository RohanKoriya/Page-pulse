import axios from "axios";
import { parseHtml } from "./parseHtml.js";

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

    return parseHtml(
      response.data,
      response.status,
      responseTime
    );
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
      const status = error.response.status;

      if (status === 403) {
        throw {
          statusCode: 403,
          message:
            "This website blocks automated requests and cannot be analyzed.",
        };
      }

      if (status === 404) {
        throw {
          statusCode: 404,
          message: "The requested webpage was not found.",
        };
      }

      if (status >= 500) {
        throw {
          statusCode: 500,
          message:
            "The website is currently unavailable. Please try again later.",
        };
      }

      throw {
        statusCode: status,
        message: `The website returned HTTP ${status}.`,
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