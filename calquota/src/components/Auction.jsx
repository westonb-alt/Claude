function calcPot(players, auction) {
  return players.reduce((sum, p) => {
    const a = auction[p.id];
    if (!a) return sum;
    const bid = parseFloat(a.amount) || 0;
    return sum + bid + (a.hasBuyback ? bid * 0.5 : 0);
  }, 0);
}

export default function Auction({ state, updateAuction }) {
  const { players, auction } = state;

  function set(playerId, field, value) {
    const cur = auction[playerId] || { buyerName: '', amount: '', hasBuyback: false };
    updateAuction({ [playerId]: { ...cur, [field]: value } });
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
        const a = auction[p.id] || { buyerName: '', amount: '', hasBuyback: false };
        const bid = parseFloat(a.amount) || 0;
        const buybackAmt = (bid * 0.5).toFixed(2);
        const isSet = a.buyerName && bid > 0;

        return (
          <div key={p.id} className={`bg-white rounded-2xl shadow-sm p-4 border-2 transition-colors ${
            isSet ? 'border-green-200' : 'border-transparent'
          }`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-bold text-base">{p.name}</div>
                <div className="text-xs text-gray-400">HCP {p.handicap} · Quota {36 - p.handicap}</div>
              </div>
              {isSet && (
                <div className="text-right">
                  <div className="font-bold text-green-700">${bid.toFixed(2)}</div>
                  {a.hasBuyback && (
                    <div className="text-xs text-orange-500">+${buybackAmt} back</div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={a.buyerName}
                  onChange={e => set(p.id, 'buyerName', e.target.value)}
                  placeholder="Winning bidder name"
                />
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className="w-24 border border-gray-200 rounded-xl pl-6 pr-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={a.amount}
                    onChange={e => set(p.id, 'amount', e.target.value)}
                    placeholder="Bid"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <div
                  onClick={() => set(p.id, 'hasBuyback', !a.hasBuyback)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    a.hasBuyback ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                    a.hasBuyback ? 'translate-x-5' : 'translate-x-0.5'
                  }`} />
                </div>
                <span className="text-sm text-gray-700">
                  {p.name} buys back 50%
                  {bid > 0 && <span className="text-gray-400"> (${buybackAmt})</span>}
                </span>
              </label>
            </div>

            {isSet && (
              <div className="mt-3 bg-gray-50 rounded-xl px-3 py-2 text-xs text-gray-500">
                <span className="font-medium text-gray-700">{a.buyerName}</span> owns {p.name}
                {a.hasBuyback ? ` · 50/50 split on winnings` : ` · 100% of payout`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
