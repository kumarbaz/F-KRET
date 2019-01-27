const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const winston = require('winston');
const Discord = require('discord.js');

module.exports = class ClearCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'sil',
            aliases: ['clean', 'delete'],
            group: 'mod',
            memberName: 'sil',
            description: 'Clear messages from chat',
            details: 'Delete number of messages from the channel the message was posted in',
            examples: [`${client.commandPrefix}clear 10`],
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES', 'SEND_MESSAGES', 'EMBED_LINKS'],
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'limit',
                    prompt: 'How many messages should I delete?',
                    type: 'integer'
                }
            ]
        });
    }

    async run(msg, { limit }) {
        if(limit > 100) return msg.channel.send('100\'den Büyük Sayı Giremezsin!')
        if(limit < 1) return msg.channel.send('1\'den Küçük Sayı Giremezsin!')
        msg.channel.bulkDelete(limit);

        const resultEmbed = new Discord.RichEmbed()
            .setColor('#00ff1d')
            .setTitle('Başarılı!')
            .addField('Yetkili', msg.author.tag)
            .addField('Silinen Mesaj Sayısı', limit)
        
        msg.channel.send(resultEmbed).then(msg => msg.delete({ timeout: 5 }));
    }
}
