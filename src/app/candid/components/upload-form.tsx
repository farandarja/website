"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Sparkles, Image as ImageIcon, CircleArrowRight } from "lucide-react";
import { enhancePhotoAction } from "../actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const initialState = {
  success: false,
  message: "",
  enhancedPhotoDataUri: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? (
        <>
          <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
          Meningkatkan...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Tingkatkan Foto
        </>
      )}
    </Button>
  );
}

export function UploadForm() {
  const [state, formAction] = useFormState(enhancePhotoAction, initialState);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "Berhasil!" : "Oops!",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
    }
  }, [state, toast]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoDataUri(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setPhotoDataUri(null);
    state.enhancedPhotoDataUri = undefined;
    state.message = "";
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if(formRef.current) {
        formRef.current.reset();
    }
  };

  if (state.success && state.enhancedPhotoDataUri) {
    return (
        <div className="space-y-4">
            <h3 className="text-center text-xl font-semibold">Hasil Peningkatan Foto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="space-y-2 text-center">
                    <p className="font-medium">Sebelum</p>
                    {photoDataUri && <Image src={photoDataUri} alt="Original" width={400} height={400} className="rounded-lg mx-auto" />}
                </div>
                 <div className="space-y-2 text-center">
                    <p className="font-medium text-primary">Sesudah (Dengan AI)</p>
                    <Image src={state.enhancedPhotoDataUri} alt="Enhanced" width={400} height={400} className="rounded-lg border-2 border-primary mx-auto" />
                </div>
            </div>
             <Button onClick={handleReset} variant="outline" className="w-full">Unggah Foto Lain</Button>
        </div>
    )
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <input
        type="file"
        name="photo"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <input type="hidden" name="photoDataUri" value={photoDataUri || ""} />

      {!photoDataUri ? (
        <Card
          className="bg-background/50 border-2 border-dashed hover:border-primary hover:bg-background transition-all"
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="p-6 text-center cursor-pointer">
            <UploadCloud className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2 font-semibold">Klik untuk mengunggah</p>
            <p className="text-sm text-muted-foreground">
              Pilih foto dari perangkat Anda (PNG, JPG)
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          <div className="relative w-fit mx-auto">
            <Image
              src={photoDataUri}
              alt="Preview"
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-3 -right-3 h-7 w-7 rounded-full"
              onClick={handleReset}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <SubmitButton />
        </div>
      )}

      {state.message && !state.success && (
         <Alert variant="destructive">
            <AlertTitle>Gagal Memproses</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
         </Alert>
      )}
    </form>
  );
}
