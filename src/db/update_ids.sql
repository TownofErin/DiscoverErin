-- Add ID column to communities table
ALTER TABLE communities 
ADD COLUMN id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY;

-- Add ID column to places table
ALTER TABLE places 
ADD COLUMN id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY;

-- Now the sequences will automatically handle the sequential numbering
-- No need for manual updates since GENERATED ALWAYS AS IDENTITY 
-- will handle the sequential numbering automatically
