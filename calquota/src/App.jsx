import { useState, useEffect } from 'react';
import Setup from './components/Setup';
import Auction from './components/Auction';
import Scoring from './components/Scoring';
import Leaderboard from './components/Leaderboard';
import Pot from './components/Pot';

const STORAGE_KEY = 'calquota_v1';

const DEFAULT_PARS = [4, 4, 3, 4, 4, 3, 4, 5, 4, 4, 3, 4, 4, 5, 3, 4, 4, 5];

const defaultState = {
  game: {
    name: 'Calquota 2026',
    numRounds: 3,
    holePars: DEFAULT_PARS,
  },
  players: [],
  auction: {},
  rounds: [],
};

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultState;
  } catch {
    return defaultState;
  }
}

export default function App() {
  const [state, setState] = useState(load);
  const [tab, setTab] = useState('leaderboard');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const updateGame   = (patch) => setState(s => ({ ...s, game: { ...s.game, ...patch } }));
  const setPlayers   = (players) => setState(s => ({ ...s, players }));
  const updateAuction = (patch) => setState(s => ({ ...s, auction: { ...s.auction, ...patch } }));
  const setRounds    = (rounds) => setState(s => ({ ...s, rounds }));
  const resetGame    = () => setState(defaultState);

  const tabs = [
    { id: 'setup',       icon: '⚙️',  label: 'Setup' },
    { id: 'auction',     icon: '🔨',  label: 'Auction' },
    { id: 'scoring',     icon: '✏️',  label: 'Scores' },
    { id: 'leaderboard', icon: '🏆',  label: 'Board' },
    { id: 'pot',         icon: '💰',  label: 'Pot' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col max-w-lg mx-auto">
      <header className="bg-green-800 text-white px-4 py-3 shadow-md flex items-center justify-between">
        <span className="text-xl">⛳</span>
        <h1 className="text-lg font-bold tracking-wide">{state.game.name}</h1>
        <span className="text-sm opacity-60">{state.players.length}P</span>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        {tab === 'setup'       && <Setup       state={state} updateGame={updateGame} setPlayers={setPlayers} resetGame={resetGame} />}
        {tab === 'auction'     && <Auction     state={state} updateAuction={updateAuction} />}
        {tab === 'scoring'     && <Scoring     state={state} setRounds={setRounds} />}
        {tab === 'leaderboard' && <Leaderboard state={state} />}
        {tab === 'pot'         && <Pot         state={state} />}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white border-t border-gray-200 flex shadow-lg">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 flex flex-col items-center gap-0.5 text-xs font-medium transition-colors ${
              tab === t.id
                ? 'text-green-700 border-t-2 border-green-700 -mt-px'
                : 'text-gray-400'
            }`}
          >
            <span className="text-base leading-none">{t.icon}</span>
            {t.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
