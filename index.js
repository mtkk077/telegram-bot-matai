const TelegramBot = require('node-telegram-bot-api');


const token = '6873509842:AAHRA_SKnFwCQ3SpiEyhNHoqmJ6dC7CdHGU';
const bot = new TelegramBot(token, { polling: true });


const mainMenu = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'Language', callback_data: 'button1' }],
            [{ text: 'About', callback_data: 'button2' }],
            [{ text: 'Hello', callback_data: 'button3' }]
        ]
    }
};


const subMenu1 = {
    reply_markup: {
        inline_keyboard: [
            [{ text: 'english', callback_data: 'subbutton1-1' }],
            [{ text: 'русский', callback_data: 'subbutton1-2' }],
            [{ text: 'china', callback_data: 'subbutton1-3' }],
            [{ text: 'Назад', callback_data: 'back' }]
        ]
    }
};


bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, 'Выберите кнопку:', mainMenu);
});


bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    if (query.data === 'button1') {
        bot.sendMessage(chatId, 'Вы нажали "Кнопка 1". Вот дополнительные кнопки:', subMenu1);
    } else if (query.data === 'back') {
        bot.sendMessage(chatId, 'Вы вернулись в главное меню.', mainMenu);
    } else {
        bot.sendMessage(chatId, `Вы нажали на кнопку с данными: ${query.data}`);
    }

    bot.answerCallbackQuery(query.id);
});