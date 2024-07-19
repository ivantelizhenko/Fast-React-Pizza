import { useSelector } from 'react-redux';
import Button from '../../ui/Button';
import IngredientItem from './IngredientItem';
import { getCart } from './cartSlice';
import { useParams } from 'react-router-dom';
import EmptyCart from './EmptyCart';
import AddIngredient from './AddIngredient';

function IngredientsList() {
  const { pizzaId: currentPizzaId } = useParams();
  const cart = useSelector(getCart);
  // const arr = Array.from({ length: 5 }, (_, i) => i + 1);

  if (!cart.length) return <EmptyCart />;

  const { pizzaId, ingredients: currentPizzaIngredients } = cart.find(
    item => item.pizzaId === +currentPizzaId,
  );

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-200/20 backdrop-blur-sm">
      <div className="flex flex-col gap-2 bg-stone-200 px-6 py-3">
        {currentPizzaIngredients.length === 0 ? (
          <p className="px-2">Empty</p>
        ) : (
          <ul className="">
            {currentPizzaIngredients.map(item => (
              <IngredientItem key={item} ingredient={item} pizzaId={pizzaId} />
            ))}
          </ul>
        )}
        <AddIngredient pizzaId={pizzaId} />
        <Button to="/cart" type="secondarySmall">
          Back
        </Button>
      </div>
    </div>
  );
}

export default IngredientsList;
