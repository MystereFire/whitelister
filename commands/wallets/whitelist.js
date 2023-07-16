const { Client, CommandInteraction, EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, codeBlock, SlashCommandBuilder } = require("discord.js");
const fs = require('fs')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription("This command is used to submit your wallet address."),

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    async execute(interaction, client) {
        const data = require('../../config.json')
        const roleId = data.roleId
        const channelId = data.channelId

        if (interaction.member._roles.includes(roleId)) {
            if (interaction.channelId == channelId) {
                const modal = new ModalBuilder()
                    .setCustomId('whitelist')
                    .setTitle('Send your wallet')
                    .addComponents(new ActionRowBuilder().addComponents(new TextInputBuilder()
                        .setCustomId('address')
                        .setLabel('SUBMIT ADDRESS')
                        .setStyle(TextInputStyle.Short) //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
                        .setMinLength(5)
                        .setMaxLength(100)
                        .setPlaceholder("Your wallet (ex: 0x01abc01)")
                        .setRequired(true) // If it's required or not
                    ))
                await interaction.showModal(modal).catch((error) => {
                    console.log("Error: show modal")
                    console.error(error)
                })

            } else {
                await interaction.reply({ content: `You need to be in the <#${channelId}> channel to execute this command.`, ephemeral: true });
            }
        } else {
            await interaction.reply({ content: `You need to have the <@&${roleId}> role to execute this command.`, ephemeral: true });

        }
    },
};
