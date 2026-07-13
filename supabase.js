const supabaseUrl = "https://egfqxcbhoiylnzlvlwhn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnZnF4Y2Job2l5bG56bHZsd2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NDQ1NTMsImV4cCI6MjA5OTEyMDU1M30.DDRSbsrVqtiteW0tAbZM8S-XxZhtOrN59WMrc9gGmMM";

const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);