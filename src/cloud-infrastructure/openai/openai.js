import axios from "axios";

function getNumberOfWordsFromDifficulty(difficulty) {
  console.log("difficulty", difficulty);
  if (difficulty === 0) {
    return 5;
  } else if (difficulty === 1) {
    return 10;
  } else {
    return 15;
  }
}

export async function getArrayOfWords(phrase, difficulty) {
  const prompt = `Create an list split by a new line of ${getNumberOfWordsFromDifficulty(
    difficulty
  )} words related to the topic "${phrase}":\n`;
  const { data: response } = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 70,
      temperature: 0.5,
      top_p: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
      },
    }
  );

  const arr = response.choices[0]["text"].split("\n");
  const cleaned_arr = arr.map((str) => str.replace(/\s/g, ""));
  return cleaned_arr.filter((elem) => elem.length > 1);
}

export async function getNextChatConversation(
  context,
  AIName,
  myName,
  goal,
  difficulty,
  previousConversation
) {
  const openAIPrompt = `${previousConversation}
(This is the previous conversation between the user and the AI, you can tell who is who by looking at sender.)

Context: ${context}
AI's Name: ${AIName}
Users Name: ${myName}
Users Goal: ${goal}
Difficulty for user to achieve the goal: ${difficulty} (easy/medium/hard)

Give me the next element in the array, where the AI responds:
RESPONSE = `;

  const { data: response } = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: openAIPrompt,
      max_tokens: 70,
      temperature: 0.5,
      top_p: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
      },
    }
  );
  console.log(response.choices[0].text);

  return JSON.parse(response.choices[0].text);
}

export async function getChatConversationFeedback(
  context,
  AIName,
  myName,
  goal,
  difficulty,
  previousConversation
) {
  const openAIPrompt = `${previousConversation}
(This is the previous conversation between the user and the AI, you can tell who is who by looking at sender.)

Context: ${context}
AI's Name: ${AIName}
Users Name: ${myName}
Users Goal: ${goal}
Difficulty for user to achieve the goal: ${difficulty} (easy/medium/hard)

Give the user some feedback on his negotiation and how he can make it better.
RESPONSE = `;

  const { data: response } = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      model: "text-davinci-003",
      prompt: openAIPrompt,
      max_tokens: 70,
      temperature: 0.5,
      top_p: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPEN_AI_KEY}`,
      },
    }
  );
  console.log(response.choices[0].text);

  return response.choices[0].text;
}
