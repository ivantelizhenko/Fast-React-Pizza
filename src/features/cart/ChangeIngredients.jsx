import Button from '../../ui/Button';

function ChangeIngredients({ pizzaId }) {
  return (
    <Button type="secondarySmall" to={`${pizzaId}`}>
      Change ingredients
    </Button>
  );
}

export default ChangeIngredients;
