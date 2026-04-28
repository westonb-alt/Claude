import { useState } from 'react';
import { holePoints, holeLabel, roundPoints } from '../lib/scoring';

const PT_COLORS = {
  8: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  4: 'bg-green-100 text-green-700 border-green-300',
  2: 'bg-blue-100 text-blue-700 border-blue-300',
  1: 'bg-gray-100 text-gray-600 border-gray-300',
  0: 'bg-red-50 text-red-400 border-red-200',
};

export default function Scoring({ state, setRounds }) {
  const { game, players, rounds } = state;
  const [activeRound, setActiveRound] = useState(1);
  const [activePlayerId, setActivePlayerId] = useState(null);

  function getRound(num) {
    return rounds.find(r => r.id === num) ?? { id: num, scores: {} };
  }

  function updateScore(roundNum, playerId, holeIdx, raw) {
    const round = getRound(roundNum);
    const prev = round.scores[playerId] ?? Array(18).fill('');
    const next = [...prev];
    next[holeIdx] = raw === '' ? '' : Math.max(1, parseInt(raw) || 1);

    const newRound = { ...round, scores: { ...round.scores, [playerId]: next } };
    setRounds([...rounds.filter(r => r.id !== roundNum), newRound]);
  }

  const round = getRound(activeRound);
  const activePlayer = players.find(p => p.id === activePlayerId);

  if (players.length === 0) {
    return <p className="text-center text-gray-400 mt-16 text-sm">Add players in Setup first.</p>;
  }

  return (
    <div className="p-4 space-y-4">

      {/* Round tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Array.from({ length: game.numRounds }, (_, i) => i + 1).map(r => (
          <button
            key={r}
            onClick={() => { setActiveRound(r); setActivePlayerId(null); }}
            className={`flex-shrink-0 px-5 py-2 rounded-xl text-sm font-bold transition-colors ${
              activeRound === r ? 'bg-green-700 text-white shadow' : 'bg-white text-gray-600 border border-gray-200'
            }`}
          >Round {r}</button>
        ))}
      </div>

      {/* Player cards */}
      <div className="grid grid-cols-2 gap-3">
        {players.map(p => {
          const scores = round.scores[p.id] ?? [];
          const pts = roundPoints(scores, game.holePars);
          const holesIn = scores.filter(s => s !== '' && s !== undefined).length;
          const quota = 36 - p.handicap;
          const diff = pts - quota;
          const isActive = activePlayerId === p.id;

          return (
            <button
              key={p.id}
              onClick={() => setActivePlayerId(isActive ? null : p.id)}
              className={`rounded-2xl p-3 text-left border-2 transition-all ${
                isActive ? 'border-green-600 bg-green-50' : 'border-transparent bg-white shadow-sm'
              }`}
            >
              <div className="font-bold text-sm truncate">{p.name}</div>
              <div className="text-xs text-gray-400 mb-2">{holesIn}/18 holes</div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-700 leading-none">{pts}</div>
                  <div className="text-xs text-gray-400">pts</div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-bold ${diff >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {diff >= 0 ? '+' : ''}{holesIn > 0 ? diff : '—'}
                  </div>
                  <div className="text-xs text-gray-400">vs {quota}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Hole entry for selected player */}
      {activePlayer && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-green-700 text-white px-4 py-3 flex justify-between items-center">
            <span className="font-bold">{activePlayer.name} — Round {activeRound}</span>
            <span className="text-sm opacity-80">Quota: {36 - activePlayer.handicap}</span>
          </div>

          {[
            { label: 'Front 9', range: [0, 9] },
            { label: 'Back 9',  range: [9, 18] },
          ].map(({ label, range }) => {
            const scores = round.scores[activePlayer.id] ?? Array(18).fill('');
            const nineTotal = game.holePars.slice(...range).reduce((a, b) => a + b, 0);
            const ninePts = scores.slice(...range).reduce((sum, s, i) => {
              if (s === '' || s === undefined) return sum;
              return sum + holePoints(Number(s), game.holePars[range[0] + i]);
            }, 0);

            return (
              <div key={label}>
                <div className="px-4 py-2 bg-gray-50 flex justify-between items-center border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
                  <span className="text-xs text-gray-400">Par {nineTotal} · {ninePts} pts</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {Array.from({ length: 9 }, (_, j) => {
                    const holeIdx = range[0] + j;
                    const par = game.holePars[holeIdx];
                    const s = scores[holeIdx];
                    const pts = (s !== '' && s !== undefined) ? holePoints(Number(s), par) : null;
                    const info = pts !== null ? holeLabel(Number(s), par) : null;

                    return (
                      <div key={holeIdx} className="flex items-center gap-3 px-4 py-2.5">
                        <div className="w-6 text-xs text-gray-400 text-center font-medium">{holeIdx + 1}</div>
                        <div className="w-10 text-xs text-gray-400 text-center">P{par}</div>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="1"
                          max="15"
                          value={s === '' || s === undefined ? '' : s}
                          onChange={e => updateScore(activeRound, activePlayer.id, holeIdx, e.target.value)}
                          placeholder="—"
                          className="w-14 border border-gray-200 rounded-xl text-center py-1.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {pts !== null && (
                          <div className={`flex-1 flex items-center gap-1.5`}>
                            <span className={`text-sm font-bold px-2 py-0.5 rounded-lg border ${PT_COLORS[pts]}`}>
                              {pts}pt
                            </span>
                            {info?.emoji && <span className="text-sm">{info.emoji}</span>}
                            <span className={`text-xs ${info?.color}`}>{info?.label}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Round total */}
          {(() => {
            const scores = round.scores[activePlayer.id] ?? [];
            const pts = roundPoints(scores, game.holePars);
            const holesIn = scores.filter(s => s !== '' && s !== undefined).length;
            const quota = 36 - activePlayer.handicap;
            const diff = pts - quota;
            return (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">Round {activeRound} Total</span>
                <div className="text-right">
                  <span className="text-lg font-bold text-green-700">{pts} pts</span>
                  <span className={`ml-2 text-sm font-bold ${diff >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    ({diff >= 0 ? '+' : ''}{holesIn > 0 ? diff : '0'} vs quota)
                  </span>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
