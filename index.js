const { CommandoClient, FriendlyError, SQLiteProvider } = require('discord.js-commando');
const sqlite = require('sqlite');
const path = require('path');
const Discord = require('discord.js');
const winston = require('winston');
const ayarlar = require('./ayarlar.json');
const MongoDBProvider = require('commando-provider-mongo');
const MongoClient = require('mongodb');
const fs = require('fs');
const jimp = require('jimp');
const moment = require('moment');
const { oneLine } = require('common-tags');
const { duration } = require('./util/Util');

var Games = [
	"h!çal <müzik ismi | link>",
	"Herzaman Gelişiyor!",
	"Yeni Komutlar Yakında",
	"h!yardım"
];

const client = new CommandoClient({
    commandPrefix: ayarlar.prefix,
    unknownCommandResponse: false,
    owner: ["325260517256069121", "327520524152602624"],
    disableEveryone: true
});


client.on('ready', async () => {
	



	setInterval(function() {
        var random = Math.floor(Math.random()*(Games.length-0+1)+0);
        client.user.setGame(Games[random], "https://www.twitch.tv/iwariorr");
      }, 2 * 3000);
})

client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'blacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
	return 'Blacklisted.';
});

client.on('messageUpdate', async (oldMsg, newMsg) => {
	if (!newMsg.guild) return;
	if (newMsg.author.bot) return;
	//ANTIREKLAM
	const antiadvariable = client.provider.get(newMsg.guild.id, 'reklamEngel', []);
	if (!antiadvariable) return;
	if (antiadvariable === true) {
	const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
		if (swearWords.some(word => newMsg.content.toLowerCase().includes(word))) {
			if (!newMsg.member.hasPermission("ADMINISTRATOR")) {
				newMsg.delete();
				return newMsg.reply('**Hype Reklam Koruması** Açıkken Sen Bunu Yapabilceğinimi Sandın ?').then(reply => reply.delete(3000));
			}
		}
	}
})

client.on('guildMemberAdd', async member => {
	const veri = client.provider.get(member.guild.id, 'girisRolK', []);
	if (veri ==! true) return;
	if (veri === true) {
		const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
		if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
		member.addRole(girisrolveri);
	}
})

client.on('message', msg => {
    if (!msg.guild) return;
	const veri = client.provider.get(msg.guild.id, 'linkEngel', []);
	if (veri !== true) return;
    if (veri === true) {
		const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
		if (swearWords.some(word => msg.content.includes(word))) {
			if (!msg.member.hasPermission("BAN_MEMBERS")) {
				return;
			}
		}
		var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
		if (regex.test(msg.content)==true) {
			if (!msg.member.hasPermission("BAN_MEMBERS")) {
				msg.delete();
				
				return msg.reply('**Hype Link Koruması** Açıkken Sen Bunu Yapabilceğinimi Sandın ?').then(msg => msg.delete(5000))
			} else {
				return;
			};
		} else {
			return;
		};
    };
  })

  client.on('message', async msg => {
	if (!msg.guild) return;
	const veri = client.provider.get(msg.guild.id, 'reklamEngel', []);
	const veri2 = client.provider.get(msg.guild.id, 'linkEngel', []);
	if (veri ==! true) return;
	if (veri === true) {
		const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
		if (swearWords.some(word => msg.content.includes(word))) {
			try {
				if (!msg.member.hasPermission("BAN_MEMBERS")) {
					msg.delete();

					return msg.reply('**Hype Reklam Koruması** Açıkken Sen Bunu Yapabilceğinimi Sandın ?').then(msg => msg.delete(5000));
				}
			} catch(err) {
				console.log(err);
			}
		}
	}
})

