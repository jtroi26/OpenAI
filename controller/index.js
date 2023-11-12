require('dotenv').config();
const OpenAI = require('openai').OpenAI;
const openai = new OpenAI;

exports.getIndexPage = (req, res) => {
    res.render('index', { chatResponse: null });
};

exports.postChatResponse = async (req, res) => {
    try {
        const userInput = req.body.userInput || 'Hi! How can I help you today?';

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are DAZSMA.AI, a kind and friendly chatbot.'
                },
                {
                    role: 'user',
                    content: userInput
                }
            ],
        });

        res.render('index', { chatResponse: response.choices[0].message.content });
    } catch (error) {
        console.error('Error fetching chat response:', error);
        res.status(500).send('Internal Server Error');
    }
};
