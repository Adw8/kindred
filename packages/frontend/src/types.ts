export type Friend = {
  id: number;
  name: string;
  birthday: string;
  info: string;
};

export type UserProfile = {
  id: string; // user's ID from Supabase
  email: string; // user's email from Supabase
  username: string | null; // for display name
  avatar_url: string | null; // URL for user's avatar image
  bio: string | null; // a short user biography
};
