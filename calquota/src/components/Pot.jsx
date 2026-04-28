import { playerTotals, calcPot } from '../lib/scoring';

const PAYOUT_TIERS = [
  { label: '1st Place', pct: 0.70, bg: 'bg-yellow-50 border-yellow-200',  text: 'text-yellow-700'  },
  { label: '2nd Place', pct: 0.20, bg: 'bg-gray-50 border-gray-200',      text: 'text-gray-700'    },
  { label: '3rd Place', pct: 0.10, bg: 'bg-orange-50 border-orange-200',  text: 'text-orange-700'  },
];

export default function Pot({ state }) {
  const { game, players, auction, rounds } = state;

  const totalPot = calcPot(players, auction);

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

  const auctionedCount = players.filter(p => parseFloat(auction[p.id]?.amount) > 0).length;

  return (
    <div className="p-4 space-y-4">

      {/* Main pot */}
      <div className="bg-green-800 text-white rounded-2xl p-6 text-center shadow-lg">
        <div className="text-xs uppercase tracking-widest opacity-70 mb-1">Total Pot</div>
        <div className="text-5xl font-bold">${totalPot.toFixed(2)}</div>
        <div className="text-xs opacity-60 mt-2">{auctionedCount} of {players.length} players auctioned</div>
      </div>

      {/* Projected payouts */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">Projected Payouts</h2>

        {players.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-2">Add players in Setup first.</p>
        ) : (
          <div className="space-y-3">
            {PAYOUT_TIERS.map(({ label, pct, bg, text }, idx) => {
              const entry = standings[idx];
              if (!entry) return null;
              const { player, auc, performance, roundsPlayed } = entry;
              const gross = totalPot * pct;
              const splits = auc?.splits ?? [];
              const hasBuyback = auc?.hasBuyback ?? false;
              const buyerShare = hasBuyback ? 0.5 : 1.0;
              const playerPayout = hasBuyback ? gross * 0.5 : 0;

              return (
                <div key={label} className={`rounded-xl border p-3 ${bg}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide ${text}`}>
                        {label} · {(pct * 100).toFixed(0)}%
                      </div>
                      <div className="font-bold text-lg text-gray-800 mt-0.5">{player.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {roundsPlayed > 0
                          ? `Performance: ${performance >= 0 ? '+' : ''}${performance}`
                          : 'No scores yet'}
                      </div>
                    </div>
                    <div className="text-xl font-bold text-green-700">${gross.toFixed(2)}</div>
                  </div>

                  {(splits.length > 0 || hasBuyback) && (
                    <div className="mt-2 pt-2 border-t border-black/5 text-xs space-y-0.5">
                      {splits.map((s, i) => (
                        <div key={i} className="flex justify-between text-gray-600">
                          <span>{s.name || '?'}{splits.length > 1 ? ` (${s.pct}%)` : ''}</span>
                          <span className="font-semibold">
                            ${(gross * buyerShare * ((parseFloat(s.pct) || 0) / 100)).toFixed(2)}
                          </span>
                        </div>
                      ))}
                      {hasBuyback && (
                        <div className="flex justify-between text-orange-600">
                          <span>{player.name} (buyback)</span>
                          <span className="font-semibold">${playerPayout.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Auction breakdown */}
      {auctionedCount > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">Auction Breakdown</h2>
          <div className="space-y-2">
            {players.map(p => {
              const a = auction[p.id];
              const bid = parseFloat(a?.amount) || 0;
              if (!bid) return null;
              const splits = a?.splits ?? [];
              return (
                <div key={p.id} className="py-1.5 border-b border-gray-50 last:border-0">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{p.name}</span>
                    <span className="font-semibold">${bid.toFixed(2)}</span>
                  </div>
                  {splits.length > 0 && (
                    <div className="mt-0.5 text-xs text-gray-400">
                      {splits.map(s => `${s.name || '?'} ${s.pct}%`).join(' · ')}
                      {a.hasBuyback && ` · ${p.name} buyback 50%`}
                    </div>
                  )}
                </div>
              );
            }).filter(Boolean)}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between text-sm font-bold">
            <span>Total</span>
            <span className="text-green-700">${totalPot.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
