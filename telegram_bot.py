import telebot

bot = telebot.TeleBot('7383514055:AAG6Kg93Lra_Unq3TmIYkzuAlPhp75J9vP0')

@bot.message_handler(commands=['start'])
def start(message):
    markup = telebot.types.InlineKeyboardMarkup()
    button = telebot.types.InlineKeyboardButton("Play Game", url=f"https://likepenza1.github.io/CastleSurvivor/{message.from_user.username}")
    markup.add(button)
    bot.send_message(message.chat.id, "Welcome! Click the button to play the game.", reply_markup=markup)

bot.polling()