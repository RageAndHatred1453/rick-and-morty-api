import { useEffect, useState } from 'react';

export default function App() {
  // Состояния: список персонажей, загрузка и поиск
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // Запрос к API при загрузке страницы
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => {
        if (!res.ok) throw new Error('Ошибка загрузки');
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Фильтрация персонажей по поиску
  const filtered = characters.filter((char) =>
    char.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#1a1a2e', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#00ffcc' }}>Рик и Морти — Персонажи</h1>

      {/* Поле поиска */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Поиск по имени..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: 'none', width: '300px', fontSize: '16px' }}
        />
      </div>

      {/* Обработка состояний */}
      {loading && <p style={{ textAlign: 'center' }}>Загрузка...</p>}
      {error && <p style={{ textAlign: 'center', color: 'red' }}>Ошибка: {error}</p>}

      {/* Сетка с карточками */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {!loading && !error && filtered.length === 0 && <p>Ничего не найдено</p>}
        
        {filtered.map((char) => (
          <div
            key={char.id}
            style={{
              backgroundColor: '#16213e',
              borderRadius: '12px',
              overflow: 'hidden',
              width: '200px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
            }}
          >
            <img src={char.image} alt={char.name} style={{ width: '100%', display: 'block' }} />
            <div style={{ padding: '10px' }}>
              <h3 style={{ margin: '0 0 5px', fontSize: '18px' }}>{char.name}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#aaa' }}>
                {char.species} • {char.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}