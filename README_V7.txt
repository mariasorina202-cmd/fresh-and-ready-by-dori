Fresh & Ready by Dori — V7 Full Business CMS

Built directly from the supplied V6 package.

NEW
- Hero photo upload/replace/remove directly from Admin
- Freestyle menu categories and products, including Drinks
- Product photo, ingredients, calories, allergens, availability and featured flags
- Generic Builders system + prebuilt Cereal Bowl Builder
- Deals & promotions editor
- Expanded Media Library
- Careers vacancies + shareable careers.html?job=... pages
- Optional candidate application storage/API
- SEO/social controls
- Publish version history (last 10 live versions stored)
- Existing Draft / Preview / Publish flow retained
- Existing R2 binding aligned to MEDIA_BUCKET
- Known V6 malformed metadata/mailto issue corrected

CLOUDFLARE BINDINGS
Existing bindings kept:
SITE_CONTENT = existing KV namespace
MEDIA_BUCKET = existing R2 bucket
ADMIN_KEY = existing secret

OPTIONAL FOR CAREER APPLICATIONS
Create a second KV namespace, e.g. fresh-and-ready-careers, and bind it to the Pages project as:
CAREERS_DATA
Without CAREERS_DATA, vacancies still publish and share normally, but the website application form returns a configuration message instead of storing candidate data.

DEPLOY
Upload/replace the V7 files in the existing GitHub repository and commit to main. Cloudflare Pages should auto-deploy. Keep ADMIN_KEY private.

IMPORTANT
Final allergen data must come from final recipes and supplier labels. Do not populate allergen fields by guessing.
