# CareerPilot AI

A fast, mobile-friendly static career preparation website built with plain HTML, CSS, and JavaScript. It includes quizzes, career calculators, puzzles, interview question banks, SEO-ready articles, FAQ schema, and a ₹99 HR toolkit page with resume templates.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Open **Settings → Pages**.
3. Select **Deploy from a branch**.
4. Choose the branch and `/ (root)` folder, then save.

The site uses relative links, so it works when hosted from a GitHub Pages repository subpath.

## Deploy to Vercel

1. Import the GitHub repository in Vercel.
2. Set **Framework Preset** to `Other`.
3. Leave the build command empty and set the output directory to `.`.
4. Deploy.

## Notes

- No API, paid service, database, or backend is needed.
- Quiz scores and resume-checklist progress are stored in `localStorage`.
- Replace the placeholder `forms.gle` links with production Google Forms before launch.
- Update the `careerpilot-ai.vercel.app` URL in `sitemap.xml` and `robots.txt` if your production domain differs.
