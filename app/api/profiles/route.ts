import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  saveProfile,
  getAllProfiles,
  getProfilesByRole,
  UserProfile,
} from "@/lib/store";

// GET /api/profiles - list all profiles (optional filter by role)
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") as "student" | "mentor" | null;

  const profiles = role ? getProfilesByRole(role) : getAllProfiles();

  return NextResponse.json({
    success: true,
    total: profiles.length,
    profiles,
  });
}

// POST /api/profiles - register/upsert a profile after LinkedIn OAuth
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { role } = body;

  if (!role || !["student", "mentor"].includes(role)) {
    return NextResponse.json(
      { error: "Invalid role. Must be student or mentor" },
      { status: 400 }
    );
  }

  // Fetch latest profile from LinkedIn API
  const linkedinRes = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  });

  if (!linkedinRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch LinkedIn profile" },
      { status: 500 }
    );
  }

  const linkedinData = await linkedinRes.json();

  const profile: UserProfile = {
    id: linkedinData.sub,
    linkedinId: linkedinData.sub,
    firstName: linkedinData.given_name || "",
    lastName: linkedinData.family_name || "",
    fullName: linkedinData.name || "",
    email: linkedinData.email || "",
    profilePicture: linkedinData.picture || "",
    headline: body.headline || "",
    location: body.location || "",
    role,
    joinedAt: new Date().toISOString(),
  };

  saveProfile(profile);

  return NextResponse.json({
    success: true,
    message: "Profile saved successfully",
    profile,
  });
}
