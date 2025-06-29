exports.handler = async function(event, context) {
  const body = JSON.parse(event.body);
  const userQuestion = body.question;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "너는 유쾌한 감정형 AI '올디'야. 짧고 찰지게 대답해." },
        { role: "user", content: userQuestion }
      ]
    })
  });

  const data = await response.json();

  // 실제 응답 구조에서 answer만 뽑아서 보내기
  return {
    statusCode: 200,
    body: JSON.stringify({
      answer: data.choices?.[0]?.message?.content || "GPT 응답 없음"
    })
  };
};

