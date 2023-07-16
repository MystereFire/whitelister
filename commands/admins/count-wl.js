const { Client, SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits,
    EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,
    ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('count-wl')
        .setDescription("Count whitelist")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });

        const numberOfWallet = await client.models.whitelists.find()
        const countembed = new EmbedBuilder().setColor("5865F2").setDescription(`Total collected wallets: ${numberOfWallet.length}`)

        await interaction.editReply({ embeds: [countembed] })

    },
};