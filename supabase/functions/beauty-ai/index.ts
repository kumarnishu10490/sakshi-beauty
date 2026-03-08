import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompts: Record<string, string> = {
  "skin-analysis": `You are an expert AI Skin Analyst for Sakshi Beauty Parlour & Training Centre. 
Analyze the user's description of their skin and provide:
1. Detected skin type (Oily, Dry, Combination, Normal, Sensitive)
2. Key concerns (list 2-4 concerns)
3. 3-4 recommended treatments available at Sakshi Beauty Parlour with brief descriptions and approximate prices in INR.
Respond in a mix of Hindi and English (Hinglish). Be warm, professional, and encouraging.
Format your response as JSON with this structure:
{"skinType": "...", "concerns": ["...", "..."], "recommendations": [{"title": "...", "desc": "...", "price": "Starting ₹..."}]}`,

  hairstyle: `You are an AI Hairstyle Consultant for Sakshi Beauty Parlour & Training Centre.
Based on the user's description of their face shape, hair type, and preferences, suggest 5-6 hairstyles.
For each hairstyle provide a match percentage, name, and brief description.
Respond in English. Be enthusiastic and fashion-forward.
Format your response as JSON array:
[{"name": "...", "match": "92%", "desc": "..."}]`,

  consultant: `You are the AI Beauty Consultant for Sakshi Beauty Parlour & Training Centre located in India.
You help customers with:
- Skin care advice and facial treatment recommendations
- Hair care tips and treatment suggestions  
- Makeup tips for different occasions (bridal, party, daily)
- Beauty product recommendations
- Salon service information and pricing

Respond in Hinglish (mix of Hindi and English). Use emojis occasionally. Be warm, knowledgeable, and helpful.
Always mention Sakshi Beauty Parlour services when relevant with approximate prices in INR.
Keep responses concise but informative (under 200 words).`,

  "course-advisor": `You are the AI Course Advisor for Sakshi Beauty Parlour & Training Centre.
Based on the user's interests, experience level, time commitment, and goals, recommend 3 beauty courses.
For each course provide: title, duration, match percentage, and 4 key highlights.
Format your response as JSON array:
[{"title": "...", "duration": "...", "match": "95%", "highlights": ["...", "...", "...", "..."]}]`,
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const { type, messages, userMessage } = await req.json();

    const systemPrompt = systemPrompts[type];
    if (!systemPrompt) {
      return new Response(
        JSON.stringify({ error: `Unknown type: ${type}` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // For chat (consultant), use streaming; for others, use non-streaming
    const isChat = type === "consultant";

    const aiMessages = [
      { role: "system", content: systemPrompt },
      ...(messages || []),
      ...(userMessage ? [{ role: "user", content: userMessage }] : []),
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: aiMessages,
        stream: isChat,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errText = await response.text();
      console.error("AI gateway error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (isChat) {
      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    return new Response(
      JSON.stringify({ result: content }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("beauty-ai error:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
