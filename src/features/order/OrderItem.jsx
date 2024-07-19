import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice, removeIngredients, addIngredients } =
    item;
  const ingredientsLast = ingredients
    .filter(item => !removeIngredients.includes(item))
    .concat(addIngredients);

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients
          ? 'Loading...'
          : ingredientsLast.length === 0
            ? "(This pizza doesn't have ingredients)"
            : ingredientsLast.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
