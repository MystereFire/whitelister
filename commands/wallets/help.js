const { Client, CommandInteraction, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('help commande'),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        await interaction.deferReply({ ephemeral: true });
        const embed = new EmbedBuilder().setColor('5865f2')
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                { name: "/whitelist", value: "Allows you to send your wallet address." },
                { name: "/help", value: "Get help on a specific command or list all available commands." },
                { name: "/check-wl", value: "Get the address you sent." },
                { name: "/add-wl *", value: "Allows you to add a user to the whitelist." },
                { name: "/clear-submitter *", value: "Allows you to remove all users from the whitelist." },
                { name: "/clear *", value: "Allows you to remove a user from the white list." },
                { name: "/count-wl *", value: "Allows to see the number of users in the whitelist." },
                { name: "/export *", value: "Allows you to export the whitelist in different formats ." },
                { name: "/setup *", value: "Allows to configure the bot( channel, role, network, ... )." },
            )
            .setFooter({ text: "* Admin permissions are required for those commands" })
        interaction.editReply({ embeds: [embed], ephemeral: true })
    },
};
