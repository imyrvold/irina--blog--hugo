# Блог Ирины - Hugo + Netlify + Decap CMS

A Russian-language personal blog built with Hugo, hosted on Netlify, with Decap CMS for easy posting from iPad.

## Setup Instructions

### 1. Push to GitHub

```bash
cd /Users/imyrvold/Developer/irina-blog-hugo
git add -A
git commit -m "Initial Hugo blog with migrated posts"
git branch -M main
git remote add origin https://github.com/imyrvold/irina-blog-hugo.git
git push -u origin main
```

(Create the repo `irina-blog-hugo` on GitHub first)

### 2. Deploy to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and log in
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your GitHub account and select `irina-blog-hugo`
4. Netlify will auto-detect Hugo settings from `netlify.toml`
5. Click **"Deploy site"**

### 3. Set Up Custom Domain

1. In Netlify dashboard → **Domain management** → **Add custom domain**
2. Enter `irina.myrvold.blog`
3. Update your DNS records to point to Netlify (they'll show you exactly what to change)

### 4. Enable Decap CMS (for iPad posting)

1. In Netlify dashboard → **Integrations** → **Identity** → **Enable Identity**
2. Under **Identity** → **Settings** → **Registration** → set to **Invite only**
3. Under **Identity** → **Settings** → **Services** → **Enable Git Gateway**
4. Under **Identity** → **Invite users** → invite Irina's email address
5. Irina will receive an email invitation to set up her account

### 5. How Irina Posts from iPad

1. Open Safari on iPad
2. Go to `https://irina.myrvold.blog/admin/`
3. Log in with the account from step 4
4. Click "Новая запись" (New post)
5. Fill in the title, tag, and write the post
6. Upload images by dragging/pasting into the editor
7. Click "Publish" — the blog updates automatically!

## Local Development

```bash
# Install Hugo (if not already installed)
brew install hugo

# Run development server
cd /Users/imyrvold/Developer/irina-blog-hugo
hugo server -D

# Build for production
hugo --gc --minify
```

## Project Structure

```
irina-blog-hugo/
├── content/posts/     # All blog posts (175 migrated)
├── static/images/     # Blog images (58 migrated)
├── static/admin/      # Decap CMS admin interface
├── layouts/partials/  # Template overrides for Netlify Identity
├── themes/PaperMod/   # Hugo theme (git submodule)
├── hugo.toml          # Site configuration
└── netlify.toml       # Netlify build configuration
```
