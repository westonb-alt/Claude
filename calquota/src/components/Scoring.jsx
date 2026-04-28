export default function Scoring({ state, setRounds }) {
  const { game, players, rounds } = state;

  function getPoints(roundNum, playerId) {
    const round = rounds.find(r => r.id === roundNum);
    const v = round?.points?.[playerId];
    return v === undefined ? '' : v;
  }

  function setPoints(roundNum, playerId, raw) {
    const round = rounds.find(r => r.id === roundNum) ?? { id: roundNum, points: {} };
    const newRound = {
      ...round,
      points: {
        ...round.points,
        [playerId]: raw === '' ? '' : Math.max(0, parseInt(raw) || 0),
      },
    };
    setRounds([...rounds.filter(r => r.id !== roundNum), newRound]);
  }

  if (players.length === 0) {
    return <p className="text-center text-gray-400 mt-16 text-sm">Add players in Setup first.</p>;
  }

  return (
    <div className="p-4 space-y-3">
      <p className="text-xs text-center text-gray-400">
        Enter total quota points earned per round (Eagle=8, Birdie=4, Par=2, Bogey=1)
      </p>

      {players.map(p => {
        const quota = 36 - p.handicap;
        let totalPts = 0;
        let roundsPlayed = 0;

        for (let r = 1; r <= game.numRounds; r++) {
          const pts = getPoints(r, p.id);
          if (pts !== '') { totalPts += Number(pts); roundsPlayed++; }
        }

        const performance = roundsPlayed > 0 ? totalPts - quota * roundsPlayed : null;

        return (
          <div key={p.id} className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-3">
              <div>
                <div className="font-bold text-base">{p.name}</div>
                <div className="text-xs text-gray-400">HCP {p.handicap} · Quota {quota}/round</div>
              </div>
              {performance !== null && (
                <div className={`text-2xl font-bold ${performance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {performance >= 0 ? '+' : ''}{performance}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {Array.from({ length: game.numRounds }, (_, i) => i + 1).map(r => {
                const pts = getPoints(r, p.id);
                const diff = pts !== '' ? Number(pts) - quota : null;
                return (
                  <div key={r} className="flex-1 min-w-0">
                    <div className="text-xs text-gray-400 text-center mb-1">R{r}</div>
                    <input
                      type="number"
                      inputMode="numeric"
                      min="0"
                      value={pts}
                      onChange={e => setPoints(r, p.id, e.target.value)}
                      placeholder="—"
                      className="w-full border border-gray-200 rounded-xl text-center py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {diff !== null && (
                      <div className={`text-xs text-center mt-1 font-semibold ${diff >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {diff >= 0 ? '+' : ''}{diff}
                      </div>
                    )}
                  </div>
                );
              })}

              {roundsPlayed > 0 && (
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400 text-center mb-1">Total</div>
                  <div className="w-full bg-green-50 border border-green-200 rounded-xl text-center py-2 text-sm font-bold text-green-700">
                    {totalPts}
                  </div>
                  {performance !== null && (
                    <div className={`text-xs text-center mt-1 font-semibold ${performance >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {performance >= 0 ? '+' : ''}{performance}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
