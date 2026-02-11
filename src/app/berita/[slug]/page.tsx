import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";

import { news } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default async function BeritaDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const item = news.find((n) => n.slug === slug);

  if (!item) {
    notFound();
  }
  

  const image = PlaceHolderImages.find((img) => img.id === item.imageId);

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-4xl px-4 py-16 lg:py-24">
        <article>
          <header className="mb-8">
            <Badge variant={item.category === 'Promo' ? 'default' : 'secondary'} className="mb-4">{item.category}</Badge>
            <h1 className="text-3xl md:text-5xl font-headline font-extrabold tracking-tight mb-4">
              {item.title}
            </h1>
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <Calendar className="h-4 w-4" />
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString("id-ID", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          {image && (
            <div className="my-8 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={image.imageUrl}
                alt={item.title}
                width={1200}
                height={600}
                className="w-full object-cover aspect-video"
                priority
                data-ai-hint={image.imageHint}
              />
            </div>
          )}

          <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-foreground/80 prose-headings:text-foreground prose-strong:text-foreground">
            <p>{item.content}</p>
            <p>
              Jangan lewatkan kesempatan ini untuk menciptakan kenangan indah bersama orang-orang tercinta. Sirkus Waterpark selalu berkomitmen untuk memberikan pengalaman terbaik bagi setiap pengunjung. Kami menantikan kedatangan Anda!
            </p>
             <p>
              Untuk informasi lebih lanjut mengenai promo, event, atau wahana kami, jangan ragu untuk menghubungi layanan pelanggan kami atau mengikuti akun media sosial kami. Sampai jumpa di Sirkus Waterplay, tempat serunya bermain air bersama keluarga!
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return news.map((item) => ({
    slug: item.slug,
  }));
}
