import { Gallery } from "./components/gallery";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Sparkles } from "lucide-react";

export default function CandidPage() {
  const candidImages = PlaceHolderImages.filter(img => img.id.startsWith('candid-'));

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Galeri Candid
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            Lihat momen-momen seru di Sirkus Waterplay yang terabadikan.
          </p>
        </div>
        <Gallery images={candidImages} />

      </div>
    </div>
  );
}
