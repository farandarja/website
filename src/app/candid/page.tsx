import { UploadForm } from "./components/upload-form";
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
            Lihat momen-momen seru pengunjung kami. Abadikan juga momen Anda dan tingkatkan kualitasnya dengan sihir AI kami!
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-16">
          <div className="border-2 border-dashed border-primary/50 rounded-lg p-8 bg-secondary">
             <div className="text-center mb-4">
                <Sparkles className="h-10 w-10 text-primary mx-auto"/>
                <h2 className="text-2xl font-semibold mt-2">Tingkatkan Resolusi Foto Anda</h2>
                <p className="text-muted-foreground">Unggah foto candid Anda dan biarkan AI kami memperjelasnya.</p>
             </div>
            <UploadForm />
          </div>
        </div>

        <h2 className="text-3xl font-headline font-bold mb-8 text-center">Momen Pengunjung</h2>
        <Gallery images={candidImages} />

      </div>
    </div>
  );
}
