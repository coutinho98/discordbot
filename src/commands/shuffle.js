const { EmbedBuilder } = require("discord.js");
const generatedTeams = require("../utils/generateTeam");

module.exports = {
    name: "embaralhar",
    async execute(message, args, client) {
        const member = message.member;

        if (!member.voice.channel) {
            return message.reply("Você precisa estar em um canal de voz!");
        }

        const resultado = generatedTeams(member.voice.channel, client);

        if (!resultado) {
            return message.reply("Preciso de pelo menos 2 pessoas para formar times.");
        }

        const { team1, team2 } = resultado;

        const lanes = ["TOP", "JUNGLE", "MID", "ADC", "SUP"];

        const embed1 = new EmbedBuilder()
            .setColor("#0099ff")
            .setTitle(`🏆 Time 1 (${team1.length})`)
            .setDescription(team1.map((m, i) => `**${lanes[i]}:** ${m.displayName}`).join("\n"));

        const embed2 = new EmbedBuilder()
            .setColor("#ff4500")
            .setTitle(`🏅 Time 2 (${team2.length})`)
            .setDescription(team2.map((m, i) => `**${lanes[i]}:** ${m.displayName}`).join("\n"));

        message.channel.send({ embeds: [embed1, embed2] });

        client.generatedTeams = { team1, team2 };
    }
};
