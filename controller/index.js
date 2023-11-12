exports.postChatResponse = async (req, res) => {
        try {
            const userInput = req.body.userInput || 'Hi! How can I help you today?';
    
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You DAZSMA.AI, a kind and friendly chatbot.'
                    },
                    {
                        role: 'user',
                        content: userInput
                    }
                ],
                max_tokens: 64, // Set the maximum number of tokens in the response
            });
    
            const truncatedResponse = response.choices[0].message.content;
    
            // Ensure the response has at most 64 tokens
            const tokens = truncatedResponse.split(' ');
            if (tokens.length > 64) {
                truncatedResponse = tokens.slice(0, 64).join(' ') + '...';
            }
    
            res.render('index', { chatResponse: truncatedResponse });
        } catch (error) {
            console.error('Error fetching chat response:', error);
            res.status(500).send('Internal Server Error');
        }
    };