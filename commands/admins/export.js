const { Client, SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits,
    EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,
    ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js");
const { GoogleSpreadsheet } = require('google-spreadsheet');
const fs = require("fs");
var xl = require('excel4node');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("export")
        .setDescription('Export all saved wallets.')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option
                .setName('type')
                .setDescription('Type of export.')
                .setRequired(true)
                .addChoices({ name: "TXT", value: "txt" },
                    { name: "CSV", value: "csv" },
                    { name: "XLSX", value: "xlsx" },
                    { name: "JSON", value: "json" }))
    ,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    async execute(interaction, client, args) {
        if (!fs.existsSync("./tmp")) {
            fs.mkdirSync("./tmp");
        }


        const choice = interaction.options.getString('type')
        const serverData = require('../../config.json')
        const numberOfWallet = await client.models.whitelists.find();
        const embedWaiting = new EmbedBuilder().setColor(0x5865F2).setDescription('In progress...')
        const embedNoOne = new EmbedBuilder().setColor(0xFF0000).setDescription('No one is whitelisted')
        const embedFinish = new EmbedBuilder().setColor(0x5865F2).setDescription('Here is the export for your server.')
        const embedNoSheetId = new EmbedBuilder().setColor(0xFFFF00).setDescription('Please configure your GoogleSpreadSheetId with the command /setup\n contact us if you encounter difficulties. https://dsc.gg/whitelister')

        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({ embeds: [embedWaiting] })

        if (numberOfWallet.length == 0) return await interaction.editReply({ embeds: [embedNoOne], ephemeral: true })


        if (choice == "txt") {
            const dataWhitelist = await client.models.whitelists.find();
            const nameFile = interaction.guild.name + '.txt';
            if (fs.existsSync(`./tmp/${nameFile}`)) {
                fs.unlinkSync(`./tmp/${nameFile}`)
            }
            for (const i in dataWhitelist) {
                fs.appendFile(`./tmp/${nameFile}`, dataWhitelist[i].userId + ',' + dataWhitelist[i].address + ';', function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        // done
                    }
                })
            }
            await interaction.editReply({ embeds: [embedFinish], files: [{ attachment: `./tmp/${nameFile}` }], ephemeral: true });
        } else if (choice == "csv") {
            const dataWhitelist = await client.models.whitelists.find();
            const nameFile = interaction.guild.name + '.csv';
            if (fs.existsSync(`./tmp/${nameFile}`)) {
                fs.unlinkSync(`./tmp/${nameFile}`)
            }
            for (const i in dataWhitelist) {
                fs.appendFile(`./tmp/${nameFile}`, dataWhitelist[i].userId + ',' + dataWhitelist[i].address + '\n', function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        // done
                    }
                })
            }
            await interaction.editReply({ embeds: [embedFinish], files: [{ attachment: `./tmp/${nameFile}` }], ephemeral: true });
        } else if (choice == "xlsx") {
            const dataWhitelist = await client.models.whitelists.find();
            const nameFile = interaction.guild.name + '.xlsx';
            if (fs.existsSync(`./tmp/${interaction.guild.name}.xlsx`)) {
                fs.unlinkSync(`./tmp/${nameFile}`)
            }
            var wb = new xl.Workbook();
            var ws = wb.addWorksheet('Sheet 1');
            ws.cell(1, 1).string('userId').style({ fill: { type: 'pattern', patternType: 'solid', fgColor: '4f8ec1' } });
            ws.cell(1, 2).string('address').style({ fill: { type: 'pattern', patternType: 'solid', fgColor: '4f8ec1' } });
            let number = 2
            for (const i in dataWhitelist) {
                ws.cell(number, 1).string(dataWhitelist[i].userId).style({ fill: { type: 'pattern', patternType: 'solid', fgColor: '9acdd9' } });
                ws.cell(number, 2).string(dataWhitelist[i].address).style({ fill: { type: 'pattern', patternType: 'solid', fgColor: '9acdd9', } });
                number++
            }
            wb.write(`./tmp/${interaction.guild.name}.xlsx`, async function () {
                await interaction.editReply({ embeds: [embedFinish], files: [{ attachment: `./tmp/${interaction.guild.name}.xlsx` }], ephemeral: true });
            })


        }  else if (choice == "json") {
            const dataWhitelist = await client.models.whitelists.find();
            const nameFile = interaction.guild.name + '.json';
            if (fs.existsSync(`./tmp/${interaction.guild.name}.json`)) {
                fs.unlinkSync(`./tmp/${nameFile}`)
            }
            var jsonStr = '[]';
            var obj = JSON.parse(jsonStr);

            for (const i in dataWhitelist) {
                obj.push({ "address": dataWhitelist[i].address, "discordID": dataWhitelist[i].userId });
            }
            jsonStr = JSON.stringify(obj);
            fs.writeFile(`./tmp/${nameFile}`, jsonStr, 'utf8', function (err) {
                if (err) {
                    console.log(err)
                } else {
                    // done
                }
            });

            await interaction.editReply({ embeds: [embedFinish], files: [{ attachment: `./tmp/${interaction.guild.name}.json` }], ephemeral: true });

        }
    },
};
