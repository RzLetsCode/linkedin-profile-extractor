# LinkedIn Profile Extractor & Bulk Messenger

## 🚀 Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RzLetsCode/linkedin-profile-extractor&env=NEXTAUTH_URL,NEXTAUTH_SECRET,LINKEDIN_CLIENT_ID,LINKEDIN_CLIENT_SECRET&envDescription=Required%20environment%20variables%20for%20LinkedIn%20OAuth&project-name=linkedin-profile-extractor)

**Click the button above to deploy to Vercel in one click!**

You'll need:
1. LinkedIn Developer App credentials (Client ID & Secret)
2. Generate a NextAuth secret: `openssl rand -base64 32`


Complete LinkedIn OAuth integration for code2career_ai - Extract student/mentor profiles and send bulk messages.

## 🚀 Features

- ✅ **LinkedIn OAuth 2.0 Authentication** - Secure sign-in with LinkedIn
- ✅ **Profile Extraction** - Extract and store LinkedIn profiles (students & mentors)
- ✅ **Role Management** - Separate student/mentor registration
- ✅ **List View with IDs** - View all registered profiles with LinkedIn IDs
- ✅ **Bulk Messaging** - Select multiple profiles and send messages
- ✅ **In-Memory Store** - Fast data access (easily upgradable to PostgreSQL/MongoDB)

## 📋 Prerequisites

- Node.js 18+ and npm
- LinkedIn Developer Account
- GitHub account

## 🛠️ Setup Steps

### Step 1: LinkedIn Developer App

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Click **Create App**
3. Fill in:
   - App name: `code2career_ai`
   - Company: Your LinkedIn page
   - App logo: Upload your logo
4. In **Auth** tab, add Redirect URLs:
   ```
   http://localhost:3000/api/auth/callback/linkedin
   https://yourdomain.com/api/auth/callback/linkedin
   ```
5. In **Products** tab, request **Sign In with LinkedIn using OpenID Connect**
6. Copy **Client ID** and **Client Secret**

### Step 2: Clone Repository

```bash
git clone https://github.com/RzLetsCode/linkedin-profile-extractor.git
cd linkedin-profile-extractor
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Environment Configuration

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
```

Generate secret:
```bash
openssl rand -base64 32
```

### Step 5: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### 1. Register Profiles

**Students:**
- Visit `/student`
- Click "Continue with LinkedIn"
- Authorize app
- Profile automatically saved

**Mentors:**
- Visit `/mentor`
- Click "Continue with LinkedIn"
- Authorize app
- Profile automatically saved

### 2. View All Profiles

Visit `/dashboard` to see:
- List of all registered students
- List of all registered mentors
- LinkedIn IDs displayed
- Checkboxes to select profiles

### 3. Send Bulk Messages

1. On dashboard, select profiles (checkboxes)
2. Click "Compose Message"
3. Enter subject and body
4. Click "Send to Selected"
5. Messages sent to all selected profiles

## 🏗️ Project Structure

```
linkedin-profile-extractor/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts  # NextAuth LinkedIn OAuth
│   │   ├── profiles/route.ts             # Profile CRUD
│   │   └── messages/route.ts             # Bulk messaging
│   ├── dashboard/page.tsx                # Main dashboard
│   ├── student/page.tsx                  # Student registration
│   └── mentor/page.tsx                   # Mentor registration
├── lib/
│   └── store.ts                          # In-memory data store
├── .env.example
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Authentication
```
GET  /api/auth/signin          # Sign in page
POST /api/auth/callback/linkedin  # LinkedIn OAuth callback
GET  /api/auth/signout         # Sign out
```

### Profiles
```
GET  /api/profiles             # List all profiles
GET  /api/profiles?role=student   # Filter by role
POST /api/profiles             # Register profile
```

### Messages
```
GET  /api/messages             # List sent messages
POST /api/messages             # Send bulk message
```

## 💡 Example API Calls

### Register Profile

```javascript
fetch('/api/profiles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ role: 'student' })
});
```

### Send Bulk Message

```javascript
fetch('/api/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    recipientIds: ['linkedin-id-1', 'linkedin-id-2'],
    subject: 'Welcome to code2career_ai',
    body: 'Join our AI/ML learning platform!'
  })
});
```

## 🎨 Customization

### Add Database Persistence

Replace `lib/store.ts` with Prisma:

```bash
npm install prisma @prisma/client
npx prisma init
```

Create `schema.prisma`:

```prisma
model Profile {
  id String @id @default(cuid())
  linkedinId String @unique
  firstName String
  lastName String
  email String
  role String
  createdAt DateTime @default(now())
}
```

### Add Email Integration

Install SendGrid:

```bash
npm install @sendgrid/mail
```

Update `app/api/messages/route.ts`:

```javascript
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

await sgMail.send({
  to: recipient.email,
  from: 'noreply@code2career.ai',
  subject,
  html: messageBody
});
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel login
vercel
```

Add environment variables in Vercel dashboard.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t linkedin-extractor .
docker run -p 3000:3000 --env-file .env linkedin-extractor
```

## 🔒 Security Notes

- Never commit `.env` file
- Use environment variables for secrets
- LinkedIn OAuth has rate limits (throttle requests)
- For production, use proper database with encryption
- Add CSRF protection for forms

## 📝 License

MIT License - see LICENSE file

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📧 Support

For issues or questions:
- Open GitHub Issue
- Contact: [@RzLetsCode](https://github.com/RzLetsCode)

## 🎓 Made for code2career_ai

Built with ❤️ for the code2career_ai platform to help connect students and mentors in AI/ML learning journey.
