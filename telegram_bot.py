import asyncio
import telegram
import psutil
import sys


# Get the name of the current script
script_name = sys.argv[0]

# Get a list of all running processes
processes = psutil.process_iter(['pid', 'name'])

# Check if there are any other instances of the script running
for process in processes:
    if process.info['name'] == script_name and process.info['pid'] != os.getpid():
        print(f"Another instance of the script is already running with PID {process.info['pid']}. Exiting...")
        sys.exit()

# Your code to get updates from Telegram bot goes here

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