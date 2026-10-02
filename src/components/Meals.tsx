import { useState, useEffect } from 'react';

import MealItem from './MealItem';
import type { Meal } from '../types';

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState<Meal[]>([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch('http://localhost:3000/meals');

      if (!response.ok) {
        // ...
      }

      const meals: Meal[] = await response.json();
      setLoadedMeals(meals);
    }

    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}