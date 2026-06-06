"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { products } from "@/data/products";
import {
  IMPORTED_PRODUCT_IMAGES,
  IMPORTED_VIDEOS,
} from "@/data/asset-report";

type AssetStatus = "loading" | "ok" | "broken";

interface AssetCheck {
  path: string;
  status: AssetStatus;
}

interface ProductAssetRow {
  slug: string;
  displayName: string;
  sku: string;
  heroImage: string;
  video: string | null;
  variantImages: { sku: string; path: string }[];
}

function StatusBadge({ status }: { status: AssetStatus }) {
  const styles = {
    loading: "bg-amber-100 text-amber-800",
    ok: "bg-emerald-100 text-emerald-800",
    broken: "bg-red-100 text-red-800",
  };
  const labels = { loading: "Loading…", ok: "OK", broken: "BROKEN" };
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function ImageProbe({
  path,
  label,
  onStatus,
}: {
  path: string;
  label: string;
  onStatus: (path: string, status: AssetStatus) => void;
}) {
  const [status, setStatus] = useState<AssetStatus>("loading");

  const report = useCallback(
    (next: AssetStatus) => {
      setStatus(next);
      onStatus(path, next);
    },
    [path, onStatus]
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="truncate text-xs font-medium text-slate-600">{label}</p>
        <StatusBadge status={status} />
      </div>
      <p className="mb-2 break-all font-mono text-[10px] text-slate-500">{path}</p>
      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-md bg-slate-50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={path}
          alt={label}
          className="max-h-full max-w-full object-contain"
          onLoad={() => report("ok")}
          onError={() => report("broken")}
        />
      </div>
    </div>
  );
}

function VideoProbe({
  path,
  label,
  onStatus,
}: {
  path: string;
  label: string;
  onStatus: (path: string, status: AssetStatus) => void;
}) {
  const [status, setStatus] = useState<AssetStatus>("loading");

  const report = useCallback(
    (next: AssetStatus) => {
      setStatus(next);
      onStatus(path, next);
    },
    [path, onStatus]
  );

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="truncate text-xs font-medium text-slate-600">{label}</p>
        <StatusBadge status={status} />
      </div>
      <p className="mb-2 break-all font-mono text-[10px] text-slate-500">{path}</p>
      <div className="overflow-hidden rounded-md bg-slate-900">
        <video
          src={path}
          className="h-40 w-full object-contain"
          muted
          playsInline
          loop
          autoPlay
          onLoadedData={() => report("ok")}
          onError={() => report("broken")}
        />
      </div>
    </div>
  );
}

