const { Command } = require('discord.js-commando');

module.exports = class PreEnableCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'premium-deaktif',
			aliases: ['premiumdeaktif'],
			group: 'admin',
			memberName: 'premium-deaktif',
			description: 'Bir sunucu için premiumu deaktifleştirmeyi sağlar.',
			throttling: {
				usages: 2,
				duration: 3
			},

			args: [
				{
					key: 'guild',
					label: 'sunucu',
					prompt: 'lütfen sunucu id numarasını yazın.\n',
					type: 'string'
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	async run(msg, args) {
	    const sunucu = args.guild;
	    if (this.client.guilds.has(sunucu)) {
    		const sunucuAdi = await this.client.guilds.get(sunucu).name;
    		const preEnabled = this.client.provider.get(sunucu, 'preEnabled', []);
    		if (preEnabled !== true) return msg.channel.send('Bu Sunucu Zaten Premium Değil');
    		var mesaj = await msg.channel.send('Deaktifleştiriliyor...');
    		this.client.provider.set(sunucu, 'preEnabled', false);
    		mesaj.edit('Deaktifleştirildi!')
    	} else {
    		const preEnabled = this.client.provider.get(sunucu, 'preEnabled', []);
    		if (preEnabled !== true) return msg.channel.send('Bu Sunucu Zaten Premium Değil');
    	    var mesaj = await msg.channel.send('Premium Deaktifleştiriliyor...');
    	    this.client.provider.set(sunucu, 'preEnabled', false);
    	    mesaj.edit('Deaktifleştirildi.');
    	}
	}
};