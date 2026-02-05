import { CheckCircle, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { QrCodeIcon } from '@/components/icons/qr-code-icon';

export default function KonfirmasiPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-2xl py-16 lg:py-24 px-4 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">
          Pembelian Berhasil!
        </h1>
        <p className="text-muted-foreground text-lg mb-8">
          E-ticket Anda telah berhasil dibuat. Tunjukkan QR code di bawah ini di pintu masuk.
        </p>

        <Card className="text-left shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <span>E-Ticket Sirkus Splash</span>
                <span className="text-sm font-medium text-primary">PAID</span>
            </CardTitle>
            <CardDescription>Order ID: #WP123456789</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nama</p>
                <p className="font-semibold">John Doe</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Tanggal Kunjungan</p>
                <p className="font-semibold">{new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Jenis Tiket</p>
                <p className="font-semibold">1x Paket Keluarga (2 Dewasa, 2 Anak)</p>
              </div>
            </div>
            <div className="md:col-span-1 flex flex-col items-center justify-center bg-secondary p-4 rounded-lg">
                <QrCodeIcon className="h-24 w-24 text-foreground"/>
                <p className="text-xs text-muted-foreground mt-2">Scan di Pintu Masuk</p>
            </div>
          </CardContent>
          <Separator className="my-4"/>
          <CardFooter className="flex justify-end">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Unduh E-Ticket
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
