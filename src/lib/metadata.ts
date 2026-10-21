import type { Metadata } from "next";

const site = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
export function pageMetadata(title: string, description: string, path = ""): Metadata {
  const url = site ? `${site}${path}` : undefined;
  return {
    title, description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { title, description, type: "website", ...(url ? { url, images: [`${site}/opengraph-image`] } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(url ? { images: [`${site}/opengraph-image`] } : {}) }
  };
}
