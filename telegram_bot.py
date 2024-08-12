import asyncio
import telegram

async def main():
    bot = telegram.Bot(token='7383514055:AAG6Kg93Lra_Unq3TmIYkzuAlPhp75J9vP0')
    updates = await bot.get_updates()

    if updates:
        update = updates[-1]
        username = update.message.from_user.username

        with open('username.txt', 'w') as f:
            f.write(username)
    else:
        print("No updates available.")

asyncio.run(main())