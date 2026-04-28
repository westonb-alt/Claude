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
      auc: auction[p.id],
      ...playerTotals(p, rounds, game.numRounds),
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
        const { player, performance, totalPoints, quota, breakdown, roundsPlayed, auc } = entry;
        const medal = roundsPlayed > 0 ? (MEDALS[idx] ?? `#${idx + 1}`) : `#${idx + 1}`;
        const border = roundsPlayed > 0 ? (RANK_BORDERS[idx] ?? 'border-transparent') : 'border-transparent';

        const ownerText = (() => {
          const splits = auc?.splits ?? [];
          if (splits.length === 0) return null;
          if (splits.length === 1) {
            return `Owned by ${splits[0].name || '?'}${auc.hasBuyback ? ' (50/50 w/ player)' : ''}`;
          }
          const names = splits.map(s => `${s.name || '?'} ${s.pct}%`).join(', ');
          return `${names}${auc.hasBuyback ? ' · 50% to player' : ''}`;
        })();

        return (
          <div key={player.id} className={`bg-white rounded-2xl p-4 border-2 ${border}`}>
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <span className="text-2xl leading-none">{medal}</span>
                <div>
                  <div className="font-bold text-base">{player.name}</div>
                  <div className="text-xs text-gray-400">HCP {player.handicap} · Quota {quota}/round</div>
                  {ownerText && (
                    <div className="text-xs text-gray-400 mt-0.5">{ownerText}</div>
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

            {/* Round breakdown + progress bars */}
            <div className="mt-3 space-y-1.5">
              <div className="flex gap-1.5">
                {breakdown.map((r, i) => (
                  <div key={i} className={`flex-1 rounded-xl py-1.5 text-center text-xs ${r ? 'bg-green-50' : 'bg-gray-50'}`}>
                    <div className="text-gray-400">R{i + 1}</div>
                    <div className={`font-bold ${r ? 'text-green-700' : 'text-gray-300'}`}>{r ? r.pts : '—'}</div>
                  </div>
                ))}
              </div>

              {breakdown.map((r, i) => {
                if (!r) return null;
                const pct = Math.min(100, Math.round((r.pts / quota) * 100));
                return (
                  <div key={i} className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${r.pts >= quota ? 'bg-green-500' : 'bg-orange-400'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
