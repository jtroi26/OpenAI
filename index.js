require('dotenv').config();
const OpenAI = require('openai').OpenAI;
const openai = new OpenAI;

async function main(){
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are Coder Pastrana AI, akind and friendly chatbot.'
      },
      {
        role: 'user',
        content: 'Hi! How can I help you today?'
      }
    ],

  });

  console.log(response.choices[0].message.content);

}

main()