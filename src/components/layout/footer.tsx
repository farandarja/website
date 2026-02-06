import Link from "next/link";
import { Instagram, MessageCircle, Waves } from "lucide-react";
import { TikTokIcon } from "@/components/icons/tiktok-icon";

export function Footer() {
  const socialLinks = [
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, href: "#" },
    { name: "TikTok", icon: <TikTokIcon className="h-5 w-5" />, href: "#" },
    { name: "WhatsApp", icon: <MessageCircle className="h-5 w-5" />, href: "#" },
  ];

  const navLinks = [
    { href: "/wahana", label: "Wahana" },
    { href: "/fasilitas", label: "Fasilitas" },
    { href: "/berita", label: "Berita" },
    { href: "/beli-tiket", label: "Tiket" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Waves className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">Sirkus Waterplay</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Destinasi wisata air terbaik untuk keseruan tak terlupakan bersama keluarga.
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
                Jl. Raya Fantasi No. 123, Kota Bahagia, Indonesia
              </p>
              <p>
                <strong>Jam Buka:</strong><br />
                Setiap Hari: 09:00 - 17:00 WIB
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
