import { describe, it, expect } from "vitest";
import { parseHtml } from "../services/parseHtml.js";

describe("parseHtml", () => {
  it("should correctly parse a valid HTML page", () => {
    const html = `
      <html>
        <head>
          <title>Page Pulse</title>
          <meta name="description" content="SEO Audit Tool">
        </head>
        <body>
          <h1>Welcome</h1>
          <img src="a.jpg" alt="Logo">
          <img src="b.jpg">
          <p>Hello world from Page Pulse.</p>
        </body>
      </html>
    `;

    const result = parseHtml(html, 200, 150);

    expect(result.status).toBe(200);
    expect(result.responseTime).toBe(150);
    expect(result.title).toBe("Page Pulse");
    expect(result.metaDescription).toBe("SEO Audit Tool");
    expect(result.h1Count).toBe(1);
    expect(result.imageCount).toBe(2);
    expect(result.missingAltImages).toBe(1);
    expect(result.wordCount).toBeGreaterThan(0);
  });
});

it("should handle missing title and meta description", () => {
  const html = `
    <html>
      <body>
        <h1>Hello</h1>
      </body>
    </html>
  `;

  const result = parseHtml(html, 200, 100);

  expect(result.title).toBe("Not Found");
  expect(result.metaDescription).toBe("Not Found");
  expect(result.h1Count).toBe(1);
  expect(result.imageCount).toBe(0);
  expect(result.missingAltImages).toBe(0);
});

it("should handle empty HTML without crashing", () => {
  const result = parseHtml("", 200, 50);

  expect(result.title).toBe("Not Found");
  expect(result.metaDescription).toBe("Not Found");
  expect(result.h1Count).toBe(0);
  expect(result.imageCount).toBe(0);
  expect(result.wordCount).toBe(0);
});