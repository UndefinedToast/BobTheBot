const GuildSchema = require("../models/GuildModel");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "messageUpdate",
  once: false,
  async execute(initMessage, newMessage) {
    if (initMessage.author.bot) return;

    guildData = await GuildSchema.findOne({
      GuildId: newMessage.guild.id,
    });
    if (guildData && guildData.GuildLogChannel !== null) {
      const logChannel = await Promise.resolve(
        interaction.guild.channels.fetch(guildData.GuildLogChannel)
      );

      let userNickname = ` (${newMessage.member.nickname})`;
      if (userNickname == " (null)") {
        userNickname = "";
      }

      const logEmbed = new EmbedBuilder()
        .setColor(0xfff033)
        .setAuthor({
          name:
            `${newMessage.member.user.username}#${newMessage.member.user.discriminator}` +
            userNickname +
            " | Message edited",
          iconURL: `${newMessage.member.user.displayAvatarURL()}`,
        })
        .addFields(
          {
            name: `Channel`,
            value: `${newMessage.channel}`,
            inline: false,
          },
          {
            name: `New message`,
            value: `\`${newMessage.content}\``,
            inline: false,
          },
          {
            name: `Old message`,
            value: `\`${initMessage.content}\``,
            inline: false,
          },
          {
            name: `ID`,
            value: `\`\`\`ini\nUser = ${newMessage.member.id}\nID = ${newMessage.id}\`\`\``,
            inline: false,
          }
        )
        .setTimestamp();
      logChannel.send({ embeds: [logEmbed] });
    }
  },
};
