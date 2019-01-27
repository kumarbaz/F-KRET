const { Command } = require('discord.js-commando');
const { stripIndents } = require('common-tags');
const slots = ['🍇', '🍊', '🍐', '🍒', '🍋'];

module.exports = class SlotsCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'slot',
			group: 'oyun',
			memberName: 'slot',
			description: 'Play a game of slots.'
		});
	}

	run(msg) {
		const slotOne = slots[Math.floor(Math.random() * slots.length)];
		const slotTwo = slots[Math.floor(Math.random() * slots.length)];
		const slotThree = slots[Math.floor(Math.random() * slots.length)];
		if (slotOne === slotTwo && slotOne === slotThree) {
			return msg.reply(stripIndents`
				${slotOne}|${slotTwo}|${slotThree}
				Wew! Kazandın! İyi İş... Afferin... Şanslı!
			`);
		}
		return msg.reply(stripIndents`
			${slotOne}|${slotTwo}|${slotThree}
			Aww... Kaybettin... Bi Sonrakine... Bu Sadece Kötü Şans!
		`);
	}
};