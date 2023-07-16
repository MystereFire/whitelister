const { Client, Collection } = require("discord.js");
const { ModalBuilder } = require('discord.js');
const client = new Client({
    intents: 1, // 32767
});

module.exports = client;

require("dotenv").config();

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

client.models = new Collection();
client.models.whitelists = require("./models/whitelists")

// Global function
client.function = {
    async updateStatus() {
        if (client.guildId) {
            const promises = [
                client.shard.fetchClientValues('guilds.cache.size'),
                client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
            ];
            Promise.all(promises)
                .then(results => {
                    const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                    const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                    client.user.setActivity(`Total of  ${totalGuilds} servers & ${totalMembers} users`);
                })
                .catch(console.error);
        }
    },
    async log(type, guildName, guildId, data, userName) {
        if (type == "whitelist") {
            console.log(`[NEW WHITELIST] ${guildName} - ${userName} - ${data}`)
        }
        if (type == "export") {
            console.log(`[NEW EXPORT] New export for ${guildId} - Type: [${data}]`)
        }
        if (type == "join") {
            console.log(`[NEW GUILD] Joined for ${guildName} - ${guildId}`)
        }
        if (type == "setup") {
            console.log(`[NEW SETUP] ${guildName} - ${guildId}`)
        }
    }
}

// Get the handlers.
const { loadEvents } = require("./handlers/events");
const { loadCommands } = require("./handlers/commands");
const { loadDb } = require("./handlers/database");

client.login(process.env.TOKEN).then(() => {
    loadEvents(client);
    loadCommands(client);
    loadDb(client);
});
