// In-memory store for profiles and messages
// In production, replace with Prisma + DB

export interface UserProfile {
  id: string;
  linkedinId: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  profilePicture: string;
  role: "student" | "mentor";
  headline?: string;
  location?: string;
  joinedAt: string;
  selected?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  recipientIds: string[];
  subject: string;
  body: string;
  sentAt: string;
  status: "sent" | "failed" | "pending";
}

// Global in-memory store (use Redis/DB in production)
const store: {
  profiles: Map<string, UserProfile>;
  messages: Message[];
} = {
  profiles: new Map(),
  messages: [],
};

// Profile operations
export function saveProfile(profile: UserProfile): void {
  store.profiles.set(profile.linkedinId, profile);
}

export function getProfile(linkedinId: string): UserProfile | undefined {
  return store.profiles.get(linkedinId);
}

export function getAllProfiles(): UserProfile[] {
  return Array.from(store.profiles.values());
}

export function getProfilesByRole(role: "student" | "mentor"): UserProfile[] {
  return Array.from(store.profiles.values()).filter((p) => p.role === role);
}

export function getProfilesByIds(ids: string[]): UserProfile[] {
  return ids
    .map((id) => store.profiles.get(id))
    .filter(Boolean) as UserProfile[];
}

// Message operations
export function saveMessage(message: Message): void {
  store.messages.push(message);
}

export function getAllMessages(): Message[] {
  return store.messages;
}

export function getMessagesBySender(senderId: string): Message[] {
  return store.messages.filter((m) => m.senderId === senderId);
}
