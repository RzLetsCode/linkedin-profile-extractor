import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import {
  saveMessage,
  getAllMessages,
  getProfilesByIds,
  Message,
} from "@/lib/store";
import { v4 as uuidv4 } from "crypto";

// GET /api/messages - list all sent messages
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const messages = getAllMessages();
  return NextResponse.json({ success: true, total: messages.length, messages });
}

// POST /api/messages - send message to selected profile IDs
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { recipientIds, subject, body: messageBody } = body;

  if (!recipientIds || !Array.isArray(recipientIds) || recipientIds.length === 0) {
    return NextResponse.json(
      { error: "recipientIds must be a non-empty array" },
      { status: 400 }
    );
  }

  if (!subject || !messageBody) {
    return NextResponse.json(
      { error: "subject and body are required" },
      { status: 400 }
    );
  }

  // Validate recipients exist in our store
  const recipients = getProfilesByIds(recipientIds);
  if (recipients.length === 0) {
    return NextResponse.json(
      { error: "No valid recipients found" },
      { status: 404 }
    );
  }

  const results: { id: string; name: string; email: string; status: string }[] = [];

  // Send to each recipient
  // NOTE: LinkedIn Messaging API requires special permissions (not in basic OAuth)
  // This sends via email as fallback, or you can integrate SendGrid/Nodemailer
  for (const recipient of recipients) {
    try {
      // Simulate sending (replace with real email/notification service)
      // await sendEmail(recipient.email, subject, messageBody);
      results.push({
        id: recipient.linkedinId,
        name: recipient.fullName,
        email: recipient.email,
        status: "sent",
      });
    } catch (error) {
      results.push({
        id: recipient.linkedinId,
        name: recipient.fullName,
        email: recipient.email,
        status: "failed",
      });
    }
  }

  // Log the message
  const message: Message = {
    id: Math.random().toString(36).substring(2),
    senderId: session.user.linkedinId || session.user.email || "unknown",
    recipientIds,
    subject,
    body: messageBody,
    sentAt: new Date().toISOString(),
    status: results.every((r) => r.status === "sent") ? "sent" : "failed",
  };

  saveMessage(message);

  return NextResponse.json({
    success: true,
    messageId: message.id,
    sentTo: results.filter((r) => r.status === "sent").length,
    failed: results.filter((r) => r.status === "failed").length,
    results,
  });
}
