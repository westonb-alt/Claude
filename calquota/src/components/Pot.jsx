import { playerTotals, calcPot } from '../lib/scoring';

const PAYOUT_TIERS = [
  { label: '1st Place', pct: 0.70, bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-700' },
  { label: '2nd Place', pct: 0.20, bg: 'bg-gray-50 border-gray-200',    text: 'text-gray-700'   },
  { label: '3rd Place', pct: 0.10, bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700' },
];

export default function Pot({ state }) {
  const { game, players, auction, rounds } = state;

  const totalPot = calcPot(players, auction);

  const standings = players
    .map(p => ({
      player: p,
      auc: auction[p.id],
      ...playerTotals(p, rounds, game.holePars, game.numRounds),
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

      {/* Main pot display */}
      <div className="bg-green-800 text-white rounded-2xl p-6 text-center shadow-lg">
        <div className="text-xs uppercase tracking-widest opacity-70 mb-1">Total Pot</div>
        <div className="text-5xl font-bold">${totalPot.toFixed(2)}</div>
        <div className="text-xs opacity-60 mt-2">
          {auctionedCount} of {players.length} players auctioned
        </div>
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
              const ownerGet = auc?.hasBuyback ? gross * 0.5 : gross;
              const playerGet = auc?.hasBuyback ? gross * 0.5 : 0;

              return (
                <div key={label} className={`rounded-xl border p-3 ${bg}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide ${text}`}>{label} · {(pct * 100).toFixed(0)}%</div>
                      <div className="font-bold text-lg text-gray-800 mt-0.5">{player.name}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        {roundsPlayed > 0
                          ? `Performance: ${performance >= 0 ? '+' : ''}${performance}`
                          : 'No scores yet'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-green-700">${gross.toFixed(2)}</div>
                      {totalPot === 0 && <div className="text-xs text-gray-400">No pot yet</div>}
                    </div>
                  </div>

                  {auc?.buyerName && (
                    <div className="mt-2 pt-2 border-t border-black/5 text-xs text-gray-600 space-y-0.5">
                      {auc.hasBuyback ? (
                        <>
                          <div className="flex justify-between">
                            <span>{auc.buyerName} (owner)</span>
                            <span className="font-semibold">${ownerGet.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>{player.name} (buyback)</span>
                            <span className="font-semibold">${playerGet.toFixed(2)}</span>
                          </div>
                        </>
                      ) : (
                        <div className="flex justify-between">
                          <span>{auc.buyerName} (owner, 100%)</span>
                          <span className="font-semibold">${ownerGet.toFixed(2)}</span>
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

      {/* Auction breakdown table */}
      {auctionedCount > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">Auction Breakdown</h2>
          <div className="space-y-2">
            {players.map(p => {
              const a = auction[p.id];
              if (!parseFloat(a?.amount)) return null;
              const bid = parseFloat(a.amount);
              const bbAmt = a.hasBuyback ? bid * 0.5 : 0;
              return (
                <div key={p.id} className="flex justify-between items-center text-sm py-1 border-b border-gray-50 last:border-0">
                  <div>
                    <span className="font-medium">{p.name}</span>
                    {a.buyerName && <span className="text-gray-400 ml-1.5">→ {a.buyerName}</span>}
                    {a.hasBuyback && <span className="text-xs text-orange-500 ml-1.5">(50/50)</span>}
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">${bid.toFixed(2)}</span>
                    {bbAmt > 0 && <span className="text-orange-500 ml-1">+${bbAmt.toFixed(2)}</span>}
                  </div>
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
