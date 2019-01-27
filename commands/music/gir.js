const { Command } = require('discord.js-commando');

module.exports = class JoinCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'gir',
            aliases: ['join-channel', 'channel', 'voice'],
            group: 'music',
            memberName: 'gir',
            description: 'Joins user active voice channel',
            examples: ['join'],
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 5
            },
            clientPermissions: ['CONNECT'],
            userPermissions: ['CONNECT'],
        });

    }

    /**
     * @param msg
     * @returns {Promise.<Message|Message[]>}
     */
    async run(msg) {
        try {
            let user = msg.member;
            if (!user.voiceChannel) return (await msg.say('Bir Ses Kanalına Giriş Yapmalısın')).delete(1200);
            else {
                if (user.voiceChannel.joinable) user.voiceChannel.join().then(async (connection) => (await msg.say(`\`${connection.channel.name}\` Adlı Kanala Giriş Yapıtım!`)).delete(12000));
                else return msg.say(`${user.voiceChannel.name} Adlı Kanala Giriş Yapılamadı! Yetersiz Yetki.`)
            }
        } catch (e) {
            console.log(e);
            return msg.say('Something went horribly wrong! Please try again later.')
        }
    }
};