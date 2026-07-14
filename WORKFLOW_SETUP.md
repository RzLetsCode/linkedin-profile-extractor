# GitHub Actions Workflow Setup Guide

This guide explains how to configure the CI/CD pipeline for automatic deployment.

## 🚀 What the Workflow Does

The CI/CD pipeline automatically:

1. **📝 Lints Code** - Runs ESLint to check code quality
2. **✅ Type Checks** - Validates TypeScript types
3. **🔨 Builds App** - Compiles the Next.js application
4. **🔒 Security Audit** - Checks for vulnerable dependencies
5. **🌐 Deploys to Vercel** - Auto-deploys on push to main
6. **🔍 Preview Deployments** - Creates preview URLs for pull requests

## 🛠️ Setup Instructions

### Step 1: Get Vercel Token

1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Click **"Create Token"**
3. Name it: `GitHub Actions Token`
4. Select scope: **Full Account**
5. Click **"Create"**
6. **Copy the token** (you'll only see it once!)

### Step 2: Get Vercel Project IDs

#### Option A: Via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link your project
vercel link

# Get project info
vercel project ls
```

#### Option B: Via Vercel Dashboard

1. Go to your project in Vercel
2. Click **"Settings"**
3. Find **"Project ID"** - copy it
4. Find **"Team ID"** or **"Org ID"** - copy it

### Step 3: Add GitHub Secrets

1. Go to your GitHub repository
2. Click **"Settings"** → **"Secrets and variables"** → **"Actions"**
3. Click **"New repository secret"**
4. Add these secrets one by one:

| Secret Name | Value | Where to Get |
|------------|-------|-------------|
| `VERCEL_TOKEN` | Your Vercel token | Vercel Account Tokens |
| `VERCEL_ORG_ID` | Your org/team ID | Vercel project settings |
| `VERCEL_PROJECT_ID` | Your project ID | Vercel project settings |
| `LINKEDIN_CLIENT_ID` | LinkedIn app ID | LinkedIn Developers |
| `LINKEDIN_CLIENT_SECRET` | LinkedIn secret | LinkedIn Developers |
| `NEXTAUTH_URL` | Production URL | e.g., https://your-app.vercel.app |
| `NEXTAUTH_SECRET` | Random secret | Run: `openssl rand -base64 32` |

### Step 4: Test the Workflow

1. Make a small change to any file
2. Commit and push to `main` branch:
   ```bash
   git add .
   git commit -m "Test CI/CD workflow"
   git push origin main
   ```
3. Go to **"Actions"** tab in GitHub
4. Watch your workflow run!

## 📖 Workflow Triggers

The workflow runs on:

- **Push to `main` branch** → Builds, tests, and deploys to production
- **Push to `develop` branch** → Builds and tests only
- **Pull Requests to `main`** → Creates preview deployment
- **Manual trigger** → Via "Actions" tab in GitHub

## 🔍 Workflow Steps Explained

### 1. Lint Job
```yaml
- Checks out code
- Installs Node.js 18
- Runs npm ci (clean install)
- Runs ESLint
- Runs TypeScript type check
```

### 2. Build Job
```yaml
- Checks out code
- Installs dependencies
- Builds Next.js app
- Uploads .next folder as artifact
```

### 3. Security Job
```yaml
- Checks out code
- Runs npm audit
- Checks for vulnerable packages
```

### 4. Deploy Production
```yaml
- Only runs on main branch push
- Deploys to Vercel production
- Comments deployment URL on PR
```

### 5. Deploy Preview
```yaml
- Only runs on pull requests
- Creates preview deployment
- Comments preview URL on PR
```

## 📊 Monitoring Workflows

### View Workflow Runs

1. Go to **"Actions"** tab
2. See all workflow runs
3. Click any run to see details
4. Check logs for each job

### Workflow Status Badge

Add this to your README.md:

```markdown
![CI/CD](https://github.com/RzLetsCode/linkedin-profile-extractor/actions/workflows/ci.yml/badge.svg)
```

Result: ![CI/CD](https://github.com/RzLetsCode/linkedin-profile-extractor/actions/workflows/ci.yml/badge.svg)

## 🐛 Troubleshooting

### Build Fails

**Problem**: "npm ci" fails  
**Solution**: Make sure `package-lock.json` exists in repo

**Problem**: TypeScript errors  
**Solution**: Fix errors locally first: `npm run build`

### Deployment Fails

**Problem**: "Invalid Vercel token"  
**Solution**: Regenerate token and update GitHub secret

**Problem**: "Project not found"  
**Solution**: Verify `VERCEL_PROJECT_ID` and `VERCEL_ORG_ID`

### Secrets Not Working

**Problem**: Environment variables undefined  
**Solution**: 
1. Check secret names match exactly (case-sensitive)
2. Secrets don't work in forked repos (security)
3. Re-add secrets if unsure

## 🔧 Customizing the Workflow

### Add More Jobs

Edit `.github/workflows/ci.yml`:

```yaml
tests:
  name: Run Tests
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: npm ci
    - run: npm test
```

### Change Node Version

Edit the `env` section:

```yaml
env:
  NODE_VERSION: '20'  # Change to Node 20
```

### Deploy to Multiple Environments

Add staging environment:

```yaml
deploy-staging:
  if: github.ref == 'refs/heads/develop'
  steps:
    - uses: amondnet/vercel-action@v25
      with:
        vercel-args: '--target=staging'
```

## 📝 Best Practices

1. **Always test locally first**
   ```bash
   npm run build
   npm run lint
   ```

2. **Use pull requests** - Get preview deployments before merging

3. **Monitor workflow runs** - Check Actions tab regularly

4. **Keep secrets secure** - Never commit secrets to code

5. **Update dependencies** - Run `npm audit fix` regularly

## 🎉 You're All Set!

Your CI/CD pipeline is now configured! Every push to `main` will:

✅ Run quality checks  
✅ Build your app  
✅ Audit security  
✅ Deploy to Vercel  
✅ Auto-update live site  

No manual deployment needed! 🚀
