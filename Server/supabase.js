const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://vpkolnbwmqntvtwajxzg.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwa29sbmJ3bXFudHZ0d2FqeHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI4MDM5MzksImV4cCI6MjA0ODM3OTkzOX0.JyGcKZD8dqSANjj9XFqFiIbaFF9VRUQhS7SQ7d7NQ5Y"
);

module.exports = supabase;
