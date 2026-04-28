export function playerTotals(player, rounds, numRounds) {
  let totalPoints = 0;
  let roundsPlayed = 0;
  const breakdown = [];

  for (let r = 1; r <= numRounds; r++) {
    const round = rounds.find(rd => rd.id === r);
    const pts = round?.points?.[player.id];
    if (pts === undefined || pts === '' || pts === null) {
      breakdown.push(null);
      continue;
    }
    totalPoints += Number(pts);
    roundsPlayed++;
    breakdown.push({ pts: Number(pts) });
  }

  const quota = 36 - player.handicap;
  const performance = totalPoints - quota * roundsPlayed;

  return { totalPoints, roundsPlayed, performance, quota, breakdown };
}

export function calcPot(players, auction) {
  return players.reduce((sum, p) => {
    const a = auction[p.id];
    if (!a) return sum;
    return sum + (parseFloat(a.amount) || 0);
  }, 0);
}
