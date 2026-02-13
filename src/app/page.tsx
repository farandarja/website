'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from "lucide-react";
import 'swiper/css';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Car,
  Lock,
  MoonStar,
  ShowerHead,
  Tent,
  UtensilsCrossed,
  MapPin,
} from "lucide-react";
import { Poppins, Quicksand } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500"],
}); 
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { attractions, news } from "@/lib/data";

export default function Home() {
  const heroImages = PlaceHolderImages.filter(img =>
  img.id.startsWith('hero'));
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
  }, 7000); 

  return () => clearInterval(interval);
}, [heroImages.length]);

const heroImage = heroImages[currentIndex];
const nextSlide = () => {
  setCurrentIndex((prev) => (prev + 1) % heroImages.length);
};

const prevSlide = () => {
  setCurrentIndex((prev) =>
    prev === 0 ? heroImages.length - 1 : prev - 1
  );
};
  const featuredAttractions = attractions.slice(0, 3);
  const latestNews = news.slice(0, 2);

  const facilities = [
    { name: "Area Bermain Anak", icon: <Tent className="h-8 w-8" /> },
    { name: "Kamar Bilas", icon: <ShowerHead className="h-8 w-8" /> },
    { name: "Loker", icon: <Lock className="h-8 w-8" /> },
    { name: "Food Court", icon: <UtensilsCrossed className="h-8 w-8" /> },
    { name: "Area Parkir", icon: <Car className="h-8 w-8" /> },
    { name: "Mushola", icon: <MoonStar className="h-8 w-8" /> },
  ];

  return (
  <div className="flex flex-col">
    {/* <style jsx global>{style}</style> */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
  {heroImage && (
    <Image
      src={heroImage.imageUrl}
      alt={heroImage.description}
      fill
      className="object-cover"
      priority
    />
  )}

  <button
  onClick={prevSlide}
  className="absolute left-6 top-1/2 -translate-y-1/2 
  bg-yellow-400
  text-gray-900
  w-16 h-16 rounded-full
  flex items-center justify-center
  transition-all duration-300
  hover:scale-110 active:scale-95
  animate-waterFloat"
  style={{
    boxShadow: "0 0 15px rgba(255, 221, 0, 0.7), 0 0 35px rgba(255, 221, 0, 0.5)"
  }}
>
  <ChevronLeft className="w-8 h-8 stroke-[3]" />
</button>

<button
  onClick={nextSlide}
  className="absolute right-6 top-1/2 -translate-y-1/2 
  bg-yellow-400
  text-gray-900
  w-16 h-16 rounded-full
  flex items-center justify-center
  transition-all duration-300
  hover:scale-110 active:scale-95
  animate-waterFloat"
  style={{
    boxShadow: "0 0 15px rgba(255, 221, 0, 0.7), 0 0 35px rgba(255, 221, 0, 0.5)"
  }}
>
  <ChevronRight className="w-8 h-8 stroke-[3]" />
</button>

</section>

<section className="relative py-28 text-center overflow-hidden 
bg-gradient-to-br from-[#ffe9a8] via-[#7dd3fc] via-[#c4b5fd] to-[#86efac]">


  <div className="container mx-auto px-4 max-w-4xl">

    <h2
  className={`
    ${poppins.className}
    text-4xl md:text-6xl font-extrabold mb-6
    letter-animate
  `}
>
  {"SIRKUS WATERPLAY".split("").map((char, index) => (
  <span
    key={index}
    style={{ animationDelay: `${index * 0.08}s` }}
  >
    {char === " " ? "\u00A0" : char}
  </span>
))}
</h2>

    <p
      className={`
        ${quicksand.className}
        text-lg md:text-xl leading-relaxed tracking-wide
        animate-colorShift
        font-medium
      `}
    >
      Indoor waterpark pertama di Indonesia dibangun tahun 2013 adalah tempat rekreasi yang sangat cocok untuk anak-anak. Didesain dengan konsep ala pertunjukan sirkus, Waterboom ini juga melindungi anak-anak dari kepanasan dan kehujanan, ada kolam air panas, lantai dari rubber yang safety dan nyaman. Ada fasilitas sauna dan Mom n Baby Spa membuat Sirkus Waterplay menjadi tempat favorite bagi keluarga
    </p>

  </div>
</section>

      {/* WAHANA */}
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

      {/* FASILITAS */}
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

      {/* ======= SECTION LOKASI ======= */}
      <section id="lokasi" className="py-16 lg:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
            Lokasi Kami
          </h2>

          <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="Lokasi Sirkus Waterplay"
              src="https://www.google.com/maps?q=Sirkus+Waterplay+Jatiasih+Bekasi&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Sirkus+Waterplay+Jatiasih+Bekasi"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-primary text-primary-foreground text-center py-3 font-semibold hover:underline cursor-pointer"
            >
              🎪 Klik di sini untuk melihat lokasi Sirkus Waterplay 🎪
            </a>
          </div>
        </div>
      </section>
      {/* BERITA */}
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
                        {new Date(item.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Button asChild variant="link" className="p-0 self-start">
                      <Link href={`/berita/${item.slug}`}>
                        Baca Selengkapnya{" "}
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
