const { Command } = require('discord.js-commando');

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'çık',
            aliases: [],
            group: 'music',
            memberName: 'çık',
            description: 'Makes bot Leave voice channel',
            examples: ['leave'],
            throttling: {
                usages: 2,
                duration: 5
            },
            guildOnly: true,
            clientPermissions: ['CONNECT'],
        });

    }

    /**
     * @param msg
     * @returns {Promise.<Message|Message[]>}
     */
    async run(msg) {
        try {
            let guild = msg.guild;
            this.queue = new Map();
            if (!guild.voiceConnection) return (await msg.channel.send('Ben Bir Ses Kanalında Değilim.')).delete(12000);
            else {
                (await msg.say(`Çıkış Yapılan Kanal \`${guild.voiceConnection.channel.name}\``)).delete(12000);
                guild.voiceConnection.channel.leave();
                this.queue.delete(msg.guild.id);
            }
        } catch (e) {
            console.log(e);
            return msg.say('Birşeyler Ters Gitti.')
        }
    }

};