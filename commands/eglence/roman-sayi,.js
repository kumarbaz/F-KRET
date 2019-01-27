const { Command } = require('discord.js-commando');
const numerals = require('../../assets/json/roman-numeral');

module.exports = class RomanNumeralCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'roman-sayı',
			aliases: ['roman'],
			group: 'eglence',
			memberName: 'roman-sayı',
			description: 'Converts a number to roman numerals.',
			args: [
				{
					key: 'number',
					prompt: 'Hangi Sayının Roma Rakamına Dönüşmesini İstiyorsun ?',
					type: 'integer',
					min: 0,
					max: 4999
				}
			]
		});
	}

	run(msg, { number }) {
		if (number === 0) return msg.say('_nulla_');
		let result = '';
		for (const [numeral, value] of Object.entries(numerals)) {
			while (number >= value) {
				result += numeral;
				number -= value;
			}
		}
		return msg.say(result);
	}
};