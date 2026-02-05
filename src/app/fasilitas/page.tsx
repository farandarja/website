import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Clock, MapPin, Phone, Tent, ShowerHead, Lock, UtensilsCrossed, Car, MoonStar } from 'lucide-react';

export default function FasilitasPage() {
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery-'));
  const facilityIcons = [
    { name: 'Gazebo', icon: <Tent className="h-10 w-10" /> },
    { name: 'Kamar Bilas', icon: <ShowerHead className="h-10 w-10" /> },
    { name: 'Loker', icon: <Lock className="h-10 w-10" /> },
    { name: 'Food Court', icon: <UtensilsCrossed className="h-10 w-10" /> },
    { name: 'Area Parkir', icon: <Car className="h-10 w-10" /> },
    { name: 'Mushola', icon: <MoonStar className="h-10 w-10" /> },
  ];

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Fasilitas & Tur Virtual
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-muted-foreground">
            Jelajahi setiap sudut Sirkus Waterpark dan temukan semua fasilitas yang kami sediakan untuk kenyamanan liburan Anda.
          </p>
        </div>

        <section id="virtual-tour" className="mb-20">
          <h2 className="text-3xl font-headline font-bold mb-8 text-center">Galeri Foto</h2>
          <Carousel className="w-full max-w-4xl mx-auto" opts={{ loop: true }}>
            <CarouselContent>
              {galleryImages.map((image) => (
                <CarouselItem key={image.id}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={1200}
                        height={700}
                        className="object-cover aspect-[16/9] w-full"
                        data-ai-hint={image.imageHint}
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

        <section id="informasi" className="mb-20">
            <h2 className="text-3xl font-headline font-bold mb-8 text-center">Informasi Penting</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Clock className="h-8 w-8 text-primary"/>
                        <CardTitle>Jam Operasional</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">Setiap Hari</p>
                        <p className="text-muted-foreground">09:00 - 17:00 WIB</p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <MapPin className="h-8 w-8 text-primary"/>
                        <CardTitle>Alamat Lengkap</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">Jl. Raya Fantasi No. 123</p>
                        <p className="text-muted-foreground">Kota Bahagia, Indonesia</p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <Phone className="h-8 w-8 text-primary"/>
                        <CardTitle>Kontak Kami</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-semibold">Telepon: (021) 123-4567</p>
                        <p className="text-muted-foreground">WhatsApp: 0812-3456-7890</p>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-8 rounded-lg overflow-hidden shadow-lg">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                    <Image src="https://picsum.photos/seed/map/1200/400" width={1200} height={400} alt="Peta Lokasi Sirkus Waterpark" className="w-full" data-ai-hint="map location"/>
                </a>
            </div>
        </section>

        <section id="fasilitas-pendukung">
          <h2 className="text-3xl font-headline font-bold mb-8 text-center">Fasilitas Pendukung</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {facilityIcons.map(facility => (
              <Card key={facility.name} className="flex flex-col items-center justify-center p-6 hover:shadow-xl hover:bg-secondary transition-all duration-300">
                <div className="text-primary mb-3">{facility.icon}</div>
                <h3 className="font-semibold text-foreground">{facility.name}</h3>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
