import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kzwouovhgbdledejhuxh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6d291b3ZoZ2JkbGVkZWpodXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTc4MzcsImV4cCI6MjA4NzM5MzgzN30.GKKtXOclw_5K2VwQW-XYtltzh0QD_wgF0Qgu_JVoDwY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const sbSignUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };
  return { user: data.user, session: data.session };
};

export const sbSignIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  return { user: data.user, session: data.session };
};

export const sbSignOut = async () => {
  await supabase.auth.signOut();
};

export const sbGetSession = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session;
};

export const sbOnAuthChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback);
};
