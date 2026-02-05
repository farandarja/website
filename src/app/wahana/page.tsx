import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { attractions } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function WahanaPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Semua Wahana Seru
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            Dari seluncuran yang memacu adrenalin hingga kolam santai, temukan petualangan air favoritmu di sini!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction) => {
            const image = PlaceHolderImages.find(img => img.id === attraction.imageId);
            return (
              <Card key={attraction.id} className="group overflow-hidden relative rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {image && (
                  <Image
                    src={image.imageUrl}
                    alt={attraction.name}
                    width={600}
                    height={800}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={image.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-3xl font-headline font-bold text-white mb-2 transition-transform duration-300 group-hover:-translate-y-2">
                    {attraction.name}
                  </h3>
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <p className="text-white/90">
                      {attraction.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
