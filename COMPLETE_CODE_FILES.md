# Complete Implementation Guide

This file contains all remaining code files needed to complete the project.

## Already Created ✅

- ✅ `.env.example`
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tailwind.config.ts`
- ✅ `types/next-auth.d.ts`
- ✅ `app/api/auth/[...nextauth]/route.ts`
- ✅ `app/api/profiles/route.ts`
- ✅ `app/api/messages/route.ts`
- ✅ `lib/store.ts`
- ✅ `README.md`

## Files to Create 📝

### 1. `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 2. `app/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}

body {
  color: rgb(var(--foreground-rgb));
  background: linear-gradient(
      to bottom,
      transparent,
      rgb(var(--background-end-rgb))
    )
    rgb(var(--background-start-rgb));
}
```

### 3. `app/layout.tsx`

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LinkedIn Profile Extractor - code2career_ai",
  description: "Extract LinkedIn profiles and send bulk messages",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
```

### 4. `app/page.tsx`

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center max-w-2xl p-8">
        <h1 className="text-5xl font-bold mb-4 text-gray-900">
          LinkedIn Profile Extractor
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect students and mentors on code2career_ai
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/student"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            <div className="text-3xl mb-2">🎓</div>
            <div>I'm a Student</div>
          </Link>

          <Link
            href="/mentor"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 px-8 rounded-xl shadow-lg transition-all transform hover:scale-105"
          >
            <div className="text-3xl mb-2">👨‍🏫</div>
            <div>I'm a Mentor</div>
          </Link>
        </div>

        <Link
          href="/dashboard"
          className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-all"
        >
          View Dashboard
        </Link>
      </div>
    </main>
  );
}
```

### 5. `components/SessionProvider.tsx`

```tsx
"use client";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

export default function SessionProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <NextAuthSessionProvider session={session}>
      {children}
    </NextAuthSessionProvider>
  );
}
```

### 6. `app/student/page.tsx`

```tsx
"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "next";

export default function StudentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      // Register profile
      fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "student" }),
      }).then(() => router.push("/dashboard"));
    }
  }, [session, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Student Registration
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Connect with LinkedIn to register as a student
        </p>

        {status === "loading" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          </div>
        )}

        {status === "unauthenticated" && (
          <button
            onClick={() => signIn("linkedin", { callbackUrl: "/student" })}
            className="w-full bg-[#0077B5] hover:bg-[#005f8e] text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Continue with LinkedIn
          </button>
        )}
      </div>
    </main>
  );
}
```

### 7. `app/mentor/page.tsx`

```tsx
"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "next";

export default function MentorPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "mentor" }),
      }).then(() => router.push("/dashboard"));
    }
  }, [session, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-900">
          Mentor Registration
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Connect with LinkedIn to register as a mentor
        </p>

        {status === "loading" && (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        )}

        {status === "unauthenticated" && (
          <button
            onClick={() => signIn("linkedin", { callbackUrl: "/mentor" })}
            className="w-full bg-[#0077B5] hover:bg-[#005f8e] text-white font-semibold py-4 px-6 rounded-lg flex items-center justify-center gap-3 transition-all"
          >
            <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Continue with LinkedIn
          </button>
        )}
      </div>
    </main>
  );
}
```

### 8. `app/dashboard/page.tsx`

```tsx
"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "next";
import { UserProfile } from "@/lib/store";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState<"all" | "student" | "mentor">("all");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, [filter]);

  const fetchProfiles = async () => {
    const url = filter === "all" ? "/api/profiles" : `/api/profiles?role=${filter}`;
    const res = await fetch(url);
    const data = await res.json();
    setProfiles(data.profiles || []);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const sendBulkMessage = async () => {
    if (!subject || !message || selectedIds.length === 0) {
      alert("Please fill in subject, message, and select at least one profile");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientIds: selectedIds,
          subject,
          body: message,
        }),
      });
      const data = await res.json();
      alert(`Message sent to ${data.sentTo} profiles!`);
      setSubject("");
      setMessage("");
      setSelectedIds([]);
    } catch (error) {
      alert("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Please sign in to view dashboard</p>
          <a href="/" className="text-blue-600 hover:underline">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => signOut()}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profiles List */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Profiles ({profiles.length})</h2>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-4 py-2"
              >
                <option value="all">All</option>
                <option value="student">Students</option>
                <option value="mentor">Mentors</option>
              </select>
            </div>

            <div className="space-y-3">
              {profiles.map((profile) => (
                <div
                  key={profile.linkedinId}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(profile.linkedinId)}
                    onChange={() => toggleSelection(profile.linkedinId)}
                    className="w-5 h-5"
                  />
                  <img
                    src={profile.profilePicture || "/default-avatar.png"}
                    alt={profile.fullName}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{profile.fullName}</h3>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                    <p className="text-xs text-gray-400">ID: {profile.linkedinId}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      profile.role === "mentor"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {profile.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Message Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Send Message</h2>
            <p className="text-sm text-gray-600 mb-4">
              Selected: {selectedIds.length} profiles
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Enter subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  placeholder="Enter your message"
                />
              </div>

              <button
                onClick={sendBulkMessage}
                disabled={sending || selectedIds.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-semibold py-3 rounded-lg transition-all"
              >
                {sending ? "Sending..." : `Send to ${selectedIds.length} Selected`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
```

## Quick Setup Commands

```bash
# Clone and install
git clone https://github.com/RzLetsCode/linkedin-profile-extractor.git
cd linkedin-profile-extractor
npm install

# Configure environment
cp .env.example .env
# Edit .env with your LinkedIn credentials

# Run development server
npm run dev
```

## All files are ready to use! 🎉
