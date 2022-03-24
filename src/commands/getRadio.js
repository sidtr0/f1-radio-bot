import { Command, ApplicationCommandRegistry } from "@sapphire/framework";
import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";
import fs from "fs";

export class LatestRadioCommand extends Command {
  registerApplicationCommands(registry) {
    const builder = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription("Get radio message from session.")
      .addIntegerOption((option) =>
        option
          .setName("index")
          .setDescription("Index of radio message.")
          .setRequired(false)
      );
    registry.registerChatInputCommand(builder, {
      // behaviorWhenNotIdentical: "OVERWRITE",
      idHints: ["956386832432656404"],
    });
  }

  async chatInputRun(interaction) {
    await interaction.reply("Getting requested radio...");
    const index = interaction.options.getInteger("index");
    console.log(index);
    const radioUrl = await this.getLatestRadio(index);
    const latestSessionRadios = (await this.getLatestSessionRadios()).Captures;
    const lastIndex = latestSessionRadios.length - 1;
    if (!radioUrl) {
      return await interaction.editReply(
        `No radio message found. Please check the index number. Largest possible value for index is \`${lastIndex}\`.`
      );
    }
    await interaction.editReply({
      content: "Requested radio message:",
      files: [radioUrl],
    });
  }

  async getLatestPath() {
    const latestSessionUrl =
      "https://livetiming.formula1.com/static/SessionInfo.json";
    const latestSession = await fetch(latestSessionUrl);
    const path = (await latestSession.json()).Path;
    return path;
  }

  async getLatestSessionRadios() {
    const path = await this.getLatestPath();
    const latestSessionRadiosUrl = `https://livetiming.formula1.com/static/${path}TeamRadio.json`;
    const latestSessionRadios = await fetch(latestSessionRadiosUrl);
    const radios = await latestSessionRadios.json();
    return radios;
  }

  async getLatestRadio(index) {
    const latestSessionRadios = (await this.getLatestSessionRadios()).Captures;
    const lastIndex = latestSessionRadios.length - 1;
    const racePath = await this.getLatestPath();
    if (!index) index = 0;
    console.log(lastIndex);
    if (index > lastIndex) return;
    const radioPath = latestSessionRadios[lastIndex - index].Path;
    const radioUrl = `http://livetiming.formula1.com/static/${
      racePath + radioPath
    }`;
    fetch(radioUrl).then((res) => {
      const destination = fs.createWriteStream("./data/radio.mp3");
      res.body.pipe(destination);
    });
    console.log(radioUrl);
    return radioUrl;
  }
}
