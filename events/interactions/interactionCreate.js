const { Client, CommandInteraction, EmbedBuilder, codeBlock } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param { Client } client
     * @param { CommandInteraction } interaction
     */
    async execute(interaction, client) {
        // Slash Command Handling
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return await interaction.reply({ content: `This command is outdated.`, ephemeral: true });
            command.execute(interaction, client);
        }

        // User context menu
        if (interaction.isUserContextMenuCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return await interaction.reply({ content: `This command is outdated.`, ephemeral: true });
            command.execute(interaction, client);
        }

        // Button 
        if (interaction.isButton()) {
            if (interaction.customId == "clear-yes") {
                const dataWhitelister = await client.models.whitelists.find();
                dataWhitelister.forEach(async (element) => {
                    await element.deleteOne()
                });

                const embed = new EmbedBuilder().setTitle(":warning: Submitter list has been cleared.").setColor(0xFFFF00)
                interaction.update({ embeds: [embed], components: [], ephemeral: true })
            } else if (interaction.customId == "clear-no") {
                const embed = new EmbedBuilder().setTitle(":warning: Submitter list hasn't been cleared").setColor(0xFFFF00)
                interaction.update({ embeds: [embed], components: [], ephemeral: true })
            }
        }

        if (interaction.isModalSubmit()) {
            const address = await interaction?.fields?.getTextInputValue('address');
            const setting = require('../../config.json')
            if (setting.network == "SOL") {
                if (!address.match(/[0-9a-zA-Z]{44}$/gm)) return await interaction.reply({ content: "The address does not correspond to the Solana network.", ephemeral: true })

            } else if (setting.network == "ETH") {
                if (!Web3.utils.isAddress(address)) return await interaction.reply({ content: "The address does not correspond to the Ethereum network.", ephemeral: true })
            }

            await client.models.whitelists.deleteOne({ userId: interaction.user.id })

            new client.models.whitelists({
                userId: interaction.user.id,
                address: address
            }).save();
            const embed = new EmbedBuilder().setColor('5865F2').setDescription(`Your wallet address has been submitted and registered.\n ${codeBlock('markdown', address)}`)
            await interaction.reply({ embeds: [embed], ephemeral: true, fetchReply: true })
            return
        }
    }
}
