import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { useEffect, useState } from 'react';
import { addIngredient } from './cartSlice';
import { useFetcher } from 'react-router-dom';

function AddIngredient({ pizzaId }) {
  const dispatch = useDispatch();
  const [ingredient, setIngredient] = useState('');

  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );

  const allIngredients = [];
  fetcher?.data?.forEach(pizza =>
    pizza.ingredients.forEach(ingredient => allIngredients.push(ingredient)),
  );
  const allIngredientsSet = [...new Set(allIngredients)];

  return (
    <div>
      <select
        disabled={fetcher.state === 'loading'}
        onChange={e => setIngredient(e.target.value)}
        value={ingredient}
        placeholder="ingredient"
        className="rounded-full border border-stone-200 px-2 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-400"
      >
        <option value="">Please choose an ingredient</option>{' '}
        {allIngredientsSet.map(el => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>
      <Button
        type="secondarySmallYellow"
        onClick={() => {
          setIngredient('');
          dispatch(addIngredient(pizzaId, ingredient));
        }}
      >
        Add ingredient
      </Button>
    </div>
  );
}

export default AddIngredient;
