import { isValidUrl } from "../utils/validateUrl.js";
import { auditWebsite } from "../services/audit.service.js";

export const analyzePage = async (req, res) => {
  try {
    const { url } = req.body;

    // Check if URL exists
    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    // Validate URL format
    if (!isValidUrl(url)) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL",
      });
    }

    // Perform audit
    const report = await auditWebsite(url);

    // Send success response
    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};