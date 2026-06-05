import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { ImagePlus, X } from 'lucide-react';
import { productSchema, type ProductFormValues } from '../types/product.schema';

const EMPTY: ProductFormValues = {
  name: '',
  slug: '',
  description: '',
  category_id: '',
  status: 'draft',
  base_price: 0,
  image: null,
};

// Shared input styling, so every field looks the same without repeating the string.
const field =
  'w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm placeholder-zinc-400 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

interface ProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  submitLabel: string;
  isSubmitting?: boolean;
  showImageField?: boolean;
}

export function ProductForm({
  defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting,
  showImageField = false,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { ...EMPTY, ...defaultValues },
  });

  // The image is a form field. We only *derive* a preview URL from it — no state.
  const image = watch('image');
  const preview = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image],
  );
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ---------- Main column ---------- */}
        <div className="space-y-6 lg:col-span-2">
          {/* Product details */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-900">
              Product details
            </h3>
            <p className="text-xs text-zinc-500">
              Basic information shown to customers.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-800">
                  Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pixel-9 Phone"
                  {...register('name')}
                  className={field}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-800">
                  Slug <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="auto-generated from name"
                  {...register('slug')}
                  className={field}
                />
                {errors.slug ? (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.slug.message}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-zinc-500">
                    Used in URLs. Lowercase letters, numbers, and dashes only.
                  </p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-800">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe the product..."
                  {...register('description')}
                  className={field}
                />
              </div>
            </div>
          </section>

          {/* Media (create only) */}
          {showImageField && (
            <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-semibold text-zinc-900">Media</h3>
              <p className="text-xs text-zinc-500">
                Optional cover image. JPG, PNG, or WebP, up to 2&nbsp;MB.
              </p>

              <div className="mt-5">
                {preview ? (
                  <div className="relative overflow-hidden rounded-xl border border-zinc-200">
                    <img
                      src={preview}
                      alt="Cover preview"
                      className="h-56 w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setValue('image', null, { shouldValidate: true })
                      }
                      className="absolute right-2 top-2 rounded-lg bg-white/90 p-1.5 text-zinc-700 shadow-sm transition hover:bg-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex h-56 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 text-zinc-500 transition hover:border-emerald-400 hover:bg-emerald-50/40">
                    <ImagePlus className="h-7 w-7" />
                    <span className="text-sm font-medium">
                      Click to upload a cover image
                    </span>
                    <span className="text-xs text-zinc-400">
                      JPG, PNG, WebP — optional
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        setValue('image', e.target.files?.[0] ?? null, {
                          shouldValidate: true,
                        })
                      }
                    />
                  </label>
                )}
              </div>

              {errors.image && (
                <p className="mt-2 text-xs text-red-600">
                  {errors.image.message}
                </p>
              )}
            </section>
          )}

          {/* Pricing */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-900">Pricing</h3>
            <p className="text-xs text-zinc-500">
              Base price for this product. Variants can override.
            </p>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium text-zinc-800">
                Base price <span className="text-red-600">*</span>
              </label>
              <div className="relative max-w-xs">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-zinc-500">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  {...register('base_price')}
                  className={`${field} pl-7`}
                />
              </div>
              {errors.base_price && (
                <p className="mt-1 text-xs text-red-600">
                  {errors.base_price.message}
                </p>
              )}
            </div>
          </section>
        </div>

        {/* ---------- Sidebar column ---------- */}
        <div className="space-y-6">
          {/* Status */}
          <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-900">Status</h3>
            <p className="text-xs text-zinc-500">
              Controls storefront visibility.
            </p>

            <div className="mt-5">
              <select {...register('status')} className={field}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </section>

          {/* Category (from the API) */}
          {/* <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-zinc-900">Category</h3>
            <p className="text-xs text-zinc-500">
              Group this product in the catalog.
            </p>

            <div className="mt-5">
              <select
                {...register('category')}
                disabled={categories.isLoading}
                className={field}
              >
                <option value="">
                  {categories.isLoading ? 'Loading…' : '— No category —'}
                </option>
                {categories.data?.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {categories.isError && (
                <p className="mt-1 text-xs text-red-600">
                  Couldn't load categories.
                </p>
              )}
            </div>
          </section> */}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-2 border-t border-zinc-200 pt-5">
        <Link
          to="/products"
          className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:opacity-60"
        >
          {isSubmitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
