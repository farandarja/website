"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { CalendarIcon, User, Mail, Phone } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  ticketType: z.enum(["anak", "dewasa", "keluarga"], {
    required_error: "Anda harus memilih tipe tiket.",
  }),
  visitDate: z.date({
    required_error: "Tanggal kunjungan harus diisi.",
  }),
  name: z.string().min(2, { message: "Nama harus memiliki minimal 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  phone: z.string().min(10, { message: "Nomor telepon minimal 10 digit." }),
});

export function TicketForm() {
  const router = useRouter();
  const { toast } = useToast();

  // ✅ kontrol popover kalender
  const [dateOpen, setDateOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch("/api/tickets/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketType: values.ticketType,
          visitDate: values.visitDate.toISOString(),
          name: values.name,
          email: values.email,
          phone: values.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast({
          title: "Gagal membuat transaksi",
          description: data?.error ?? "Terjadi kesalahan",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Transaksi dibuat",
        description: "Mengarahkan ke pembayaran Midtrans...",
      });

      window.location.href = data.redirectUrl;
    } catch (e: any) {
      toast({
        title: "Error",
        description: e?.message ?? "Terjadi kesalahan",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="ticketType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Pilih Jenis Tiket</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="anak" />
                    </FormControl>
                    <FormLabel className="font-normal">Anak (Rp 50.000)</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="dewasa" />
                    </FormControl>
                    <FormLabel className="font-normal">Dewasa (Rp 75.000)</FormLabel>
                  </FormItem>

                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="keluarga" />
                    </FormControl>
                    <FormLabel className="font-normal">Paket Keluarga (Rp 220.000)</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visitDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Pilih Tanggal Kunjungan</FormLabel>

              {/* ✅ Popover controlled */}
              <Popover open={dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      type="button"
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: id })
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      if (!date) return;
                      field.onChange(date);
                      // ✅ auto close setelah pilih tanggal
                      setDateOpen(false);
                    }}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                    locale={id}
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input placeholder="John Doe" {...field} className="pl-10" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Email</FormLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} className="pl-10" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input type="tel" placeholder="081234567890" {...field} className="pl-10" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Memproses..." : "Bayar Sekarang"}
        </Button>
      </form>
    </Form>
  );
}
