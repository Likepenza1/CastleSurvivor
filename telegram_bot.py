import asyncio
import telegram

async def main():
    bot = telegram.Bot(token='7481755266:AAH-TQrdMSruOHliUsHiXQUsoVE9cZnH_FI')
    updates = await bot.get_updates()

    if updates:
        update = updates[-1]
        username = update.message.from_user.username

        with open('username.txt', 'w') as f:
            f.write(username)
    else:
        print("No updates available.")

asyncio.run(main())
