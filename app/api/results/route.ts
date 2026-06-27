import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { accuracy, score, totalQuestions, wrongTopics } = await req.json()

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey || apiKey.includes('your-')) {
      const fb = accuracy >= 75
        ? "Excellent work! You are mastering these concepts. Keep this momentum going!"
        : accuracy >= 50
        ? "Good effort! Review the explanations for wrong answers and focus on weak topics daily."
        : "Every attempt teaches you something new. Revisit NCERT basics and retry. Consistency is key!"
      return NextResponse.json({ feedback: fb })
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 200,
        messages: [
          {
            role: 'user',
            content: 'Give 2-3 sentences of warm, specific NEET feedback. Score: ' + accuracy + '% (' + score + '/' + totalQuestions + '). Weak topics: ' + (wrongTopics?.join(', ') || 'mixed') + '. Be encouraging and end with motivation.'
          }
        ],
      }),
    })

    const data = await res.json()
    const text = data.choices?.[0]?.message?.content || 'Great effort! Keep practising!'
    return NextResponse.json({ feedback: text })

  } catch {
    return NextResponse.json({ feedback: 'Great effort! Review wrong answers and keep going!' })
  }
}