const { Client, ActivityType, Activity } = require("discord.js");
const { Webhook, MessageBuilder } = require('discord-webhook-node');

module.exports = {
    name: "ready",
    /**
     * @param { Client } client
     * @param {Activity} activity
     */
    async execute(client, activity) {
        let date_ob = new Date();
        console.log('-> Connected to Discord.');
        console.log(`-> ${date_ob}`);

        client.function.updateStatus()
        setInterval(() => {
            client.function.updateStatus()
        }, 60000);
    }
}