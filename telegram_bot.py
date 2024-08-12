import asyncio
import telegram

async def main():
    bot = telegram.Bot(token='7383514055:AAG6zoxC3GjdM0g6DVdJiACucVaTzYcQp4c')
    update = await bot.get_updates()[-1]
    username = update.message.from_user.username

    with open('username.txt', 'w') as f:
        f.write(username)

asyncio.run(main())