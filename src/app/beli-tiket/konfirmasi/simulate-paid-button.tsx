"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export function SimulatePaidButton({ orderCode }: { orderCode: string }) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const enabled = process.env.NEXT_PUBLIC_ENABLE_PAYMENT_SIM === "true";
  if (!enabled) return null;

  async function run() {
    try {
      setLoading(true);
      const secret = prompt("Masukkan PAYMENT_SIM_SECRET (sesuai .env.local) untuk simulasi bayar:");
      if (!secret) return;

      const res = await fetch("/api/dev/simulate-paid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderCode, secret }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast({
          title: "Simulasi gagal",
          description: data?.error ?? "Terjadi kesalahan",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Simulasi berhasil",
        description: "Status diubah menjadi PAID dan email sedang dikirim.",
      });
      window.location.reload();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant="secondary" onClick={run} disabled={loading}>
      {loading ? "Memproses..." : "Simulasi: Tandai Lunas (DEV)"}
    </Button>
  );
}
