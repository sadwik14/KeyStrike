# Deployment Guide

## Quick Deploy to Vercel (2 minutes)

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/keystrike.git
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"
5. Done! Your app is live

### Step 3: Add Environment Variables (Optional)
If using MongoDB:
1. Go to Project Settings > Environment Variables
2. Add `MONGODB_URI` with your connection string
3. Redeploy

## Other Platforms

### Netlify
```bash
npm run build
# Deploy the .next folder
```

### Railway
```bash
railway login
railway init
railway up
```

### AWS Amplify
1. Connect GitHub repo
2. Build settings: `npm run build`
3. Deploy

## Custom Domain
1. Buy domain from registrar
2. Add to Vercel/Netlify
3. Update DNS records
4. Enable HTTPS

---

**Contact**: zetfounder@gmail.com
