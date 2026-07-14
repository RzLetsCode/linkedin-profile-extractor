# Deployment Guide - LinkedIn Profile Extractor

Deploy your LinkedIn Profile Extractor to a live URL in minutes!

## 🚀 Option 1: Vercel (Recommended - FREE)

Vercel is built for Next.js and offers the easiest deployment.

### Step 1: Sign up for Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Sign in with your **GitHub account**

### Step 2: Import Your Repository

1. Click **"Add New..."** → **"Project"**
2. Select **"Import Git Repository"**
3. Find `linkedin-profile-extractor` repository
4. Click **"Import"**

### Step 3: Configure Environment Variables

Before deploying, add your environment variables:

1. In the deployment settings, find **"Environment Variables"**
2. Add these variables:

```
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your_generated_secret
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### Step 4: Update LinkedIn OAuth Redirect URL

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Select your app
3. In **Auth** tab, add redirect URL:
   ```
   https://your-app.vercel.app/api/auth/callback/linkedin
   ```

### Step 5: Deploy!

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Your app will be live at: `https://your-app.vercel.app`

### Update Environment Variables (If Needed)

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Edit/Add variables
4. Redeploy from **"Deployments"** tab

---

## 🔵 Option 2: Netlify

### Step 1: Sign up for Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign in with **GitHub**

### Step 2: Deploy from GitHub

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **GitHub**
3. Select `linkedin-profile-extractor` repository

### Step 3: Build Settings

```
Build command: npm run build
Publish directory: .next
```

### Step 4: Environment Variables

Go to **Site settings** → **Environment variables**:

```
LINKEDIN_CLIENT_ID=your_value
LINKEDIN_CLIENT_SECRET=your_value
NEXTAUTH_URL=https://your-app.netlify.app
NEXTAUTH_SECRET=your_value
```

### Step 5: Deploy

Click **"Deploy site"**

---

## ☁️ Option 3: Railway

### Step 1: Sign up

1. Go to [railway.app](https://railway.app)
2. Sign in with **GitHub**

### Step 2: Deploy

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose `linkedin-profile-extractor`

### Step 3: Add Environment Variables

1. Click on your project
2. Go to **"Variables"** tab
3. Add all environment variables

### Step 4: Get Your URL

Railway will auto-generate a URL like:
```
https://your-app.up.railway.app
```

---

## 🔧 Post-Deployment Checklist

✅ **Update LinkedIn OAuth Redirect URL**
- Add production URL to LinkedIn app settings
- Format: `https://your-domain.com/api/auth/callback/linkedin`

✅ **Update NEXTAUTH_URL**
- Set to your production domain
- Example: `https://linkedin-extractor.vercel.app`

✅ **Test the Flow**
1. Visit your deployed URL
2. Click "I'm a Student" or "I'm a Mentor"
3. Complete LinkedIn OAuth
4. Check if profile is saved
5. Go to Dashboard
6. Test bulk messaging

✅ **Monitor Logs**
- Vercel: **Deployments** → **Functions** → View logs
- Netlify: **Deploys** → **Deploy log**
- Railway: **Deployments** → View logs

---

## 🐛 Troubleshooting

### "Unauthorized" Error
- Check environment variables are set correctly
- Verify LinkedIn OAuth redirect URL matches deployment URL
- Regenerate NEXTAUTH_SECRET if needed

### LinkedIn OAuth Fails
- Ensure redirect URL in LinkedIn app includes `/api/auth/callback/linkedin`
- Check Client ID and Secret are correct
- Make sure app has "Sign In with LinkedIn using OpenID Connect" product enabled

### Build Fails
- Check all required files exist (see COMPLETE_CODE_FILES.md)
- Verify package.json has all dependencies
- Check for TypeScript errors

### API Routes Not Working
- Ensure serverless functions are enabled (they are by default on Vercel/Netlify)
- Check function logs for errors
- Verify API route paths are correct

---

## 🔐 Security Best Practices

1. **Never commit `.env` file** - It's already in .gitignore
2. **Rotate secrets regularly** - Generate new NEXTAUTH_SECRET periodically
3. **Use environment variables** - Never hardcode secrets
4. **Enable HTTPS** - All platforms provide this by default
5. **Monitor usage** - Check deployment logs for suspicious activity

---

## 📊 Free Tier Limits

### Vercel (Hobby Plan)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless Functions: 100GB-hours
- ✅ Custom domains

### Netlify (Starter Plan)
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Serverless Functions: 125k requests/month

### Railway (Trial)
- ✅ $5 credit/month
- ✅ Auto-scaling
- ✅ Custom domains

---

## 🎉 Your App is Live!

Once deployed, share your URL:
```
https://linkedin-extractor.vercel.app
```

Users can now:
- Register as students/mentors via LinkedIn
- View all profiles with LinkedIn IDs
- Send bulk messages to selected profiles

---

## 🔄 Continuous Deployment

All platforms automatically redeploy when you push to GitHub:

1. Make changes locally
2. Commit and push to GitHub
3. Platform auto-detects changes
4. Builds and deploys automatically
5. Live in 2-3 minutes!

---

## 📞 Support

If you encounter issues:
1. Check deployment logs
2. Review this guide
3. Verify environment variables
4. Test LinkedIn OAuth separately

Happy deploying! 🚀
