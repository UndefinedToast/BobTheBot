const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { roleColor } = require("../../functions/roleColor.js");

const requiredPerms = {
  type: "flags",
  key: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.EmbedLinks],
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Receive information about the current guild"),
  async execute(interaction) {
    let serverIcon = interaction.guild.iconURL();
    let boostCount = interaction.guild.premiumSubscriptionCount;
    let boostTier = 0;

    if (boostCount >= 2) {
      boostTier = 1;
    } else if (boostCount >= 7) {
      boostTier = 2;
    } else if (boostCount >= 14) {
      boostTier = 3;
    }

    const fetchedOwner = await Promise.resolve(interaction.guild.fetchOwner());

    const replyEmbed = new EmbedBuilder()
      .setColor(roleColor(interaction))
      .setAuthor({ name: `${interaction.guild.name}`, iconURL: serverIcon })
      .setThumbnail(serverIcon)
      .addFields(
        {
          name: "General information",
          value: `
          *Owner:* \`${fetchedOwner.user.tag}\`
                *Member count:* \`${interaction.guild.memberCount}\`
                *Boosts:* \`${boostCount}\``,
          inline: true,
        },
        {
          name: "Other",
          value: `
          *Roles:* \`${interaction.guild.roles.cache.size - 1}\`
                *Boost tier:* \`${boostTier}\`
                *Channels:* \`${
                  interaction.guild.channels.channelCountWithoutThreads
                }\``,
          inline: true,
        }
      )
      .setFooter({ text: `${interaction.guild.id}` })
      .setTimestamp();

    interaction.reply({
      embeds: [replyEmbed],
    });
  },
  requiredPerms: requiredPerms,
};
