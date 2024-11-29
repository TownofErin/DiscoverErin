-- Update categories table with sequential IDs
UPDATE categories
SET id = subquery.rn
FROM (
    SELECT id, row_number() OVER () as rn
    FROM categories
) subquery
WHERE categories.id = subquery.id;

-- Update sub_categories table with sequential IDs
UPDATE sub_categories
SET id = subquery.rn
FROM (
    SELECT id, row_number() OVER () as rn
    FROM sub_categories
) subquery
WHERE sub_categories.id = subquery.id;

-- Update sub_categories with correct category references
UPDATE sub_categories
SET category = CAST(categories.id AS TEXT)
FROM categories
WHERE LOWER(sub_categories.category) = categories.slug;
