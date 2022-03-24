import { SapphireClient, LogLevel } from "@sapphire/framework";
import dotenv from "dotenv";
dotenv.config();

const client = new SapphireClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  defaultPrefix: "r!",
  logger: {
    level: LogLevel.Debug,
  },
});

client.on("ready", () => {
  console.log("Ready!");
});

client.login(process.env.TOKEN);