client.on("guildMemberAdd", async member => {
	const veri = client.provider.get(member.guild.id, "hosGeldinK", []);
	if (veri ==! true) return;
	if (veri === true) {
		const kanalveri = client.provider.get(member.guild.id, "hosGeldin", []);
	        var embed = new Discord.RichEmbed()
			.setTitle('Üye Giriş Yaptı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor('RANDOM')
			.setDescription(`:heart_eyes: | <@!${member.user.id}>`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`Hype Giriş Sistemi`)
			.setTimestamp();
			member.guild.channels.get(kanalveri).send({embed});
	}
})

client.on("guildMemberRemove", async member => {
const veri = client.provider.get(member.guild.id, "hosGeldinK", []);
if (veri ==! true) return;
if (veri === true) {
	const kanalveri = client.provider.get(member.guild.id, "hosGeldin", []);
	var embed = new Discord.RichEmbed()
.setTitle('Üye Çıkış Yaptı.')
.setAuthor(member.user.tag, member.user.avatarURL)
.setColor('RANDOM')
.setDescription(`:cry: | <@!${member.user.id}>`)
.setThumbnail(member.user.avatarURL)
.setFooter(`Hype Çıkış Sistemi`)
.setTimestamp();
member.guild.channels.get(kanalveri).send({embed});
}
})

//LOG

client
	.on('guildBanAdd', async (guild, member) => {
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye yasaklandı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(15158332)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			guild.channels.get(logCh).send({embed});

		}
	})
	
	.on('guildBanRemove', async (guild, member) => {
		if (!guild) return;
		const enabled = client.provider.get(guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (guild.channels.get(logCh) === undefined || guild.channels.get(logCh) === null) return;
		if (guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üyenin yasaklaması kaldırıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(3447003)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('messageDelete', async msg => {
		if (!msg.guild) return;
		const enabled = client.provider.get(msg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(msg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (msg.guild.channels.get(logCh) === undefined || msg.guild.channels.get(logCh) === null) return;
		if (msg.guild.channels.get(logCh).type === "text") {
			if (msg.author.bot) return;
			var embed = new Discord.RichEmbed()
			.setAuthor(msg.author.tag, msg.author.avatarURL)
			.setColor(15158332)
			.setDescription(`<@!${msg.author.id}> tarafından <#${msg.channel.id}> kanalına gönderilen "${msg.content}" mesajı silindi.`)
			.setFooter(`ID: ${msg.id}`)
			msg.guild.channels.get(logCh).send({embed});
		}
	})
	
	.on('channelCreate', async channel => {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
			if (channel.type === "text") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`<#${channel.id}> kanalı oluşturuldu. _(metin kanalı)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			};
			if (channel.type === "voice") {
				var embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı oluşturuldu. _(sesli kanal)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			}
		}
	})
		
	.on('channelDelete', async channel => {
		if (!channel.guild) return;
		const enabled = client.provider.get(channel.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(channel.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (channel.guild.channels.get(logCh) === undefined || channel.guild.channels.get(logCh) === null) return;
		if (channel.guild.channels.get(logCh).type === "text") {
			if (channel.type === "text") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı silindi. _(metin kanalı)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			};
			if (channel.type === "voice") {
				let embed = new Discord.RichEmbed()
				.setColor(3066993)
				.setAuthor(channel.guild.name, channel.guild.iconURL)
				.setDescription(`${channel.name} kanalı silindi. _(sesli kanal)_`)
				.setFooter(`ID: ${channel.id}`)
				channel.guild.channels.get(logCh).send({embed});
			}
		}
	})

	.on('messageUpdate', async (oldMsg, newMsg) => {
		if (!oldMsg.guild) return;
		if (oldMsg.author.bot) return;
		const enabled = client.provider.get(oldMsg.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(oldMsg.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (oldMsg.guild.channels.get(logCh) === undefined || oldMsg.guild.channels.get(logCh) === null) return;
		if (oldMsg.guild.channels.get(logCh).type === "text") {
			const embed = new Discord.RichEmbed()
			.setColor(3066993)
			.setAuthor(oldMsg.author.tag, oldMsg.author.avatarURL)
			.setDescription(`${oldMsg.author} adlı kullanıcı <#${oldMsg.channel.id}> kanalına gönderdiği "${oldMsg.content}" mesajını "${newMsg.content}" olarak düzenledi.`)
			.setFooter(`ID: ${oldMsg.id}`);
			oldMsg.guild.channels.get(logCh).send({embed});
		};
	});



client.on('error', winston.error)
	.on('warn', winston.warn)
	.on('ready', () => {
		winston.info(oneLine`
			[DISCORD]: Client ready...
			Logged in as ${client.user.tag} (${client.user.id})
		`);
    })
    .on('disconnect', () => winston.warn('[DISCORD]: Disconnected!'))
	.on('reconnect', () => winston.warn('[DISCORD]: Reconnecting...'))
	.on('commandRun', (cmd, promise, msg, args) =>
		winston.info(oneLine`
			[DISCORD]: ${msg.author.tag} (${msg.author.id})
			> ${msg.guild ? `${msg.guild.name} (${msg.guild.id})` : 'DM'}
			>> ${cmd.groupID}:${cmd.memberName}
			${Object.values(args).length ? `>>> ${Object.values(args)}` : ''}
		`)
	)
	.on('unknownCommand', msg => {
		if (msg.channel.type === 'dm') return;
		if (msg.author.bot) return;
		if (msg.content.split(msg.guild.commandPrefix)[1] === 'undefined') return;
		const args = { name: msg.content.split(msg.guild.commandPrefix)[1].toLowerCase() };
    })
    .on('commandError', (cmd, err) => {
		if (err instanceof FriendlyError) return;
		winston.error(`[DISCORD]: Error in command ${cmd.groupID}:${cmd.memberName}`, err);
	})
	.on('commandBlocked', (msg, reason) => {
		winston.info(oneLine`
			[DISCORD]: Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; User ${msg.author.tag} (${msg.author.id}): ${reason}
		`);
	})
	.on('commandPrefixChange', (guild, prefix) => {
		winston.info(oneLine`
			[DISCORD]: Prefix changed to ${prefix || 'the default'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		winston.info(oneLine`
			[DISCORD]: Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		winston.info(oneLine`
			[DISCORD]: Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['eglence', 'Eğlence'],
        ['music', 'Müzik'],
		['admin', 'Admin'],
		['ayarlar', 'Ayarlar'],
		['bilgi', 'Bilgi'],
		['mod', 'Mod'],
		['oyun', 'Oyun'],
		['yardım', 'Yardım']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
	.registerCommandsIn(path.join(__dirname, 'commands'));
	sqlite.open(path.join(__dirname, "settings.sqlite3")).then((db) => {
    client.setProvider(new SQLiteProvider(db));
});

client.login(ayarlar.token);
