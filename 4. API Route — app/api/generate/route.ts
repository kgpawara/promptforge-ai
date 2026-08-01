import { auth } from '@clerk/nextjs/server';
import { z } from 'zod';
const schema = z.object({ input: z.string().min(5).max(5000), category: z.string(), model: z.string(), framework: z.string(), style: z.string(), advanced: z.any() });

export async function POST(req: Request) {
  const { userId } = auth(); if(!userId) return new Response('Unauthorized', {status:401});
  const body = schema.parse(await req.json());
  const prompt = await generatePrompt(body);
  // deduct credits, save to DB
  return Response.json({ prompt });
}