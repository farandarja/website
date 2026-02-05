"use client";

import Image from "next/image";
import type { ImagePlaceholder } from "@/lib/placeholder-images";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type GalleryProps = {
  images: ImagePlaceholder[];
};

export function Gallery({ images }: GalleryProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {images.map((image) => (
        <Dialog key={image.id}>
          <DialogTrigger asChild>
            <div className="break-inside-avoid relative overflow-hidden rounded-lg shadow-md cursor-zoom-in group">
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={500}
                height={750}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={image.imageHint}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 border-0">
             <Image
                src={image.imageUrl}
                alt={image.description}
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-lg"
                data-ai-hint={image.imageHint}
              />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
