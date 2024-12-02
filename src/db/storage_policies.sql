-- Enable RLS for storage
CREATE POLICY "Enable public upload access"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'upload');

-- Enable public read access
CREATE POLICY "Enable public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'upload');

-- Enable public update access
CREATE POLICY "Enable public update access"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'upload');

-- Enable public delete access
CREATE POLICY "Enable public delete access"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'upload');
