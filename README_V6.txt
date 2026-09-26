FRESH & READY BY DORI — V6 CONTROL CENTRE

WHAT V6 ADDS
- Edit public website headings, paragraphs and labels.
- Full menu category/product management: add, rename, describe, price, hide, delete and reorder.
- Build Your Own editor.
- Staff editor.
- Community cards editor.
- Business details and hours editor.
- Section visibility and ordering.
- Delivery button labels/URLs/live status.
- Photo galleries: Staff / Products / Our Story.
- Unlimited gallery items in the content model; single/grid/collage/slideshow layouts.
- Staff photos can be assigned to a specific team member.
- Save Draft, Preview and Publish Live workflow.

EXISTING CLOUDFLARE BINDINGS (KEEP)
- KV binding: SITE_CONTENT
- Secret: ADMIN_KEY

ONE NEW CLOUDFLARE BINDING REQUIRED FOR DIRECT PHOTO UPLOADS
1. Create an R2 bucket, e.g. fresh-and-ready-site-images.
2. In the Pages project Settings > Bindings, add an R2 bucket binding.
3. Variable name MUST be: SITE_IMAGES
4. Select the new bucket.
5. Redeploy the Pages project.

No public R2 URL is required. Images are served securely through /api/images/<key>.
The admin key remains a Cloudflare secret and must never be committed to GitHub.

DEPLOYMENT
Replace the repository files with this V6 package and commit to main. Cloudflare Pages will redeploy automatically. Existing SITE_CONTENT data is not deleted. On first V6 use, open /admin.html, enter the admin key, and use V6 defaults if the old V5 data does not yet contain the new V6 structure. Publish once to store the V6 structure.

IMPORTANT
Before replacing the live site, keep the current V5 ZIP/repository commit as rollback. The R2 image binding is required only for direct image uploads; the rest of V6 uses the existing KV + ADMIN_KEY architecture.
