const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://qgmcdylmdodofjpuuklq.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnbWNkeWxtZG9kb2ZqcHV1a2xxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExNjkzMzAsImV4cCI6MjA2Njc0NTMzMH0.Q3dbZtBZOZXwPL73kF1TR-asuum7vAcBMqbo-ihaN7k';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
