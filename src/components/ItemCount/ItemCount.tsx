import React from 'react';
import { useAppStore } from '../../store'; // Asegúrate de que la ruta sea correcta

const ItemCount = () => {
    const { itemCount, increment, decrement, reset } = useAppStore();
  
    return (
      <div>
        <button onClick={decrement} disabled={itemCount <= 0}>-</button>
        <span>{itemCount}</span>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Reset</button>
      </div>
    );
  };
  
  export default ItemCount;
