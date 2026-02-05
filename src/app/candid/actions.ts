"use server";

import { enhanceCandidPhoto } from "@/ai/flows/enhance-candid-photos";
import { z } from "zod";

const schema = z.object({
  photoDataUri: z.string().startsWith('data:image'),
});

type FormState = {
  success: boolean;
  message: string;
  enhancedPhotoDataUri?: string;
};

export async function enhancePhotoAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    const validatedFields = schema.safeParse({
      photoDataUri: formData.get("photoDataUri"),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: "Input tidak valid. Pastikan Anda mengunggah gambar.",
        enhancedPhotoDataUri: undefined,
      };
    }

    const { photoDataUri } = validatedFields.data;

    const result = await enhanceCandidPhoto({ photoDataUri });

    if (!result.enhancedPhotoDataUri) {
      throw new Error("Gagal meningkatkan kualitas foto.");
    }
    
    return {
      success: true,
      message: "Foto berhasil ditingkatkan!",
      enhancedPhotoDataUri: result.enhancedPhotoDataUri,
    };
  } catch (error) {
    console.error("Error enhancing photo:", error);
    const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan tidak diketahui.";
    return {
      success: false,
      message: `Gagal memproses gambar: ${errorMessage}`,
      enhancedPhotoDataUri: undefined,
    };
  }
}
