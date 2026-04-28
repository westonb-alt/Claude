export function holePoints(grossScore, par) {
  const diff = grossScore - par;
  if (diff <= -2) return 8;
  if (diff === -1) return 4;
  if (diff === 0)  return 2;
  if (diff === 1)  return 1;
  return 0;
}

export function holeLabel(grossScore, par) {
  const diff = grossScore - par;
  if (diff <= -2) return { label: 'Eagle', emoji: '🦅', color: 'text-yellow-500' };
  if (diff === -1) return { label: 'Birdie', emoji: '🐦', color: 'text-green-600' };
  if (diff === 0)  return { label: 'Par',    emoji: '',   color: 'text-blue-500' };
  if (diff === 1)  return { label: 'Bogey',  emoji: '',   color: 'text-gray-500' };
  return { label: 'Dbl+', emoji: '', color: 'text-red-400' };
}

export function roundPoints(scores, holePars) {
  return scores.reduce((sum, s, i) => {
    if (s === '' || s === undefined || s === null) return sum;
    return sum + holePoints(Number(s), holePars[i]);
  }, 0);
}

export function playerTotals(player, rounds, holePars, numRounds) {
  let totalPoints = 0;
  let roundsPlayed = 0;
  const breakdown = [];

  for (let r = 1; r <= numRounds; r++) {
    const round = rounds.find(rd => rd.id === r);
    const scores = round?.scores?.[player.id] ?? [];
    const filled = scores.filter(s => s !== '' && s !== undefined && s !== null);
    if (filled.length === 0) {
      breakdown.push(null);
      continue;
    }
    const pts = roundPoints(scores, holePars);
    totalPoints += pts;
    roundsPlayed++;
    breakdown.push({ pts, holesPlayed: filled.length });
  }

  const quota = 36 - player.handicap;
  const performance = totalPoints - quota * roundsPlayed;

  return { totalPoints, roundsPlayed, performance, quota, breakdown };
}

export function calcPot(players, auction) {
  return players.reduce((sum, p) => {
    const a = auction[p.id];
    if (!a) return sum;
    const bid = parseFloat(a.amount) || 0;
    return sum + bid + (a.hasBuyback ? bid * 0.5 : 0);
  }, 0);
}
