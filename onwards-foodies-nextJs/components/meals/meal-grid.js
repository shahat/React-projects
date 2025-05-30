import classes from './meal-grid.module.css';
import MealItem from '@/components/meal-item/meal-item'
export default function MealGrid({ meals }) {
  return (
    <ul className = {
      classes.meals
    }>
      {meals.map((meal) => (
        <li key={meal.id}>
          <MealItem {...meal} /> 
        </li>
      ))}
    </ul>
  );
}


