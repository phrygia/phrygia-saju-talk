export const GUNGHAP_CATEGORIES = [
  "romance",
  "marriage",
  "personality",
  "wealth",
  "conversation",
  "conflict",
] as const;

export type GunghapCategory = (typeof GUNGHAP_CATEGORIES)[number];

export type Side = "me" | "partner";

export const AVATAR: Record<Side, string> = { me: "🌙", partner: "☀️" };

export const ROLE_LABEL: Record<Side, string> = {
  me: "나 · Me",
  partner: "상대방 · Partner",
};
