import { Command, ApplicationCommandRegistry } from "@sapphire/framework";
import { SlashCommandBuilder } from "@discordjs/builders";
import fetch from "node-fetch";
import {
  getLatestRadio,
  getLatestSessionRadios,
} from "../services/radioServices.js";

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
    const radioUrl = await getLatestRadio(index);
    const latestSessionRadios = (await getLatestSessionRadios()).Captures;
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
}
