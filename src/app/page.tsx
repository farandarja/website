import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Car,
  Lock,
  MoonStar,
  ShowerHead,
  Tent,
  UtensilsCrossed,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { attractions, news } from '@/lib/data';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-1');
  const featuredAttractions = attractions.slice(0, 3);
  const latestNews = news.slice(0, 2);

  const facilities = [
    { name: 'Gazebo', icon: <Tent className="h-8 w-8" /> },
    { name: 'Kamar Bilas', icon: <ShowerHead className="h-8 w-8" /> },
    { name: 'Loker', icon: <Lock className="h-8 w-8" /> },
    { name: 'Food Court', icon: <UtensilsCrossed className="h-8 w-8" /> },
    { name: 'Area Parkir', icon: <Car className="h-8 w-8" /> },
    { name: 'Mushola', icon: <MoonStar className="h-8 w-8" /> },
  ];

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg mb-4">
            Serunya Bermain Air Bersama Keluarga di Sirkus Waterpark!
          </h1>
          <p className="max-w-2xl text-lg md:text-xl mb-8 drop-shadow-md">
            Nikmati hari yang tak terlupakan dengan puluhan wahana air yang
            menantang dan fasilitas lengkap untuk kenyamanan Anda.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg">
            <Link href="/beli-tiket">Beli Tiket Sekarang</Link>
          </Button>
        </div>
      </section>

      <section id="wahana" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Wahana Unggulan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAttractions.map((attraction) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === attraction.imageId
              );
              return (
                <Card
                  key={attraction.id}
                  className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  <CardHeader className="p-0">
                    {image && (
                      <div className="aspect-w-16 aspect-h-9">
                         <Image
                          src={image.imageUrl}
                          alt={attraction.name}
                          width={600}
                          height={400}
                          className="object-cover w-full h-full"
                          data-ai-hint={image.imageHint}
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="font-headline text-2xl mb-2">
                      {attraction.name}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {attraction.description.substring(0, 100)}...
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/wahana">
                Lihat Semua Wahana <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="fasilitas" className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Fasilitas Kami
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center text-foreground">
            {facilities.map((facility) => (
              <div
                key={facility.name}
                className="flex flex-col items-center gap-4"
              >
                <div className="bg-white p-4 rounded-full shadow-md text-primary">
                  {facility.icon}
                </div>
                <p className="font-semibold">{facility.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="berita" className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Berita & Info Terbaru
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {latestNews.map((item) => {
              const image = PlaceHolderImages.find(
                (img) => img.id === item.imageId
              );
              return (
                <Card
                  key={item.id}
                  className="flex flex-col md:flex-row overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  {image && (
                    <div className="md:w-1/3">
                       <Image
                        src={image.imageUrl}
                        alt={item.title}
                        width={400}
                        height={400}
                        className="object-cover h-full w-full"
                        data-ai-hint={image.imageHint}
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col justify-between md:w-2/3">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {item.category}
                      </Badge>
                      <h3 className="font-headline text-xl font-bold mb-2">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {new Date(item.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                    <Button asChild variant="link" className="p-0 self-start">
                      <Link href={`/berita/${item.slug}`}>
                        Baca Selengkapnya{' '}
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild>
              <Link href="/berita">
                Lihat Semua Berita <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
