const dictdata = require("../../commands/Utility/dictionary.js");
const { editDictPage } = require("../../functions/editDictPage.js");

module.exports = {
  data: {
    name: "dictnext",
  },
  async execute(interaction) {
    let footer = interaction.message.embeds[0].data.footer.text.match(/(\d+)/);
    if (footer) {
      currentPage = parseInt(footer[0]);
    } else {
      currentPage = 1;
    }
    const totalPages = dictdata.totalPages;

    editDictPage(interaction, dictdata.result, currentPage, totalPages);
  },
};
