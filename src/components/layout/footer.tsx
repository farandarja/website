import Link from "next/link";
import { Waves } from "lucide-react";

export function Footer() {
  const socialLinks = [
    { name: "Instagram : sirkuswaterplay" },
    { name: "Tiktok : sirkuswaterplayjatiasih" },
    { name: "Whatsapp : 08176988578" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Waves className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold font-headline">
                Sirkus Waterplay
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Destinasi wisata air terbaik untuk keseruan tak terlupakan bersama keluarga.Indoor Waterpark Ngga keujanan Ngga kepanasan
Ada kolam air hangat, Sauna, Gym Gratis
Bisa Pijat Refleksi, Baby Spa dan Salon Muslimah
Kedai Kupi ada
            </p>
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
                Weekdays: 08:00 - 17:00 WIB <br />
                Weekend: 08:00 - 17:30 WIB
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontak Kami</h4>
            <div className="flex flex-col space-y-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {social.name}
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
