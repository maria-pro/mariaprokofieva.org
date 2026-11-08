const TYPE_LABELS = {
  article: "Article",
  dataset: "Dataset",
  software: "Software",
  report: "Report",
  chapter: "Chapter",
  talk: "Talk",
  course: "Course",
  submission: "Submission",
  policy: "Policy brief",
};

const byDate = (a, b) =>
  String(b.date || b.year || "").localeCompare(String(a.date || a.year || ""));

export default function (eleventyConfig) {
  // macOS writes ._* AppleDouble files on exFAT drives; never treat them as content.
  eleventyConfig.ignores.add("**/._*");

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ CNAME: "CNAME" });

  eleventyConfig.addFilter("typeLabel", (t) => TYPE_LABELS[t] || t);

  eleventyConfig.addFilter("doiUrl", (doi) => (doi ? `https://doi.org/${doi}` : null));

  // Newest first.
  eleventyConfig.addFilter("sortOutputs", (list) => [...list].sort(byDate));

  // Outputs tagged with a domain ("other" = no domain; those never appear on the home page).
  eleventyConfig.addFilter("inDomain", (list, domain) =>
    list.filter((o) =>
      domain === "other" ? o.domains.length === 0 : o.domains.includes(domain)
    )
  );

  eleventyConfig.addFilter("featuredOnly", (list) => list.filter((o) => o.featured));

  // Home page "latest": newest outputs Maria led or that are featured; never "other" items.
  eleventyConfig.addFilter("homeLatest", (list, n = 6) =>
    [...list]
      .filter((o) => o.domains.length > 0 && (o.lead || o.featured))
      .sort(byDate)
      .slice(0, n)
  );

  // Types present in the data, in a fixed reading order.
  eleventyConfig.addFilter("distinctTypes", (list) => {
    const present = new Set(list.map((o) => o.type));
    return [...Object.keys(TYPE_LABELS).filter((t) => present.has(t)), ...[...present].filter((t) => !(t in TYPE_LABELS))];
  });

  eleventyConfig.addFilter("withoutType", (list, type) => list.filter((o) => o.type !== type));

  eleventyConfig.addFilter("head", (list, n) => list.slice(0, n));

  eleventyConfig.addFilter("count", (list) => list.length);

  // Bold Maria's name in an author string.
  eleventyConfig.addFilter("markAuthor", (s) =>
    s ? s.replace("Prokofieva", '<strong class="me">Prokofieva</strong>') : ""
  );

  // Encode every character as an HTML entity: light obfuscation against address harvesters.
  eleventyConfig.addFilter("entities", (s) =>
    [...String(s)].map((c) => `&#${c.codePointAt(0)};`).join("")
  );

  eleventyConfig.addFilter("lcfirst", (s) => (s ? s[0].toLowerCase() + s.slice(1) : s));

  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));

  eleventyConfig.addGlobalData("buildDate", () => new Date());

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
  };
}
