const { Client, CommandInteraction, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('check-wl')
        .setDescription("This command is used to check your wallet address."),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });
        try {
            var blid = await client.models.whitelists.findOne({ userId: interaction.user.id })
        } catch (error) {
            console.log(error)
        }
        if (blid) {
            const embed = new EmbedBuilder().setColor('5865F2').setDescription(`Your address is: **${blid.address}**`)
            await interaction.editReply({ embeds: [embed], ephemeral: true })
        } else {
            const embed = new EmbedBuilder().setColor('5865F2').setDescription(`You do not have a registered address`)
            await interaction.editReply({ embeds: [embed], ephemeral: true })
        }
    },
};
