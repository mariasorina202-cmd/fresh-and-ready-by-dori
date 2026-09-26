Fresh & Ready by Dori — Website V4 Admin

NEW:
- admin.html for editing menu prices, opening hours, address, email and photo paths.
- site-data.js stores frequently changing business content.
- content-runtime.js applies editable data to the website.
- Existing V3 design is retained.

IMPORTANT:
This is a SAFE, NO-PASSWORD-IN-BROWSER admin workflow. admin.html does not directly write to GitHub.
To publish a change:
1. Open admin.html.
2. Edit the fields.
3. Download updated site-data.js.
4. In GitHub, replace site-data.js with the downloaded version and Commit.
5. Cloudflare Pages auto-deploys from GitHub.

For photos:
1. Upload the image into the GitHub assets folder.
2. Put its path in Admin, e.g. assets/donut.jpg.
3. Download and replace site-data.js.

A true one-tap Save & Publish admin requires authenticated backend/CMS setup; do not put GitHub tokens in public JavaScript.
