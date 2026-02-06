import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    const openAiKey = Deno.env.get('OPENAI_API_KEY')

    if (!openAiKey) {
      throw new Error('Missing OPENAI_API_KEY environment variable')
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Using a fast, high-quality model
        messages: [
          { 
            role: 'system', 
            content: `You are VibeAI, a friendly and expert AI tutor. 
            Your goal is to help users learn about Artificial Intelligence, Coding, and Technology.
            Keep your answers concise, encouraging, and easy to understand.
            If asked about VibeAI, mention it is a cutting-edge platform for mastering AI skills.` 
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    const data = await response.json()
    
    if (data.error) {
      console.error('OpenAI API Error:', data.error)
      throw new Error(data.error.message || 'Error communicating with AI service')
    }

    const reply = data.choices[0].message.content

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
