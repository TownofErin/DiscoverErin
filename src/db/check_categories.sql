-- Check categories table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'categories'
ORDER BY ordinal_position;

-- Check existing data in categories
SELECT * FROM categories LIMIT 5;

-- Check sub_categories table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'sub_categories'
ORDER BY ordinal_position;

-- Check communities table structure
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'communities'
ORDER BY ordinal_position;
