# Redirect Plan for Stargate Innovationhub

## Overview
This document outlines the recommended redirects when migrating from the old individual app domains to the new unified company domain.

## Domain Migration

### Old Structure → New Structure

| Old URL | New URL | Redirect Type |
|---------|---------|---------------|
| `myquitly.stargate-innovationhub.com` | `stargate-innovationhub.com/products/myquitly/` | 301 (Permanent) |
| `myquitly.stargate-innovationhub.com/en/` | `stargate-innovationhub.com/products/myquitly/` | 301 (Permanent) |
| `myquitly.stargate-innovationhub.com/de/` | `stargate-innovationhub.com/products/myquitly/` | 301 (Permanent) |
| `myquitly.stargate-innovationhub.com/en/privacy.html` | `stargate-innovationhub.com/legal/privacy.html#myquitly` | 301 (Permanent) |
| `myquitly.stargate-innovationhub.com/en/terms.html` | `stargate-innovationhub.com/legal/terms.html#myquitly` | 301 (Permanent) |
| `myquitly.stargate-innovationhub.com/en/imprint.html` | `stargate-innovationhub.com/legal/imprint.html` | 301 (Permanent) |
| `forevertold.app` | `stargate-innovationhub.com/products/forevertold/` | 301 (Permanent) |
| `forevertold.app/en/` | `stargate-innovationhub.com/products/forevertold/` | 301 (Permanent) |
| `forevertold.app/en/privacy.html` | `stargate-innovationhub.com/legal/privacy.html#forevertold` | 301 (Permanent) |
| `forevertold.app/en/terms.html` | `stargate-innovationhub.com/legal/terms.html#forevertold` | 301 (Permanent) |
| `forevertold.app/en/imprint.html` | `stargate-innovationhub.com/legal/imprint.html` | 301 (Permanent) |

## Implementation Options

### Option 1: Server-Level Redirects (Recommended)

**Apache (.htaccess)**
```apache
# Redirect old MyQuitly subdomain
RewriteEngine On
RewriteCond %{HTTP_HOST} ^myquitly\.stargate-innovationhub\.com$ [NC]
RewriteRule ^(.*)$ https://stargate-innovationhub.com/products/myquitly/$1 [R=301,L]
```

**Nginx**
```nginx
server {
    server_name myquitly.stargate-innovationhub.com;
    return 301 https://stargate-innovationhub.com/products/myquitly$request_uri;
}
```

### Option 2: DNS-Level Redirects
If using services like Cloudflare, Netlify, or Vercel, you can configure redirects at the DNS/edge level.

**Netlify (_redirects file)**
```
# MyQuitly redirects
https://myquitly.stargate-innovationhub.com/* https://stargate-innovationhub.com/products/myquitly/:splat 301!

# ForeverTold redirects  
https://forevertold.app/* https://stargate-innovationhub.com/products/forevertold/:splat 301!
```

**Vercel (vercel.json)**
```json
{
  "redirects": [
    {
      "source": "/(.*)",
      "destination": "https://stargate-innovationhub.com/products/myquitly/$1",
      "permanent": true,
      "has": [
        { "type": "host", "value": "myquitly.stargate-innovationhub.com" }
      ]
    }
  ]
}
```

## App Store Considerations

### Important Notes
1. **Update App Store listings** - Update the "Support URL" and "Privacy Policy URL" in:
   - Apple App Store Connect
   - Google Play Console
   
2. **Recommended URLs for App Stores:**
   - MyQuitly Support: `https://stargate-innovationhub.com/products/myquitly/`
   - MyQuitly Privacy: `https://stargate-innovationhub.com/legal/privacy.html#myquitly`
   - ForeverTold Support: `https://stargate-innovationhub.com/products/forevertold/`
   - ForeverTold Privacy: `https://stargate-innovationhub.com/legal/privacy.html#forevertold`

3. **Deep links in apps** - If your apps have deep links to the website, update them to the new URLs.

## SEO Transition Checklist

- [ ] Submit new sitemap to Google Search Console
- [ ] Submit new sitemap to Bing Webmaster Tools
- [ ] Verify all 301 redirects are working
- [ ] Update canonical URLs in all pages
- [ ] Update social media profiles with new URLs
- [ ] Update backlinks where possible
- [ ] Monitor 404 errors in Search Console
- [ ] Keep old domains active with redirects for at least 6-12 months

## Timeline Recommendation

1. **Week 1:** Deploy new unified site
2. **Week 2:** Set up redirects, test thoroughly
3. **Week 3:** Update app store listings
4. **Week 4-8:** Monitor traffic and fix any redirect issues
5. **Month 3-6:** Review SEO performance, update external links
6. **Month 12:** Consider retiring old domains (optional)

