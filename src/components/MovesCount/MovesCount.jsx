import { useStore } from '/src/store.js';
import './MovesCount.css';

function MovesCount() {
    const movesCount = useStore((state) => state.movesCount);
    
    return (
        <div className="moves-count">
            Moves: {movesCount}
        </div>
    )
}

export default MovesCount;
