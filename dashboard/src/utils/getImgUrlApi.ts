import { supabaseUrl } from '../constants';

export function getStorageUrl(bucket: string, path: string) {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
