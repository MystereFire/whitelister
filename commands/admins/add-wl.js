const { Client, SlashCommandBuilder, codeBlock, PermissionFlagsBits,
    EmbedBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("add-wl")
        .setDescription("Add user to Whitelist")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription('user to add')
                .setRequired(true)
        ).addStringOption(option =>
            option
                .setName('address')
                .setDescription('address')
                .setRequired(true)
        ),
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });

        const user = interaction.options.getUser("user")
        const address = interaction.options.getString("address")

        await client.models.whitelists.deleteOne({ userId: user.id })

        await client.models.whitelists.create({ userId: user.id, address: address })
        const embed = new EmbedBuilder().setColor('5865F2').setDescription(`The wallet of ${user} has been well registered\n ${codeBlock('markdown', address)}`)

        await interaction.editReply({ embeds: [embed], ephemeral: true })

    },
};