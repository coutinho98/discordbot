module.exports = function gerarTimes(voiceChannel, client) {
    const members = [...voiceChannel.members.values()].filter(m => m.id !== client.user.id);

    if (members.length < 2) return null;

    for (let i = members.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [members[i], members[j]] = [members[j], members[i]];
    }

    const half = Math.ceil(members.length / 2);

    return {
        team1: members.slice(0, half),
        team2: members.slice(half),
    };
}
