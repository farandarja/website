import { TicketForm } from "./ticket-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function BeliTiketPage() {
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="lg:col-span-1">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4">
              Beli Tiket Online
            </h1>
            <p className="text-muted-foreground text-lg">
              Amankan tiket Anda sekarang dan lewati antrean! Proses cepat, mudah, dan aman.
            </p>
            <Card className="mt-8 bg-background/70">
              <CardHeader>
                <CardTitle>Harga Tiket Masuk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Weekdays (Senin-Kamis)</span>
                  <span className="font-bold text-primary">Rp 30.000</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Weekends (Jumat-Minggu)</span>
                  <span className="font-bold text-primary">Rp 40.000</span>
                </div> 
                 <p className="text-xs text-muted-foreground pt-4">*Harga tiket weekends berlaku untuk kunjungan hari libur sekolah/libur nasional.
                 <br />*Harga tiket berlaku untuk semua umur.</p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
             <Card className="shadow-2xl">
              <CardHeader>
                <CardTitle>Pesan Tiket Anda</CardTitle>
                <CardDescription>Isi formulir di bawah ini untuk melanjutkan.</CardDescription>
              </CardHeader>
              <CardContent>
                <TicketForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
