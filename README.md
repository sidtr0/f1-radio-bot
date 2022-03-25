# F1 Radio Bot

A Discord bot with the sole function of getting the radio messages from the latest Formula 1 session. 

## How to use

To get the latest message in a session, use `/getradio`

![](https://i.imgur.com/oTOfPDe.png)

![](https://i.imgur.com/xm5naoY.png)

If you want to get `n`th radio message from the end, use `/getradio index: n`. For example, this command gets the 1st radio message from the end. Remember that searches are 0 indexed, meaning that `/getradio index: 0` gets the latest radio, while `/getradio index: 1` gets the radio before the latest radio.

![](https://i.imgur.com/1JpybiL.png)

## Todo

- [ ] Allow searching for radios from specific drivers
- [x] Allow positive numbers to search from beginning and negative numbers to search from the end of radio array

If you have specific features in mind, contact me on Discord (@Drac#9999) or make a new issue here. This is a very barebones bot but I'd love to improve upon it.