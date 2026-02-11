"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Tent,
  ShowerHead,
  Lock,
  UtensilsCrossed,
  Car,
  MoonStar,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FasilitasPage() {
  const galleryImages = [
    { id: "gallery-1", imageUrl: "/images/galeri/kolam2.png" },
    { id: "gallery-2", imageUrl: "/images/galeri/kolam1.png" },
    { id: "gallery-3", imageUrl: "/images/galeri/kolam3.png" },
    { id: "gallery-4", imageUrl: "/images/galeri/kolam4.png" },
  ];

  const facilities = [
    {
      name: "Area Bermain Anak",
      icon: <Tent className="h-10 w-10" />,
      images: [
        "/images/fasilitas/bermain-anak/1.png",
        "/images/fasilitas/bermain-anak/2.png",
      ],
    },
    {
      name: "Kamar Bilas",
      icon: <ShowerHead className="h-10 w-10" />,
      images: [
        "/images/fasilitas/kamar-bilas/1.png",
        "/images/fasilitas/kamar-bilas/2.png",
      ],
    },
    {
      name: "Loker",
      icon: <Lock className="h-10 w-10" />,
      images: [
        "/images/fasilitas/loker/1.png",
        "/images/fasilitas/loker/2.png",
      ],
    },
    {
      name: "Food Court",
      icon: <UtensilsCrossed className="h-10 w-10" />,
      images: [
        "/images/fasilitas/food-court/1.png",
        "/images/fasilitas/food-court/2.png",
      ],
    },
    {
      name: "Area Parkir",
      icon: <Car className="h-10 w-10" />,
      images: [
        "/images/fasilitas/parkir/1.png",
        "/images/fasilitas/parkir/2.png",
      ],
    },
    {
      name: "Mushola",
      icon: <MoonStar className="h-10 w-10" />,
      images: [
        "/images/fasilitas/mushola/1.png",
        "/images/fasilitas/mushola/2.png",
      ],
    },
  ];

  const [selectedFacility, setSelectedFacility] = useState(null);

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Fasilitas & Tur Virtual
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            Jelajahi setiap sudut Sirkus Waterplay dan temukan semua fasilitas
            yang kami sediakan untuk kenyamanan liburan Anda.
          </p>
        </div>

        {/* GALERI FOTO */}
        <section id="virtual-tour" className="mb-20">
          <h2 className="text-3xl font-headline font-bold mb-8 text-center">
            Galeri Foto
          </h2>
          <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {galleryImages.map((image) => (
                <CarouselItem key={image.id}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src={image.imageUrl}
                        alt="Galeri Sirkus Waterplay"
                        width={1200}
                        height={700}
                        className="object-cover aspect-[16/9] w-full"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-14" />
            <CarouselNext className="mr-14" />
          </Carousel>
        </section>

        {/* FASILITAS PENDUKUNG */}
        <section id="fasilitas-pendukung">
          <h2 className="text-3xl font-headline font-bold mb-8 text-center">
            Fasilitas Pendukung
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {facilities.map((facility) => (
              <Card
                key={facility.name}
                onClick={() => setSelectedFacility(facility)}
                className="cursor-pointer flex flex-col items-center justify-center p-6 hover:shadow-xl hover:bg-secondary transition-all duration-300">
                <div className="text-primary mb-3">{facility.icon}</div>
                <h3 className="font-semibold text-foreground">
                  {facility.name}
                </h3>
              </Card>
            ))}
          </div>
        </section>

        {/* MODAL FOTO FASILITAS */}
        {selectedFacility && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-background rounded-xl shadow-xl max-w-4xl w-full relative p-6">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-3 right-3"
                onClick={() => setSelectedFacility(null)}
              >
                <X className="h-5 w-5" />
              </Button>

              <h3 className="text-2xl font-bold mb-4 text-center">
                {selectedFacility.name}
              </h3>

              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {selectedFacility.images.map((img, index) => (
                    <CarouselItem key={index}>
                      <Image
                        src={img}
                        alt={selectedFacility.name}
                        width={1200}
                        height={700}
                        className="object-cover aspect-[16/9] w-full rounded-lg"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
