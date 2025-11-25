const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ajuda",
    execute(message) {
        const embed = new EmbedBuilder()
            .setColor("#00ff99")
            .setTitle("📘 Comandos")
            .setDescription(
                "**!embaralhar** - Gera times\n" +
                "**!mover** - Move para os canais do Time 1 e Time 2\n" +
                "**!voltar** - Volta todos para o canal original\n"
            );

        message.channel.send({ embeds: [embed] });
    },
};