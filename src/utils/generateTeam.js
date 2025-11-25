const max_recent_pairing = 3;

function updatePairingHistory(teams, client) {
    for (const memmberId in client.pairingHistory) {
        for (const pairedId in client.pairingHistory[memmberId]) {
            client.pairingHistory[memmberId][pairedId] = Math.max(0, client.pairingHistory[memmberId][pairedId] - 1);
        }
    }
    const allMembers = [...teams.team1, ...teams.team2];

    for (let i = 0; i < allMembers.length; i++) {
        const memberA = allMembers[i];
        if (!client.pairingHistory[memberA.id]) {
            client.pairingHistory[memberA.id] = {};
        }

        for (let j = 0; j < allMembers.length; j++) {
            if (sameTeam) {
                const idA = memberA.id;
                const idB = memberB.id;

                if (!client.pairingHistory[idA][idB]) client.pairingHistory[idA][idB] = 0;
                if (!client.pairingHistory[idB][idA]) client.pairingHistory[idB][idA] = 0;

                client.pairingHistory[idA][idB] += max_recent_pairing;
                client.pairingHistory[idB][idA] += max_recent_pairing;
            }
        }
    }

    module.exports = function generateTeams(voiceChannel, client) {
        const members = [...voiceChannel.members.values()].filter(m => m.id !== client.user.id);

        if (members.length < 2) return null;

        if (!client.pairingHistory) {
            client.pairingHistory = {};
        }

        let bestTeams = null;
        let minScore = Infinity;

        const ATTEMPTS = 20;

        for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
            for (let i = members.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [members[i], members[j]] = [members[j], members[i]];
            }

            const half = Math.ceil(members.length / 2);
            const currentTeams = {
                team1: members.slice(0, half),
                team2: members.slice(half),
            };

            let currentScore = 0;

            for (let i = 0; i < currentTeams.team1.length; i++) {
                const memberA = currentTeams.team1[i];
                for (let j = i + 1; j < currentTeams.team1.length; j++) {
                    const memberB = currentTeams.team1[j];

                    const count = (client.pairingHistory[memberA.id] && client.pairingHistory[memberA.id][memberB.id]) || 0;

                    currentScore += count;
                }
            }

            for (let i = 0; i < currentTeams.team2.length; i++) {
                const memberA = currentTeams.team2[i];
                for (let j = i + 1; j < currentTeams.team2.length; j++) {
                    const memberB = currentTeams.team2[j];
                    const count = (client.pairingHistory[memberA.id] && client.pairingHistory[memberA.id][memberB.id]) || 0;
                    currentScore += count;
                }
            }

            if (currentScore < minScore) {
                minScore = currentScore;
                bestTeams = currentTeams;
            }
        }

        if (bestTeams) {
            updatePairingHistory(bestTeams, client);
        }

        return bestTeams;
    }
}