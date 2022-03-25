import { Command, ApplicationCommandRegistry } from "@sapphire/framework";
import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";

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
      idHints: ["956786997446463498"],
    });
  }

  async chatInputRun(interaction) {
    await interaction.reply("Getting requested radio...");
    const index = interaction.options.getInteger("index");
    console.log(index);
    console.log(interaction.id);
    const radioUrl = await this.getLatestRadio(index);
    const latestSessionRadios = (await this.getLatestSessionRadios()).Captures;
    const lastIndex = latestSessionRadios.length - 1;
    if (!radioUrl) {
      return await interaction.editReply(
        `No radio message found. Please check the index number. There are only ${lastIndex} radio(s) so largest possible value for index is \`${lastIndex}\` and smallest possible value for index is \`${-lastIndex}\`.`
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
    console.log(latestSessionRadiosUrl);
    return radios;
  }

  async getLatestRadio(index) {
    const latestSessionRadios = (await this.getLatestSessionRadios()).Captures;
    // reverse() is destructive, so you have to copy it first using spread operator`
    const reversed = [...latestSessionRadios].reverse();
    const lastIndex = latestSessionRadios.length - 1;
    const racePath = await this.getLatestPath();
    let radioPath;
    if (index === 0) {
      radioPath = latestSessionRadios[index].Path;
    } else if (!index) {
      index = 0;
      radioPath = reversed[index].Path;
    } else if (index > lastIndex || index < -lastIndex) {
      return null;
    } else if (index > 0) {
      radioPath = latestSessionRadios[index].Path;
    } else if (index < 0) {
      radioPath = reversed[Math.abs(index)].Path;
    }
    const radioUrl = `https://livetiming.formula1.com/static/${
      racePath + radioPath
    }`;
    console.log(radioUrl);
    return radioUrl;
  }
}
