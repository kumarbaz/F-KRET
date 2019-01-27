const { Command } = require('discord.js-commando');
const math = require('mathjs');

module.exports = class MathCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'işlem-yap',
			aliases: ['mathematics', 'solve'],
			group: 'eglence',
			memberName: 'işlem-yap',
			description: 'Evaluates a math expression.',
			args: [
				{
					key: 'expression',
					prompt: 'Hangi İşlemi Sorcaksın?',
					type: 'string'
				}
			]
		});
	}

	run(msg, { expression }) {
		try {
			const evaluated = math.eval(expression).toString();
			return msg.reply(evaluated).catch(() => msg.reply('Yanlış İşlem.'));
		} catch (err) {
			return msg.reply('Yanlış İşlem.');
		}
	}
};