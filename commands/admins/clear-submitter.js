const { Client, SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits,
    EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,
    ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear-submitter")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Clear the list of all submitters."),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });
        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("clear-yes")
                    .setLabel("Yes")
                    .setStyle(ButtonStyle.Success)
            ).addComponents(
                new ButtonBuilder()
                    .setCustomId("clear-no")
                    .setLabel("No")
                    .setStyle(ButtonStyle.Danger)
            );

        const embed = new EmbedBuilder().setTitle(':warning: Are you sure to delete all submitter ?').setColor(0xFFFF00)
        await interaction.editReply({ embeds: [embed], components: [button], ephemeral: true });
        
    },
};