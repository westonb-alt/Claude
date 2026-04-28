import { calcPot } from '../lib/scoring';

function evenSplit(splits) {
  if (splits.length === 0) return splits;
  const base = Math.floor(100 / splits.length);
  const rem = 100 - base * splits.length;
  return splits.map((s, i) => ({ ...s, pct: base + (i === splits.length - 1 ? rem : 0) }));
}

export default function Auction({ state, updateAuction }) {
  const { players, auction } = state;

  function get(playerId) {
    return auction[playerId] ?? { amount: '', hasBuyback: false, splits: [] };
  }

  function patch(playerId, changes) {
    updateAuction({ [playerId]: { ...get(playerId), ...changes } });
  }

  function addSplit(playerId) {
    const a = get(playerId);
    patch(playerId, { splits: evenSplit([...a.splits, { id: crypto.randomUUID(), name: '', pct: 0 }]) });
  }

  function removeSplit(playerId, sid) {
    const a = get(playerId);
    patch(playerId, { splits: evenSplit(a.splits.filter(s => s.id !== sid)) });
  }

  function updateSplit(playerId, sid, field, value) {
    const a = get(playerId);
    patch(playerId, { splits: a.splits.map(s => s.id === sid ? { ...s, [field]: value } : s) });
  }

  const totalPot = calcPot(players, auction);
  const auctioned = players.filter(p => parseFloat(auction[p.id]?.amount) > 0).length;

  return (
    <div className="p-4 space-y-4">

      {/* Pot banner */}
      <div className="bg-green-800 text-white rounded-2xl p-5 text-center shadow">
        <div className="text-xs uppercase tracking-widest opacity-70 mb-1">Total Pot</div>
        <div className="text-4xl font-bold">${totalPot.toFixed(2)}</div>
        <div className="text-xs opacity-60 mt-1">{auctioned} of {players.length} players auctioned</div>
        {totalPot > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
            {[[70, '1st'], [20, '2nd'], [10, '3rd']].map(([pct, place]) => (
              <div key={place} className="bg-white/10 rounded-xl py-1.5">
                <div className="font-bold text-sm">${(totalPot * pct / 100).toFixed(2)}</div>
                <div className="opacity-70">{place} ({pct}%)</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {players.length === 0 && (
        <p className="text-center text-gray-400 mt-8 text-sm">Add players in Setup first.</p>
      )}

      {players.map(p => {
        const a = get(p.id);
        const bid = parseFloat(a.amount) || 0;
        const pctTotal = a.splits.reduce((s, x) => s + (parseFloat(x.pct) || 0), 0);
        const pctOk = a.splits.length === 0 || Math.round(pctTotal) === 100;
        const isSet = bid > 0 && a.splits.length > 0 && pctOk;

        return (
          <div key={p.id} className={`bg-white rounded-2xl shadow-sm p-4 border-2 transition-colors ${isSet ? 'border-green-200' : 'border-transparent'}`}>

            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-bold text-base">{p.name}</div>
                <div className="text-xs text-gray-400">HCP {p.handicap} · Quota {36 - p.handicap}</div>
              </div>
              {bid > 0 && <div className="font-bold text-green-700 text-lg">${bid.toFixed(2)}</div>}
            </div>

            {/* Bid */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-600">Winning bid</span>
              <div className="relative ml-auto">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={a.amount}
                  onChange={e => patch(p.id, { amount: e.target.value })}
                  placeholder="0"
                  className="w-28 border border-gray-200 rounded-xl pl-6 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Buyback toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer select-none mb-3">
              <div
                onClick={() => patch(p.id, { hasBuyback: !a.hasBuyback })}
                className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${a.hasBuyback ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${a.hasBuyback ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-gray-700">
                {p.name} buys back 50% — payout split with buyer(s)
              </span>
            </label>

            {/* Splits */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Buyers
                  {a.splits.length > 0 && !pctOk && (
                    <span className="text-red-500 ml-1">(must total 100% — currently {Math.round(pctTotal)}%)</span>
                  )}
                </span>
                <button
                  onClick={() => addSplit(p.id)}
                  className="text-xs text-green-700 font-semibold px-2 py-1 rounded-lg border border-green-200"
                >+ Add buyer</button>
              </div>

              {a.splits.map(split => (
                <div key={split.id} className="flex items-center gap-2">
                  <input
                    className="flex-1 border border-gray-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={split.name}
                    onChange={e => updateSplit(p.id, split.id, 'name', e.target.value)}
                    placeholder="Buyer name"
                  />
                  <div className="relative flex-shrink-0">
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={split.pct}
                      onChange={e => updateSplit(p.id, split.id, 'pct', parseFloat(e.target.value) || 0)}
                      className="w-16 border border-gray-200 rounded-xl text-center py-1.5 text-sm pr-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">%</span>
                  </div>
                  <button
                    onClick={() => removeSplit(p.id, split.id)}
                    className="text-red-400 font-bold text-lg leading-none w-6 h-6 flex items-center justify-center flex-shrink-0"
                  >×</button>
                </div>
              ))}

              {a.splits.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-1">No buyers yet — tap "+ Add buyer"</p>
              )}
            </div>

            {/* Summary */}
            {isSet && (
              <div className="mt-3 bg-gray-50 rounded-xl px-3 py-2 text-xs text-gray-500 space-y-0.5">
                {a.splits.map(s => (
                  <div key={s.id} className="flex justify-between">
                    <span className="font-medium text-gray-700">{s.name || '?'}</span>
                    <span>{s.pct}% of {a.hasBuyback ? '50%' : '100%'} of payout</span>
                  </div>
                ))}
                {a.hasBuyback && (
                  <div className="flex justify-between text-orange-600">
                    <span className="font-medium">{p.name} (buyback)</span>
                    <span>50% of payout</span>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
