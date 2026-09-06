# Muhammad Mesum — AI Engineer Portfolio V2.5

Production-ready static portfolio for GitHub Pages.

## Local preview

Because this site is fully static, you can open `index.html` directly or serve the folder with any static HTTP server.

## GitHub Pages

Recommended repository:

`MuhammadMesum514.github.io`

The included workflow deploys the repository to GitHub Pages on pushes to `main`.

In GitHub:
1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Configure the custom domain as `muhammadmesum.site`.
4. Enable HTTPS once the DNS configuration has propagated.

## DNS

For the apex domain, configure the GitHub Pages A records at your DNS provider. GitHub also recommends configuring `www` as a CNAME to `MuhammadMesum514.github.io`.

## Updating projects

The featured project content lives in `index.html`. Add a new project card using the existing project structure and keep project claims tied to verified project information.

## Contact

Mesumraza09@gmail.com


## Custom domain: Namecheap

For `muhammadmesum.site` (the apex/root domain), GitHub recommends `A` records rather than a normal CNAME at `@`:

- `@` → `185.199.108.153`
- `@` → `185.199.109.153`
- `@` → `185.199.110.153`
- `@` → `185.199.111.153`

Optionally add IPv6 `AAAA` records using GitHub's documented values.

For `www`, use:

- Host: `www`
- Type: `CNAME`
- Value: `MuhammadMesum514.github.io`

Remove conflicting `@` A/AAAA/CNAME/ALIAS records. GitHub Pages' custom-domain workflow does not require the repository CNAME file when deploying with GitHub Actions; the domain configured in Settings → Pages is what matters.
