module.exports = function (eleventyConfig) {
  // Passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");

  // Radar data available at /radar.json for the visualization
  eleventyConfig.addPassthroughCopy({ "src/_data/radar.json": "radar.json" });

  // Filter: head — take first N items from an array
  eleventyConfig.addFilter("head", function (array, n) {
    if (!Array.isArray(array)) return [];
    if (n < 0) return array.slice(n);
    return array.slice(0, n);
  });

  // Filter: count entries by signal level
  eleventyConfig.addFilter("countBySignal", function (collection, signal) {
    if (!Array.isArray(collection)) return 0;
    return collection.filter((item) => item.data && item.data.signal === signal).length;
  });

  // Filter: filter entries by signal level
  eleventyConfig.addFilter("filterBySignal", function (collection, signal) {
    if (!Array.isArray(collection)) return [];
    return collection.filter((item) => item.data && item.data.signal === signal);
  });

  // Custom collection: all pulse entries sorted by relevance_score DESC, then date DESC
  eleventyConfig.addCollection("pulse", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/pulse/**/*.md")
      .filter((item) => item.data.lifecycle !== "archived")
      .sort((a, b) => {
        const scoreA = a.data.relevance_score || 0;
        const scoreB = b.data.relevance_score || 0;
        if (scoreB !== scoreA) return scoreB - scoreA;
        return b.date - a.date;
      });
  });

  // Custom collection: top 5 hottest entries by relevance_score
  eleventyConfig.addCollection("hot", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/pulse/**/*.md")
      .filter((item) => item.data.lifecycle !== "archived")
      .sort((a, b) => {
        const scoreA = a.data.relevance_score || 0;
        const scoreB = b.data.relevance_score || 0;
        return scoreB - scoreA;
      })
      .slice(0, 5);
  });

  // Custom collection: noise entries (signal === "noise")
  eleventyConfig.addCollection("noise", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/pulse/**/*.md")
      .filter((item) => item.data.signal === "noise")
      .sort((a, b) => b.date - a.date);
  });

  // Custom collection: rising stars (tagged as rising in frontmatter)
  eleventyConfig.addCollection("rising", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/pulse/**/*.md")
      .filter((item) => item.data.rising === true)
      .sort((a, b) => b.date - a.date);
  });

  // Filter: format date as "YYYY-MM-DD"
  eleventyConfig.addFilter("dateFormat", function (date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  });

  // Filter: human-readable date "Mar 18, 2026"
  eleventyConfig.addFilter("dateReadable", function (date) {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  });

  // Filter: signal level to emoji
  eleventyConfig.addFilter("signalEmoji", function (signal) {
    const map = {
      "game-changer": "\u{1F534}",
      notable: "\u{1F7E1}",
      incremental: "\u{1F7E2}",
      noise: "\u26AA",
    };
    return map[signal] || "\u2753";
  });

  // Filter: signal level to label with emoji
  eleventyConfig.addFilter("signalLabel", function (signal) {
    const map = {
      "game-changer": "\u{1F534} Game Changer",
      notable: "\u{1F7E1} Notable",
      incremental: "\u{1F7E2} Incremental",
      noise: "\u26AA Noise",
    };
    return map[signal] || signal;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    pathPrefix: "/awesome-ai-radar/",
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
