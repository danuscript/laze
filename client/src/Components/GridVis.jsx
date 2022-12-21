import { useContext } from 'react';
import { useEffect } from 'react';
import { GlobalContext } from '../Context/GlobalState';
import CellVis from './CellVis';

export default function Grid({ grid }) {
  const { move } = useContext(GlobalContext);

  useEffect(() => {
    const handleKey = ({ key }) => {
      if (key.includes('Arrow')) move(key.slice(5));
    };

    window.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, []);

  return (
    <div className='grid grid1' style={{
      gridTemplateColumns: `repeat(${grid.columns}, 1fr)`,
    }}>
      {grid.grid.map((row) => (
        row.map((cell) => (
          <CellVis key={`${cell.row},${cell.column}`}
            cell={cell}
            distance={grid.contentsOf(cell)} />
        ))
      ))}
    </div>
  );
};
