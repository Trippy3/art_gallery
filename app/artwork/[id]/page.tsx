import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artworks } from "@/lib/data/artworks";
import { ArtworkDetailClient } from "./artwork-detail-client";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const artwork = artworks.find((a) => a.id === Number.parseInt(id));

  if (!artwork) {
    return {
      title: "作品が見つかりません | Aviary's Art Gallery",
    };
  }

  return {
    title: `${artwork.title} | Aviary's Art Gallery`,
    description: artwork.description,
    openGraph: {
      title: `${artwork.title} | Aviary's Art Gallery`,
      description: artwork.description,
      type: "article",
      images: [
        {
          url: artwork.image,
          alt: artwork.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${artwork.title} | Aviary's Art Gallery`,
      description: artwork.description,
      images: [artwork.image],
    },
  };
}

export default async function ArtworkDetailPage({ params }: Props) {
  const { id } = await params;
  const artwork = artworks.find((a) => a.id === Number.parseInt(id));

  if (!artwork) {
    notFound();
  }

  return <ArtworkDetailClient artwork={artwork} />;
}
