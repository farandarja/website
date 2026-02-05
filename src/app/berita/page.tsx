import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { news } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function BeritaPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Berita & Informasi
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            Ikuti terus promo, event, dan pengumuman terbaru dari Sirkus Waterpark.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => {
            const image = PlaceHolderImages.find(img => img.id === item.imageId);
            return (
              <Card key={item.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {image && (
                    <CardHeader className="p-0">
                        <Image
                            src={image.imageUrl}
                            alt={item.title}
                            width={600}
                            height={400}
                            className="object-cover w-full h-48"
                            data-ai-hint={image.imageHint}
                        />
                    </CardHeader>
                )}
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-2">
                        <Badge variant={item.category === 'Promo' ? 'default' : 'secondary'}>
                            {item.category}
                        </Badge>
                        <p className="text-xs text-muted-foreground">
                        {new Date(item.date).toLocaleDateString("id-ID", {
                            day: 'numeric', month: 'long', year: 'numeric'
                        })}
                        </p>
                    </div>
                    <h3 className="font-headline text-xl font-bold mb-4 line-clamp-2">{item.title}</h3>
                  </div>
                  <Link href={`/berita/${item.slug}`} className="text-sm font-semibold text-primary hover:underline flex items-center mt-4">
                    Baca Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
