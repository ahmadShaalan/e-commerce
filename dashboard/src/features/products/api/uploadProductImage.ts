import { supabaseUrl } from '../../../constants';
import { httpClient } from '../../../lib/httpClient';

const BUCKET = 'product-images';

export async function uploadProductImage(
  productId: string,
  file: File,
): Promise<string> {
  // 1. A predictable path inside the bucket: one cover image per product.
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${productId}/cover.${ext}`;

  // 2. Upload the raw file to Supabase Storage's REST API.
  //    Absolute URL → Axios ignores the api instance's /rest/v1 baseURL,
  //    but the request interceptor still attaches the admin's Bearer token.
  await httpClient.post(
    `${supabaseUrl}/storage/v1/object/${BUCKET}/${path}`,
    file,
    {
      headers: { 'Content-Type': file.type },
    },
  );

  // 3. Record the image row (the list's RPC reads storage_path from here).
  await httpClient.post(
    '/product_images',
    {
      product_id: productId,
      storage_path: path,
      is_primary: true,
      alt_text: '',
    },
    { headers: { Prefer: 'return=minimal' } },
  );

  return path;
}
