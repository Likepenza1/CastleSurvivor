const express = require("express");
const path = require("path");
const TelegramBot = require("node-telegram-bot-api");
const TOKEN = "7101289580:AAGxaW8JRuEPbwqGahoXHuSZ-RAJP8lGeNI";
const server = express();
const bot = new TelegramBot(TOKEN, {
    polling: true
});
const port = process.env.PORT || 5000;
const gameName = "CastleSurvivor";
const queries = {};

server.use(express.static(path.join(__dirname, 'CastleSurvivorV2')));

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const keyboard = {
        inline_keyboard: [
            [{ text: 'запустить Castle Survivor',  (msg) => bot.sendGame(msg.from.id, gameName)); }, { text: 'Посетить сайт', url: 'https://yourwebsite.com' }], // replace with your game and website URLs
            [{ text: 'Пригласить друзей', url: 'https://telegram.me/share/url?url=Join%20me%20in%20this%20great%20game!&text=Check%20out%20this%20awesome%20game%20on%20Telegram!' }] // replace with your invite URL
        ]
    };
    bot.sendMessage(chatId, 'Добро пожаловать в мир Castle Survivor:', { reply_markup: keyboard });
});
bot.on("callback_query", function (query) {
    if (query.game_short_name !== gameName) {
        bot.answerCallbackQuery(query.id, "Sorry, '" + query.game_short_name + "' is not available.");
    } else {
        queries[query.id] = query;
        let gameurl = "https://likepenza1.github.io/CastleSurvivor/";
        bot.answerCallbackQuery({
            callback_query_id: query.id,
            url: gameurl
        });
    }
});
bot.on("inline_query", function (iq) {
    bot.answerInlineQuery(iq.id, [{
        type: "game",
        id: "0",
        game_short_name: gameName
    }]);
});

bot.onText(/\/help/, (msg) => bot.sendMessage(msg.from.id, "Click the buttons below to play the game, visit the website, or invite a friend."));

bot.on("inline_query", function (iq) {
    bot.answerInlineQuery(iq.id, [{
        type: "game",
        id: "0",
        game_short_name: gameName
    }]);
});

server.get("/highscore/:score", function (req, res, next) {
    if (!Object.hasOwnProperty.call(queries, req.query.id)) return next();
    let query = queries[req.query.id];
    let options;
    if (query.message) {
        options = {
            chat_id: query.message.chat.id,
            message_id: query.message.message_id
        };
    } else {
        options = {
            inline_message_id: query.inline_message_id
        };
    }
    bot.setGameScore(query.from.id, parseInt(req.params.score), options,
        function (err, result) {});
});

server.listen(port);
