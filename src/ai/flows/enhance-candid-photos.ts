'use server';

/**
 * @fileOverview A flow to enhance the resolution of candid photos using GenAI.
 *
 * - enhanceCandidPhoto - A function that enhances the resolution of a given photo.
 * - EnhanceCandidPhotoInput - The input type for the enhanceCandidPhoto function.
 * - EnhanceCandidPhotoOutput - The return type for the enhanceCandidPhoto function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceCandidPhotoInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to be enhanced, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EnhanceCandidPhotoInput = z.infer<typeof EnhanceCandidPhotoInputSchema>;

const EnhanceCandidPhotoOutputSchema = z.object({
  enhancedPhotoDataUri: z
    .string()
    .describe('The enhanced photo, as a data URI.'),
});
export type EnhanceCandidPhotoOutput = z.infer<typeof EnhanceCandidPhotoOutputSchema>;

export async function enhanceCandidPhoto(input: EnhanceCandidPhotoInput): Promise<EnhanceCandidPhotoOutput> {
  return enhanceCandidPhotoFlow(input);
}

const enhanceCandidPhotoPrompt = ai.definePrompt({
  name: 'enhanceCandidPhotoPrompt',
  input: {schema: EnhanceCandidPhotoInputSchema},
  output: {schema: EnhanceCandidPhotoOutputSchema},
  prompt: [
    {media: {url: '{{photoDataUri}}'}},
    {text: 'Enhance the resolution and quality of the image.'},
  ],
  model: 'googleai/gemini-2.5-flash-image-preview',
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const enhanceCandidPhotoFlow = ai.defineFlow(
  {
    name: 'enhanceCandidPhotoFlow',
    inputSchema: EnhanceCandidPhotoInputSchema,
    outputSchema: EnhanceCandidPhotoOutputSchema,
  },
  async input => {
    const {media} = await enhanceCandidPhotoPrompt(input);
    return {enhancedPhotoDataUri: media.url!};
  }
);
