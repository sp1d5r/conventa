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

async function getArrayOfWords(phrase, difficulty) {
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

export default getArrayOfWords;