export function AssetDiagnostics() {
  const [imageStatuses, setImageStatuses] = useState<Record<string, AssetStatus>>({});
  const [videoStatuses, setVideoStatuses] = useState<Record<string, AssetStatus>>({});

  const productRows: ProductAssetRow[] = useMemo(
    () =>
      products.map((p) => ({
        slug: p.slug,
        displayName: p.displayName,
        sku: p.sku,
        heroImage: p.image,
        video: p.video ?? null,
        variantImages: p.variants.map((v) => ({ sku: v.sku, path: v.image })),
      })),
    []
  );

  const allMappedImagePaths = useMemo(() => {
    const paths = new Set<string>();
    for (const p of products) {
      paths.add(p.image);
      for (const v of p.variants) paths.add(v.image);
    }
    return [...paths].sort();
  }, []);

  const allMappedVideoPaths = useMemo(() => {
    return products
      .filter((p) => p.video)
      .map((p) => p.video as string)
      .sort();
  }, []);

  const allImportedImagePaths = useMemo(
    () => IMPORTED_PRODUCT_IMAGES.map((f) => `/products/${f}`),
    []
  );

  const allImportedVideoPaths = useMemo(
    () => IMPORTED_VIDEOS.map((f) => `/videos/${f}`),
    []
  );

  const handleImageStatus = useCallback((path: string, status: AssetStatus) => {
    setImageStatuses((prev) => ({ ...prev, [path]: status }));
  }, []);

  const handleVideoStatus = useCallback((path: string, status: AssetStatus) => {
    setVideoStatuses((prev) => ({ ...prev, [path]: status }));
  }, []);

  const countBroken = (statuses: Record<string, AssetStatus>, paths: string[]) =>
    paths.filter((p) => statuses[p] === "broken").length;

  const countOk = (statuses: Record<string, AssetStatus>, paths: string[]) =>
    paths.filter((p) => statuses[p] === "ok").length;

  const countLoading = (statuses: Record<string, AssetStatus>, paths: string[]) =>
    paths.filter((p) => !statuses[p] || statuses[p] === "loading").length;

  // Deduplicated broken count across all checked assets
  const allCheckedImagePaths = [...new Set([...allMappedImagePaths, ...allImportedImagePaths])];
  const allCheckedVideoPaths = [...new Set([...allMappedVideoPaths, ...allImportedVideoPaths])];
  const brokenImages = allCheckedImagePaths.filter((p) => imageStatuses[p] === "broken");
  const brokenVideos = allCheckedVideoPaths.filter((p) => videoStatuses[p] === "broken");
  const brokenAssetCount = brokenImages.length + brokenVideos.length;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-600">Loading asset diagnostics…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">
            Temporary diagnostics
          </p>
          <h1 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Asset Path Verification
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Every image and video is rendered in-browser. Status is set by actual{" "}
            <code className="rounded bg-white px-1">onLoad</code> /{" "}
            <code className="rounded bg-white px-1">onError</code> events — not assumed from
            mappings.
          </p>
        </header>

        {/* Summary */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-500">Products</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">{products.length}</p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-500">Images checked</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {allCheckedImagePaths.length}
            </p>
            <p className="mt-1 text-xs text-emerald-600">
              {countOk(imageStatuses, allCheckedImagePaths)} OK ·{" "}
              {countLoading(imageStatuses, allCheckedImagePaths)} loading
            </p>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-xs font-medium text-slate-500">Videos checked</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {allCheckedVideoPaths.length}
            </p>
            <p className="mt-1 text-xs text-emerald-600">
              {countOk(videoStatuses, allCheckedVideoPaths)} OK ·{" "}
              {countLoading(videoStatuses, allCheckedVideoPaths)} loading
            </p>
          </div>
          <div
            className={`rounded-xl p-5 shadow-sm ${
              brokenAssetCount > 0 ? "bg-red-50 ring-1 ring-red-200" : "bg-emerald-50 ring-1 ring-emerald-200"
            }`}
          >
            <p className="text-xs font-medium text-slate-500">Broken assets</p>
            <p
              className={`mt-1 text-3xl font-bold ${
                brokenAssetCount > 0 ? "text-red-700" : "text-emerald-700"
              }`}
            >
              {brokenAssetCount}
            </p>
            <p className="mt-1 text-xs text-slate-600">
              {brokenImages.length} images · {brokenVideos.length} videos
            </p>
          </div>
        </section>

        {/* Broken list */}
        {brokenAssetCount > 0 && (
          <section className="mb-8 rounded-xl border border-red-200 bg-red-50 p-6">
            <h2 className="font-display text-lg font-bold text-red-900">Failed assets</h2>
            <ul className="mt-3 space-y-1 font-mono text-sm text-red-800">
              {brokenImages.map((p) => (
                <li key={p}>✕ {p}</li>
              ))}
              {brokenVideos.map((p) => (
                <li key={p}>✕ {p}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Per-product table */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-xl font-bold text-slate-900">
            Product mappings
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-slate-700">Slug</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Display name</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">SKU</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Hero image</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Image status</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Video path</th>
                  <th className="px-4 py-3 font-semibold text-slate-700">Video status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {productRows.map((row) => (
                  <tr key={row.slug} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono text-xs">{row.slug}</td>
                    <td className="px-4 py-3">{row.displayName}</td>
                    <td className="px-4 py-3 font-mono text-xs">{row.sku}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 font-mono text-xs text-slate-600">
                      {row.heroImage}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={imageStatuses[row.heroImage] ?? "loading"} />
                    </td>
                    <td className="max-w-[200px] truncate px-4 py-3 font-mono text-xs text-slate-600">
                      {row.video ?? "—"}
                    </td>
                    <td className="px-4 py-3">
                      {row.video ? (
                        <StatusBadge status={videoStatuses[row.video] ?? "loading"} />
                      ) : (
                        <span className="text-xs text-slate-400">N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Product cards with rendered assets */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-xl font-bold text-slate-900">
            Product renders
          </h2>
          <div className="space-y-8">
            {productRows.map((row) => (
              <div
                key={row.slug}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-lg font-bold text-slate-900">
                    {row.displayName}
                  </h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs text-slate-600">
                    {row.slug}
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <ImageProbe
                    path={row.heroImage}
                    label={`Hero — ${row.slug}`}
                    onStatus={handleImageStatus}
                  />
                  {row.variantImages
                    .filter((v) => v.path !== row.heroImage)
                    .map((v) => (
                      <ImageProbe
                        key={v.path}
                        path={v.path}
                        label={`Variant ${v.sku}`}
                        onStatus={handleImageStatus}
                      />
                    ))}
                  {row.video ? (
                    <VideoProbe
                      path={row.video}
                      label={`Video — ${row.slug}`}
                      onStatus={handleVideoStatus}
                    />
                  ) : (
                    <div className="flex h-full min-h-[180px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-400">
                      No video mapped
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All imported images (including unmapped) */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-xl font-bold text-slate-900">
            All imported images ({allImportedImagePaths.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allImportedImagePaths.map((path) => (
              <ImageProbe
                key={path}
                path={path}
                label={path.split("/").pop() ?? path}
                onStatus={handleImageStatus}
              />
            ))}
          </div>
        </section>

        {/* All imported videos */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-xl font-bold text-slate-900">
            All imported videos ({allImportedVideoPaths.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allImportedVideoPaths.map((path) => (
              <VideoProbe
                key={path}
                path={path}
                label={path.split("/").pop() ?? path}
                onStatus={handleVideoStatus}
              />
            ))}
          </div>
        </section>

        {/* Mapped-only unique paths */}
        <section>
          <h2 className="mb-4 font-display text-xl font-bold text-slate-900">
            Unique mapped image paths ({allMappedImagePaths.length})
          </h2>
          <ul className="rounded-xl border border-slate-200 bg-white p-4 font-mono text-xs text-slate-700">
            {allMappedImagePaths.map((path) => (
              <li key={path} className="flex items-center justify-between gap-4 py-1">
                <span>{path}</span>
                <StatusBadge status={imageStatuses[path] ?? "loading"} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
