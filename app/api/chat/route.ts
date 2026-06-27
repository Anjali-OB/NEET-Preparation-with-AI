import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { messages, systemContext } = await req.json()

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey || apiKey.includes('your-')) {
      return NextResponse.json({
        content: "Hi! I am your AI Mentor. To enable live AI responses, add your GROQ_API_KEY to .env.local (get it FREE at console.groq.com - no credit card needed). For now, explore the Quiz Engine, Syllabus, and Diagrams pages!"
      })
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1024,
        messages: [
          {
            role: 'system',
            content: `You are an AI Study Mentor for a Maharashtra student preparing for NEET 2025 and MHT-CET.

STRICT RULES — follow every time:
1. NEVER use ASCII art, text diagrams, tables made of dashes, or code blocks (no triple backticks ever)
2. Use **bold** for key terms and important words
3. Use bullet points with - for lists (keep them short)
4. Keep responses under 200 words unless the student specifically asks for a detailed explanation
5. Always use Indian context: mention NEET marks, NCERT chapters, Maharashtra board
6. Be warm, friendly, like a brilliant elder sibling who cracked NEET
7. If student asks about a diagram or structure, DESCRIBE it in plain words with bold labels — do NOT draw it
8. End every response with one short encouraging line

${systemContext ? 'Student context: ' + systemContext : ''}`
          },
          ...messages
        ],
      }),
    })

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content || 'Sorry, try again!'
    return NextResponse.json({ content: text })

  } catch (err: any) {
    return NextResponse.json({
      content: 'Connection issue - check your GROQ_API_KEY in .env.local and try again.'
    })
  }
}