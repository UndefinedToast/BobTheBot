const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { convertMS } = require("../../functions/convertMS.js");
const { roleColor } = require("../../functions/roleColor.js");

const requiredPerms = {
  type: "flags",
  key: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Receive statistics about the bot"),
  async execute(interaction) {
    let milliseconds = interaction.client.uptime;

    const botMember = interaction.guild.members.me;

    let botNickname = ` (${botMember.nickname ?? "null"})`;
    if (botNickname == " (null)") {
      botNickname = "";
    }

    const replyEmbed = new EmbedBuilder()
      .setColor(roleColor(interaction))
      .setTitle(
        `${interaction.client.user.username}#${interaction.client.user.discriminator}` +
          botNickname
      )
      .setDescription("🧮 Statistics about the bot")
      .addFields(
        {
          name: `Servers`,
          value: `\`${interaction.client.guilds.cache.size}\``,
          inline: true,
        },
        {
          name: `Users`,
          value: `\`${interaction.client.users.cache.size}\``,
          inline: true,
        },
        {
          name: `Channels`,
          value: `\`${interaction.client.channels.cache.size}\``,
          inline: true,
        },
        {
          name: `Uptime`,
          value: `${convertMS(milliseconds)}`,
          inline: true,
        }
      );
    interaction.reply({ embeds: [replyEmbed] });
  },
  requiredPerms: requiredPerms,
};
