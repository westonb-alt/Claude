import { useState } from 'react';

export default function Setup({ state, updateGame, setPlayers, resetGame }) {
  const { game, players } = state;
  const [name, setName]       = useState('');
  const [hcp, setHcp]         = useState('');
  const [editPars, setEditPars] = useState(false);

  const totalPar = game.holePars.reduce((a, b) => a + b, 0);

  function addPlayer() {
    if (!name.trim()) return;
    setPlayers([
      ...players,
      { id: crypto.randomUUID(), name: name.trim(), handicap: parseInt(hcp) || 0 },
    ]);
    setName('');
    setHcp('');
  }

  function updateHcp(id, value) {
    setPlayers(players.map(p => p.id === id ? { ...p, handicap: Math.min(36, Math.max(0, parseInt(value) || 0)) } : p));
  }

  function updatePar(i, value) {
    const pars = [...game.holePars];
    pars[i] = Math.min(6, Math.max(3, parseInt(value) || 4));
    updateGame({ holePars: pars });
  }

  return (
    <div className="p-4 space-y-4">

      {/* Game Info */}
      <div className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">Game Info</h2>
        <input
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={game.name}
          onChange={e => updateGame({ name: e.target.value })}
          placeholder="Game name"
        />
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 whitespace-nowrap">Rounds this weekend</label>
          <div className="flex gap-1 ml-auto">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => updateGame({ numRounds: n })}
                className={`w-9 h-9 rounded-lg text-sm font-bold transition-colors ${
                  game.numRounds === n
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >{n}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Pars */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">
            Course Pars <span className="text-green-700 font-normal">(Total: {totalPar})</span>
          </h2>
          <button
            onClick={() => setEditPars(!editPars)}
            className="text-xs text-green-700 font-semibold px-2 py-1 rounded-lg border border-green-200"
          >
            {editPars ? 'Done' : 'Edit'}
          </button>
        </div>

        {/* Front 9 */}
        <div className="mb-2">
          <div className="text-xs text-gray-400 mb-1 font-medium">Front 9</div>
          <div className="grid grid-cols-9 gap-1">
            {game.holePars.slice(0, 9).map((par, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xs text-gray-400 leading-none mb-0.5">{i + 1}</span>
                {editPars ? (
                  <input
                    type="number"
                    value={par}
                    onChange={e => updatePar(i, e.target.value)}
                    className="w-full border rounded-lg text-center text-sm font-bold p-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                ) : (
                  <span className="text-sm font-bold text-green-700">{par}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Back 9 */}
        <div>
          <div className="text-xs text-gray-400 mb-1 font-medium">Back 9</div>
          <div className="grid grid-cols-9 gap-1">
            {game.holePars.slice(9).map((par, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-xs text-gray-400 leading-none mb-0.5">{i + 10}</span>
                {editPars ? (
                  <input
                    type="number"
                    value={par}
                    onChange={e => updatePar(i + 9, e.target.value)}
                    className="w-full border rounded-lg text-center text-sm font-bold p-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                ) : (
                  <span className="text-sm font-bold text-green-700">{par}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Players */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-3">
          Players ({players.length})
        </h2>

        <div className="space-y-2 mb-3">
          {players.map(p => (
            <div key={p.id} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
              <div className="flex-1">
                <span className="font-semibold text-sm">{p.name}</span>
                <span className="text-xs text-gray-400 ml-2">Quota: {36 - p.handicap}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500">HCP</span>
                <input
                  type="number"
                  value={p.handicap}
                  onChange={e => updateHcp(p.id, e.target.value)}
                  className="w-12 border rounded-lg text-center text-sm py-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
              <button
                onClick={() => setPlayers(players.filter(x => x.id !== p.id))}
                className="text-red-400 font-bold text-lg leading-none w-6 h-6 flex items-center justify-center"
              >×</button>
            </div>
          ))}
          {players.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-2">No players yet.</p>
          )}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addPlayer()}
            placeholder="Player name"
          />
          <input
            type="number"
            value={hcp}
            onChange={e => setHcp(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addPlayer()}
            className="w-16 border border-gray-200 rounded-xl text-center text-sm py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="HCP"
          />
          <button
            onClick={addPlayer}
            className="bg-green-700 text-white rounded-xl px-4 py-2 text-sm font-bold"
          >Add</button>
        </div>
      </div>

      {/* Point Reference */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide mb-2">Quota Points</h2>
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {[['Eagle', 8, 'text-yellow-500'], ['Birdie', 4, 'text-green-600'], ['Par', 2, 'text-blue-500'], ['Bogey', 1, 'text-gray-500']].map(([label, pts, color]) => (
            <div key={label} className="bg-gray-50 rounded-xl p-2">
              <div className={`text-lg font-bold ${color}`}>{pts}</div>
              <div className="text-gray-500">{label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">Double bogey or worse = 0 pts</p>
      </div>

      {/* Reset */}
      <div className="bg-white rounded-2xl shadow-sm p-4">
        <button
          onClick={() => {
            if (window.confirm('Reset all game data? This cannot be undone.')) resetGame();
          }}
          className="w-full bg-red-50 text-red-600 border border-red-200 rounded-xl py-2.5 text-sm font-semibold"
        >
          Reset All Game Data
        </button>
      </div>
    </div>
  );
}
