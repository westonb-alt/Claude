import { playerTotals } from '../lib/scoring';

const MEDALS = ['🥇', '🥈', '🥉'];
const RANK_BORDERS = [
  'border-yellow-400 shadow-yellow-100 shadow-md',
  'border-gray-300 shadow-gray-100 shadow-md',
  'border-orange-300 shadow-orange-100 shadow-md',
];

export default function Leaderboard({ state }) {
  const { game, players, rounds, auction } = state;

  if (players.length === 0) {
    return <p className="text-center text-gray-400 mt-16 text-sm">No players yet — add them in Setup.</p>;
  }

  const standings = players
    .map(p => ({
      player: p,
      auction: auction[p.id],
      ...playerTotals(p, rounds, game.holePars, game.numRounds),
    }))
    .sort((a, b) => {
      if (b.roundsPlayed !== a.roundsPlayed && (a.roundsPlayed === 0 || b.roundsPlayed === 0)) {
        return b.roundsPlayed - a.roundsPlayed;
      }
      return b.performance - a.performance;
    });

  const hasAnyScores = standings.some(s => s.roundsPlayed > 0);

  return (
    <div className="p-4 space-y-3">
      {hasAnyScores && (
        <p className="text-xs text-center text-gray-400">
          Performance = Total pts − (Quota × Rounds played)
        </p>
      )}

      {standings.map((entry, idx) => {
        const { player, performance, totalPoints, quota, breakdown, roundsPlayed, auction: a } = entry;
        const medal = roundsPlayed > 0 ? (MEDALS[idx] ?? `#${idx + 1}`) : `#${idx + 1}`;
        const border = roundsPlayed > 0 ? (RANK_BORDERS[idx] ?? 'border-transparent') : 'border-transparent';

        return (
          <div
            key={player.id}
            className={`bg-white rounded-2xl p-4 border-2 ${border}`}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">{medal}</span>
                <div>
                  <div className="font-bold text-base">{player.name}</div>
                  <div className="text-xs text-gray-400">
                    HCP {player.handicap} · Quota {quota}/round
                  </div>
                  {a?.buyerName && (
                    <div className="text-xs text-gray-400 mt-0.5">
                      Owned by <span className="font-medium text-gray-600">{a.buyerName}</span>
                      {a.hasBuyback ? ' (50/50 split)' : ''}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                {roundsPlayed > 0 ? (
                  <>
                    <div className={`text-2xl font-bold leading-none ${
                      performance > 0 ? 'text-green-600' :
                      performance < 0 ? 'text-red-500' : 'text-gray-600'
                    }`}>
                      {performance > 0 ? '+' : ''}{performance}
                    </div>
                    <div className="text-xs text-gray-400">{totalPoints} pts total</div>
                  </>
                ) : (
                  <div className="text-gray-300 text-lg font-bold">—</div>
                )}
              </div>
            </div>

            {/* Round breakdown chips */}
            <div className="mt-3 flex gap-1.5">
              {breakdown.map((r, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-xl py-1.5 text-center text-xs ${
                    r ? 'bg-green-50' : 'bg-gray-50'
                  }`}
                >
                  <div className="text-gray-400 text-xs">R{i + 1}</div>
                  {r ? (
                    <>
                      <div className="font-bold text-green-700">{r.pts}</div>
                      {r.holesPlayed < 18 && (
                        <div className="text-gray-300 text-xs">{r.holesPlayed}h</div>
                      )}
                    </>
                  ) : (
                    <div className="text-gray-300">—</div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress bar: pts vs quota per round */}
            {roundsPlayed > 0 && breakdown.map((r, i) => {
              if (!r) return null;
              const pct = Math.min(100, Math.round((r.pts / quota) * 100));
              return (
                <div key={i} className="mt-1.5 last:mt-0">
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        r.pts >= quota ? 'bg-green-500' : 'bg-orange-400'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
