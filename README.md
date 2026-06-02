# CareerPilot AI

A fast, mobile-friendly, SEO-focused static career website built with only HTML, CSS, and JavaScript. It includes free interview resources, five quizzes, five browser-based tools, three learning puzzles, twenty blog posts, and a ₹99 HR toolkit landing page with resume templates.

## Run locally

No install or build step is required. Start any static file server from the repository root:

```bash
python3 -m http.server 4173
```

Then open <http://localhost:4173>.

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings → Pages** in the GitHub repository.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the main branch and the root (`/`) folder, then click **Save**.
5. Replace the placeholder canonical domain in the HTML pages, `robots.txt`, and `sitemap.xml` with your GitHub Pages URL before publishing.

## Deploy to Vercel

1. Import this repository in Vercel.
2. Select **Other** as the framework preset.
3. Leave the build command empty and use `.` as the output directory.
4. Deploy, then replace the placeholder canonical domain in the HTML pages, `robots.txt`, and `sitemap.xml` with your live domain.

## Customize lead forms

The lead-generation buttons currently use a placeholder Google Forms link. Search for `1FAIpQLScareerPilotAI` and replace each occurrence with your live Google Form URL.
