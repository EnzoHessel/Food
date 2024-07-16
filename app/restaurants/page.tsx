"use client"

import { Restaurant } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { searchForRestaurant } from './_actions/search';
import Header from '../_components/header';
import RestaurantItem from '../_components/restaurant-item';

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const searchFor = searchParams.get("search");
      if (!searchFor) return
      const foundRestaurants = await searchForRestaurant(searchFor);
        setRestaurants(foundRestaurants)
    };

    fetchRestaurants()
  }, [searchParams]);

  // TODO fazer uma tratativa para quando n tiver nada encontrado

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="font-semibold text-lg mb-6">Restaurantes encotrados</h2>
        <div className="flex flex-col gap-6 w-full">
        {restaurants.map(restaurant => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            className="min-w-full max-w-full"
          />
        ))}
        </div>
      </div>
    </>
  )
}

export default Restaurants