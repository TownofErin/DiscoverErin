-- Create contact_submissions table
CREATE TABLE contact_submissions (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create business_submissions table
CREATE TABLE business_submissions (
    id BIGSERIAL PRIMARY KEY,
    -- Basic Information (Required)
    name TEXT NOT NULL,
    category INTEGER NOT NULL REFERENCES categories(id),
    sub_category INTEGER REFERENCES sub_categories(id),
    locations INTEGER NOT NULL REFERENCES communities(id),
    
    -- Location Information
    address1 TEXT NOT NULL,
    address2 TEXT,
    postal_code TEXT NOT NULL,
    google_maps TEXT,
    lat DOUBLE PRECISION,
    lon DOUBLE PRECISION,
    
    -- Contact Information
    phone TEXT,
    email TEXT NOT NULL,
    website TEXT,
    facebook TEXT,
    instagram TEXT,
    
    -- Business Details
    summary TEXT,
    picture TEXT,
    
    -- Metadata
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_business_submissions_updated_at
    BEFORE UPDATE ON business_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for common queries
CREATE INDEX idx_business_submissions_status ON business_submissions(status);
CREATE INDEX idx_business_submissions_category ON business_submissions(category);
CREATE INDEX idx_business_submissions_locations ON business_submissions(locations);
CREATE INDEX idx_business_submissions_submitted_at ON business_submissions(submitted_at DESC);

CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);

-- Add RLS policies for security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_submissions ENABLE ROW LEVEL SECURITY;

-- Policy for contact submissions (only insert for authenticated users)
CREATE POLICY "Enable insert for authenticated users only" ON contact_submissions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policies for business submissions
CREATE POLICY "Enable insert for authenticated users only" ON business_submissions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON business_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow public to submit without authentication (if needed)
CREATE POLICY "Enable public insert" ON contact_submissions
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Enable public insert" ON business_submissions
    FOR INSERT TO anon
    WITH CHECK (true);

-- Comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from website visitors';
COMMENT ON TABLE business_submissions IS 'Stores business submissions for review and approval';

COMMENT ON COLUMN business_submissions.status IS 'Current status of the business submission: pending, approved, or rejected';
COMMENT ON COLUMN business_submissions.picture IS 'URL to the business photo in the upload bucket';
COMMENT ON COLUMN business_submissions.facebook IS 'Facebook profile URL for the business';
COMMENT ON COLUMN business_submissions.instagram IS 'Instagram profile URL for the business';
