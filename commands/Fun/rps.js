const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord.js");
const wait = require("node:timers/promises").setTimeout;

const requiredPerms = {
  type: "flags",
  key: [PermissionFlagsBits.SendMessages],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Play rock paper scissors!")
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("Your choice")
        .setRequired(true)
        .addChoices(
          { name: "rock", value: ":rock:" },
          { name: "paper", value: ":newspaper2:" },
          { name: "scissors", value: ":scissors:" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("choice2")
        .setDescription("Your choice")
        .setRequired(true)
        .addChoices(
          { name: "rock", value: ":rock:" },
          { name: "paper", value: ":newspaper2:" },
          { name: "scissors", value: ":scissors:" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("choice3")
        .setDescription("Your choice")
        .setRequired(true)
        .addChoices(
          { name: "rock", value: ":rock:" },
          { name: "paper", value: ":newspaper2:" },
          { name: "scissors", value: ":scissors:" }
        )
    ),
  async execute(interaction) {
    const choice = interaction.options.getString("choice");
    const choice2 = interaction.options.getString("choice2");
    const choice3 = interaction.options.getString("choice3");

    let userChoises = [choice, choice2, choice3];

    let result = [];
    let replyMessageArray = [`\`ROCK PAPER SCISSORS\``];

    await interaction.reply({
      content: "`ROCK PAPER SCISSORS`",
      ephemeral: true,
    });

    for (let i = 0; i < 3; i++) {
      const randomNum = Math.floor(Math.random() * 3);
      const choices = [":rock:", ":newspaper2:", ":scissors:"];
      const botChoice = choices[randomNum];

      if (userChoises[i] === botChoice) {
        result.push("TIE");
      } else {
        if (userChoises[i] === ":rock:") {
          if (botChoice === ":newspaper2:") {
            result.push("BOT");
          } else {
            result.push("PLAYER");
          }
        }

        if (userChoises[i] === ":newspaper2:") {
          if (botChoice === ":scissors:") {
            result.push("BOT");
          } else {
            result.push("PLAYER");
          }
        }

        if (userChoises[i] === ":scissors:") {
          if (botChoice === ":rock:") {
            result.push("BOT");
          } else {
            result.push("PLAYER");
          }
        }
      }

      replyMessageArray.push(
        `\`ROUND ${i + 1}:\` ${userChoises[i]} vs ${botChoice} - \`${
          result[i]
        }\``
      );

      interaction.editReply({
        content: `${replyMessageArray.join("\n")}`,
      });
      await wait(2000);
    }

    const playerScore = result.filter((x) => x === "PLAYER").length;
    const botScore = result.filter((x) => x === "BOT").length;

    if (playerScore > botScore) {
      replyMessageArray.push(`RESULT: \`PLAYER\``);
    } else if (playerScore < botScore) {
      replyMessageArray.push(`RESULT: \`BOT\``);
    } else {
      replyMessageArray.push(`RESULT: \`TIE\``);
    }

    interaction.editReply({
      content: `${replyMessageArray.join("\n")}`,
    });
  },
  requiredPerms: requiredPerms,
};
