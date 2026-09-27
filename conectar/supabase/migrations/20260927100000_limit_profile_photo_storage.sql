update storage.buckets
set
  file_size_limit = 307200,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp']
where id = 'profile-photos';
