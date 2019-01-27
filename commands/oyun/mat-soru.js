const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const { list } = require('../../util/Util');
const difficulties = ['kolay', 'orta', 'zor', 'cokzor', 'imkansiz'];
const operations = ['+', '-', '*'];
const maxValues = {
	kolay: 10,
	orta: 100,
	zor: 500,
	cokzor: 1000,
	imkansiz: 1000000
};

module.exports = class MathQuizCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mat-soru',
			aliases: ['math-game'],
			group: 'oyun',
			memberName: 'mat-soru',
			description: 'See how fast you can answer a math problem in a given time limit.',
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
		const value1 = Math.floor(Math.random() * maxValues[difficulty]) + 1;
		const value2 = Math.floor(Math.random() * maxValues[difficulty]) + 1;
		const operation = operations[Math.floor(Math.random() * operations.length)];
		let answer;
		switch (operation) {
			case '+': answer = value1 + value2; break;
			case '-': answer = value1 - value2; break;
			case '*': answer = value1 * value2; break;
		}
		await msg.reply(stripIndents`
			**10 Saniyen Var Soruyu Cevapla!**
			${value1} ${operation} ${value2}
		`);
		const msgs = await msg.channel.awaitMessages(res => res.author.id === msg.author.id, {
			max: 1,
			time: 10000
		});
		if (!msgs.size) return msg.reply(`Üzgünüm, Zaman Bitti! Cevap : ${answer}.`);
		if (msgs.first().content !== answer.toString()) return msg.reply(`Hayır, Üzgünüm, Cevap ${answer}.`);
		return msg.reply('İyi İş! 10/10! Bravo!');
	}
};