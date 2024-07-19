import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteIngredient } from './cartSlice';

function DeleteIngredientButton({ pizzaId, ingredient }) {
  const dispatch = useDispatch();
  // console.log(pizzaId, ingredient);
  return (
    <Button
      type="small"
      onClick={() => {
        dispatch(deleteIngredient(pizzaId, ingredient));
      }}
    >
      delete
    </Button>
  );
}

export default DeleteIngredientButton;
