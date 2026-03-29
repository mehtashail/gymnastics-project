import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import sharp from 'sharp';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MAX_IMAGE_DIMENSION = 1092; // Claude vision optimal

export interface AIFeedbackItem {
  category: 'strength' | 'needs_work' | 'safety';
  title: string;
  description: string;
}

export interface AIFeedback {
  overallImpression: string;
  items: AIFeedbackItem[];
  nextSteps: string[];
  encouragement: string;
  disclaimer: string;
  analyzedFrameCount: number;
}

const SYSTEM_PROMPT = `You are a friendly, encouraging gymnastics coach helping a parent understand their daughter's gymnastics technique.
The parent has NO gymnastics background, so use plain English and avoid technical jargon.
When you must use a technical term, immediately explain it in parentheses.

Analyze the provided video frames and return ONLY valid JSON matching this exact structure:
{
  "overallImpression": "2-3 sentences summarizing what you see in plain English",
  "items": [
    {
      "category": "strength" | "needs_work" | "safety",
      "title": "Short label (5 words max)",
      "description": "1-2 sentences in plain English, explaining WHY it matters"
    }
  ],
  "nextSteps": ["Actionable suggestion 1", "Actionable suggestion 2", "Actionable suggestion 3"],
  "encouragement": "A warm, specific encouraging message for a young gymnast",
  "disclaimer": "Always include: This AI feedback is for educational purposes only. Always work with a qualified gymnastics coach for proper training and safety.",
  "analyzedFrameCount": <number of frames you can see>
}

Guidelines:
- Include 2-4 strengths (things done well)
- Include 2-4 needs_work items (frame as opportunities, not failures)
- Only include safety items if there is a genuine safety concern
- Never say "deduction" — say "judges notice and take off points for..."
- Be warm and encouraging throughout
- If the video quality is poor or you cannot clearly see the gymnastics skill, say so in overallImpression
- Do not hallucinate technique details you cannot actually see`;

export async function analyzeWithClaude(framePaths: string[], skillId: string): Promise<AIFeedback> {
  // Resize and encode frames
  const imageContents: Anthropic.Messages.ImageBlockParam[] = [];

  for (const framePath of framePaths) {
    try {
      const resized = await sharp(framePath)
        .resize(MAX_IMAGE_DIMENSION, MAX_IMAGE_DIMENSION, {
          fit: 'inside',
          withoutEnlargement: true,
        })
        .jpeg({ quality: 85 })
        .toBuffer();

      const base64 = resized.toString('base64');
      imageContents.push({
        type: 'image',
        source: {
          type: 'base64',
          media_type: 'image/jpeg',
          data: base64,
        },
      });
    } catch {
      // Skip frames that can't be processed
    }
  }

  if (imageContents.length === 0) {
    throw new Error('Could not process any video frames. Please try a different video format.');
  }

  const response = await client.messages.create({
    model: 'claude-opus-4-6',
    max_tokens: 2048,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          ...imageContents,
          {
            type: 'text',
            text: `These are ${imageContents.length} evenly-spaced frames from a gymnastics video showing the skill with ID: "${skillId}". Please analyze the gymnast's technique and provide feedback in the JSON format specified. Focus on what a parent with no gymnastics background would find helpful and encouraging.`,
          },
        ],
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response format from AI');
  }

  // Extract JSON from the response (handle markdown code blocks if present)
  let jsonText = content.text.trim();
  const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]+?)\s*```/);
  if (jsonMatch) {
    jsonText = jsonMatch[1];
  }

  try {
    const feedback = JSON.parse(jsonText) as AIFeedback;
    feedback.analyzedFrameCount = imageContents.length;
    return feedback;
  } catch {
    throw new Error('AI returned invalid response format. Please try again.');
  }
}
