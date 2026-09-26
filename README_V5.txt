Fresh & Ready by Dori — V5 Live Admin

WHAT V5 DOES
- Admin changes publish directly to Cloudflare KV.
- No GitHub file replacement for everyday price/hour/address/photo-path changes.
- Public website reads live content from /api/site-data.
- Static site-data.js remains as a fallback.
- Admin writes require a private ADMIN_KEY stored as a Cloudflare secret/environment value.

ONE-TIME CLOUDFLARE SETUP
1. Create a Workers KV namespace (suggested name: fresh-ready-site-content).
2. Pages project > Settings > Bindings > Add > KV namespace.
3. Variable name MUST be: SITE_CONTENT
4. Select the KV namespace and save.
5. Pages project > Settings > Variables and Secrets > Add.
6. Name MUST be: ADMIN_KEY
7. Set a long private value only you know. Never put it in GitHub.
8. Redeploy the Pages project after adding the binding.
9. Open /admin.html, enter the private admin key, edit data, Save & Publish.

SECURITY
The repository is public. Never commit ADMIN_KEY, API tokens, passwords, or other secrets.
For stronger protection, additionally protect /admin* with Cloudflare Access.
