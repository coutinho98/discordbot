const { CDIROOM } = require("../config");

module.exports = {
    name: "voltar",
    async execute(message, args, client) {
        const teams = client.generatedTeams;

        if (!teams) return message.reply("Não há times para mover de volta.");

        const canal = message.guild.channels.cache.get(CDIROOM);

        for (const m of [...teams.team1, ...teams.team2]) {
            if (m.voice.channel) await m.voice.setChannel(canal).catch(() => { });
        }
        
        //message.channel.send("Todos foram movidos de volta para o canal original.");
        client.generatedTeams = null;
    }
};
