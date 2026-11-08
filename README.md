# mariaprokofieva.org

Source for Maria Prokofieva's website. Eleventy 3, Nunjucks, one stylesheet, no client-side framework, no tracking. GitHub Actions builds `_site/` and deploys it to GitHub Pages on every push to `main`; `CNAME` points Pages at mariaprokofieva.org.

How Maria is presented (name, descriptor, spine, bios, domain order) is decided in the private `maria-pro/brand` repo. Read its README before changing any wording here.

## Preview

```sh
npm install
npm start          # http://localhost:8080
npm run build      # writes _site/
```

## Add an output

Every output (paper, dataset, software release, talk, course, submission) gets one entry in `src/_data/outputs.json`. Add an object anywhere in the array; pages sort by date.

```json
{
  "id": "short-kebab-slug",
  "title": "Full title as published",
  "year": 2026,
  "date": "2026-11-20",
  "type": "article",
  "venue": "Journal, conference or repository",
  "authors": "Prokofieva, Coauthor",
  "lead": true,
  "doi": "10.5281/zenodo.0000000",
  "url": "https://github.com/maria-pro/repo",
  "domains": ["contract", "proof"],
  "featured": false,
  "summary": "One line, plain English, no claims beyond the output itself."
}
```

- `type`: `article`, `dataset`, `software`, `report`, `chapter`, `talk`, `course`, `submission` or `policy`.
- `domains`: any of `control` (management and boards), `contract` (audit and assurance), `own` (investment and behavioural finance), `spending` (marketing and agentic commerce), `behaviour` (the layer underneath), `proof` (open models, data and tools), `teaching`. Leave it empty (`[]`) for work that stays out of headlines (health promotion, clinical); it is then listed under "Other" on /work/ and never on the home page.
- `authors`: surnames up to and including Prokofieva, then "et al." if there are more. `lead` is true when she is sole or first author.
- `featured`: puts the output on the home page under its domains (and in the proof strip if tagged `proof`). Feature only work Maria leads or that carries her expertise in her own name; no group branding.
- `doi` without the `https://doi.org/` prefix; `url` for code or a page when there is one.

Then open a "Brand update" issue in `maria-pro/brand` with the link, as CONTRIBUTING.md there describes.
