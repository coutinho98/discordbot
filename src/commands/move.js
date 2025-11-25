const { TIME1, TIME2 } = require("../config");

module.exports = {
    name: "mover",
    async execute(message, args, client) {
        const teams = client.generatedTeams;

        if (!teams || teams.team1.length === 0) {
            return message.reply("Gere os times primeiro usando !embaralhar");
        }

        const canal1 = message.guild.channels.cache.get(TIME1);
        const canal2 = message.guild.channels.cache.get(TIME2);

        for (const m of teams.team1) {
            if (m.voice.channel) await m.voice.setChannel(canal1).catch(() => {});
        }

        for (const m of teams.team2) {
            if (m.voice.channel) await m.voice.setChannel(canal2).catch(() => {});
        }

        message.channel.send("Times movidos!");
    }
};
