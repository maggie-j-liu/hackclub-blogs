import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { supabaseClient } from '../_shared/supabaseClient.ts'
import { corsHeaders } from '../_shared/cors.ts'

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    supabaseClient.auth.setAuth(req.headers.get('Authorization')!.replace('Bearer ', ''))
    
    await supabase.from("posts").insert(await req.json())

    return new Response(JSON.stringify({ {ok:200}, error }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }