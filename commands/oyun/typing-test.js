const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const { list } = require('../../util/Util');
const sentences = require('../../assets/json/typing-game');
const difficulties = ['kolay', 'orta', 'zor', 'çokzor', 'imkansız'];
const times = {
	kolay: 25000,
	orta: 20000,
	zor: 15000,
	çokzor: 10000,
	imkansız: 5000
};

module.exports = class TypingTestCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'hız-testi',
			aliases: [],
			group: 'oyun',
			memberName: 'hız-testi',
			description: 'See how fast you can type a sentence in a given time limit.',
			details: `**Difficulties**: ${difficulties.join(', ')}`,
			args: [
				{
					key: 'difficulty',
					prompt: `Hangi Zorluk Seviyesini Seçiyorsun? ${list(difficulties, 'yada')}.`,
					type: 'string',
					oneOf: difficulties,
					parse: difficulty => difficulty.toLowerCase()
				}
			]
		});
	}

	async run(msg, { difficulty }) {
		const sentence = sentences[Math.floor(Math.random() * sentences.length)];
		const time = times[difficulty];
		await msg.reply(stripIndents`
			**${time / 1000} Saniyen Var Cümleyi Yaz!**
			${sentence}
		`);
		const now = Date.now();
		const msgs = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
			max: 1,
			time
		});
		if (!msgs.size || msgs.first().content !== sentence) return msg.reply('üzgünüm! Kaybettin!');
		return msg.reply(`İyi İş! 10/10! Harikasın! (Took ${(Date.now() - now) / 1000} Saniye)`);
	}
};