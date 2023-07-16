const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require("discord.js");
const fs = require('fs');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription("Setup the bot")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option
                .setName("channel")
                .setDescription('The channel that the command can be run in.')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true))
        .addRoleOption(option =>
            option
                .setName('role')
                .setDescription('The channel that the command can be run in.')
                .setRequired(true))
        .addChannelOption(option =>
            option
                .setName("channel2")
                .setDescription('Second channel.')
                .addChannelTypes(ChannelType.GuildText))
        .addRoleOption(option =>
            option
                .setName('role2')
                .setDescription('Second role.'))
        .addChannelOption(option =>
            option
                .setName("channel3")
                .setDescription('Thrid channel')
                .addChannelTypes(ChannelType.GuildText))
        .addRoleOption(option =>
            option
                .setName('role3')
                .setDescription('Third role.'))
        .addStringOption(option =>
            option
                .setName('network')
                .setDescription('Eth or Solana')
                .addChoices({ name: "ETH", value: "ETH" },
                    { name: "Solana", value: "SOL" })
        ),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    async execute(interaction, client, args) {
        await interaction.deferReply({ ephemeral: true });
        const role = interaction.options.getRole('role');
        const channel = interaction.options.getChannel('channel');
        const network = (interaction.options.getString('network') === null) ? "" : interaction.options.getString('network')
        if ((role || interaction.options.getRole('secondrole') || interaction.options.getRole('thirdrole')) == interaction.guild.roles.everyone) {
            const embed = new EmbedBuilder().setColor(0x5865F2).setDescription('You cannot define the role ```everyone```')
            interaction.editReply({ embeds: [embed] })
            return
        }

        const settings = {
            roleId: role.id,
            channelId: channel.id,
            network: network
        };

        const jsonData = JSON.stringify(settings);

        fs.writeFile('./config.json', jsonData, 'utf8', async (err) => {
            if (err) {
                console.error(err);
                return;
            }

            const embed = new EmbedBuilder().setColor('#0099ff')
                .setTitle('Setup completed :white_check_mark:')
                .setDescription(`Channel: **${channel}**\nRole: **${role}**\nNetwork: **${(interaction.options.getString('network') === null) ? "Null" : interaction.options.getString('network')}**`)
                .setTimestamp()
                .setFooter({ text: 'Bot By MystereFire#7241', iconURL: client.user.avatarURL() });
            await interaction.editReply({ embeds: [embed] })
        });

    },
};
