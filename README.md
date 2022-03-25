# F1 Radio Bot

A Discord bot with the sole function of getting the radio messages from the latest Formula 1 session. 

## How to setup

To get the bot running locally, first of all, clone the repo: 

```
git clone https://github.com/DracTheDino/f1-radio-bot.git
```

Make sure you have NodeJS and NPM installed. Install dependencies with NPM:

```sh
npm i
```

Make a new file called `.env` and get your Discord bot token from your Discord developer page. Fill your `.env` file like so:

```env
TOKEN=your-token-here
```

You should be good to go, run the bot:

```sh
node src/index.js
# or
npm i -g nodemon
nodemon src/index.js
```

## How to use

To get the latest message in a session, use `/getradio` with no arguments

![](https://i.imgur.com/P0IgDh7.png)

If you want to get the `n`th radio message in a session, use `/getradio index: n`. For example: to get the first 5th radio in a session, use `/getradio index: 5`.

![](https://i.imgur.com/O4aYyYG.png)

If you want to get radios starting from the current time, you would use a negative number. For example: `/getradio index: -5`. This will get the 5th radio going back from the current time.

![](https://i.imgur.com/dfig6c9.png)

## Todo

- [x] Allow positive numbers to search from beginning and negative numbers to search from the end of radio array
- [ ] Allow searching for radios from specific drivers
- [ ] Speech to text support? 🤔

If you have specific features in mind, contact me on Discord (@Drac#9999) or make a new issue here. This is a very barebones bot but I'd love to improve upon it.