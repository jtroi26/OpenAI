require('dotenv').config();
const OpenAI = require('openai').OpenAI;
const openai = new OpenAI;

exports.getIndexPage = (req, res) => {
    const chatHistory = req.session.chatHistory || [];
    res.render('index', { chatHistory });
};

exports.postChatResponse = async (req, res) => {
    try {
        const userInput = req.body.userInput || 'Hi! How can I help you today?';

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are DAZSMA.AI, a kind and friendly chatbot.' },
                { role: 'user', content: userInput }
            ],
        });

        // Update the chat history in the session
        req.session.chatHistory = [
            ...(req.session.chatHistory || []),
            { role: 'user', content: userInput },
            { role: 'bot', content: response.choices[0].message.content }
        ];

        res.redirect('/');
    } catch (error) {
        console.error('Error fetching chat response:', error);
        res.status(500).send('Internal Server Error');
    }
};
