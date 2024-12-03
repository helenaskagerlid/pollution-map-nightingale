const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  "https://lmwlrtrohgoyrcrxseiw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxtd2xydHJvaGdveXJjcnhzZWl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2MTA2NTIsImV4cCI6MjA0ODE4NjY1Mn0.q0uj6et82YeOxNUDjRNU-iZwa-QvOedD0VlRSQDUY-0"
);

module.exports = supabase;
