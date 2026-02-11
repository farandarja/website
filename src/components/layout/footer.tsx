import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";


export function Footer() {
  const socialLinks = [
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/sirkuswaterplay" },
    { name: "TikTok", icon: <TikTokIcon className="h-5 w-5" />, href: "https://www.tiktok.com/@sirkuswaterplayjatiasih?_r=1&_t=ZS-93h0vWDXcUk" },
    { name: "WhatsApp", icon: <MessageCircle className="h-5 w-5" />, href: "https://wa.me/08176988578" },
  ];

  const navLinks = [
    { href: "/wahana", label: "Wahana" },
    { href: "/fasilitas", label: "Fasilitas" },
    { href: "/berita", label: "Berita" },
    { href: "/beli-tiket", label: "Tiket" },
  ];

  const logo = PlaceHolderImages.find(img => img.id === "logo");

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
            {logo && (
              <Image src={logo.imageUrl} alt="Sirkus Waterplay Logo" width={32} height={32} className="object-contain"/>
              )}
              <span className="text-xl font-bold font-headline">Sirkus Waterplay</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Destinasi wisata air terbaik untuk keseruan tak terlupakan bersama keluarga.Indoor Waterpark Ngga keujanan Ngga kepanasan Ada kolam air hangat, Sauna, Gym Gratis Bisa Pijat Refleksi, Baby Spa dan Salon Muslimah Kedai Kupi ada
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Informasi</h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Alamat:</strong><br />
                Jl. Wibawa Mukti II No.4, RT.001/RW.5, Jatiasih, Kec. Jatiasih, Kota Bekasi, Jawa Barat 17423
              </p>
              <p>
                <strong>Jam Buka:</strong><br />
                Weekdays: 08:00 - 17:00 WIB<br />
                Weekend: 08:00 - 17:30 WIB
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Ikuti Kami</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-background rounded-full text-muted-foreground hover:text-primary hover:bg-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sirkus Waterplay. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}