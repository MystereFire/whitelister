function loadCommands(client) {
    const ascii = require("ascii-table");
    const fs = require("fs");
    const table = new ascii('Commands').setHeading("Name", "Status");

    let commandsArray = [];
    let developerArray = [];

    const commandsFolders = fs.readdirSync("./commands");

    for (const folder of commandsFolders) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            try {
                const commandFile = require(`../commands/${folder}/${file}`);
                client.commands.set(commandFile.data.name, commandFile);
                if (commandFile.developer) developerArray.push(commandFile.data.toJSON())
                else commandsArray.push(commandFile.data.toJSON())
                table.addRow(file, "✅");
                continue;
            } catch (error) {
                table.addRow(file, `❌ ${error}`);
                console.log(error)
            }
        }
    }

    // Set basic commands on every guild the bot is on.
    client.application.commands.set(commandsArray);

    // Set developers commands only on developer guild.
    if (client.guildId) {
        const developerGuild = client.guilds.cache.get(client.guildId);
        developerGuild.commands.set(developerArray)
    }
    return console.log(table.toString(), "\nLoaded commands.")
}

module.exports = { loadCommands };