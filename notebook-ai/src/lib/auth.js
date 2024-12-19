import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mhdnhudebkjjrpsjokhp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oZG5odWRlYmtqanJwc2pva2hwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzY3ODg2NSwiZXhwIjoyMDQ5MjU0ODY1fQ.HDAvXEli3IC5q27us91fKNd3iMwsSJ-mtMQdKgnpNlk'

const supabase = createClient(supabaseUrl, supabaseKey)

export { supabase }