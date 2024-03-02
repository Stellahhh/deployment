import { createClient } from "@supabase/supabase-js";



// TODO: import from .env rather than manually type it out

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsdXRjZXV3enNzb2FtYmJ2Y3p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzODYwOTAsImV4cCI6MjAyMzk2MjA5MH0.Y8y-TKp7vy7bu5SGbKzjVNk5DFibPI8AvFP0YDzDo7M'

const SUPABASE_URL = 'https://wlutceuwzssoambbvczt.supabase.co'

// const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL

export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);
