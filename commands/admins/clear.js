const { Client, SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits,
    EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,
    ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clear a user")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('user to clear')
                .setRequired(true))
    ,
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute (interaction, client) {
        await interaction.deferReply({ ephemeral: true });
        const user = interaction.options.getUser("user")
        
        const userWhitelist = await client.models.whitelists.findOne({ userId: user.id });
        if (userWhitelist) {
            userWhitelist.deleteOne()
            const embed = new EmbedBuilder().setColor('00FF00').setDescription(`user has been cleared.`)
            await interaction.editReply({ embeds: [embed], ephemeral: true });
        } else {

            const embed = new EmbedBuilder().setColor('FF0000').setDescription(`user is not registered.`)
            await interaction.editReply({ embeds: [embed], ephemeral: true });
        }

    },
};
