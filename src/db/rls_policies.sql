-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE places ENABLE ROW LEVEL SECURITY;
ALTER TABLE sub_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

-- Create policies to allow anonymous read access
CREATE POLICY "Allow anonymous read access" ON categories
    FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anonymous read access" ON places
    FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anonymous read access" ON sub_categories
    FOR SELECT
    TO anon
    USING (true);

CREATE POLICY "Allow anonymous read access" ON communities
    FOR SELECT
    TO anon
    USING (true);
