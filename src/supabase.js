import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kzwouovhgbdledejhuxh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6d291b3ZoZ2JkbGVkZWpodXhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MTc4MzcsImV4cCI6MjA4NzM5MzgzN30.GKKtXOclw_5K2VwQW-XYtltzh0QD_wgF0Qgu_JVoDwY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
