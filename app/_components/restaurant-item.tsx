import { Restaurant } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "../_lib/utils";


interface RestaurantItemProp {
  restaurant: Restaurant;
  className?: string;
}


const RestaurantItem = ({ restaurant, className }: RestaurantItemProp ) => {
  return (
    <Link className={cn("min-w-[266px] max-w-[266px]", className)} href={`/restaurants/${restaurant.id}`}>
      <div className="w-full space-y-3">
        <div className="w-full h-[136px] relative">
          <Image
            src={restaurant.imageUrl}
            fill
            className="object-cover rounded-lg"
            alt={restaurant.name}
          />

          <div className="absolute left-[10px] top-[10px] flex items-center gap-[4px] rounded-full bg-white px-[10px] py-1 ">
            <StarIcon size={12} className="fill-[#FFB100] text-[#FFB100]"/>
            <span className="text-xs font-semibold">
              5.0
            </span>
          </div>

          <Button size="icon" className="absolute top-[10px] right-[10px] bg-[#FFFFFF33] w-7 h-7 rounded-full">
            <Image src="/heart.svg" width={16} height={16} alt="like"/>
          </Button>
        </div>

        <div>
          <h3 className="font-semibold text-sm">{restaurant.name}</h3>
          <div className="flex gap-3">
            <div className="flex gap-1 items-center">
              <Image src="/bike.svg" width={14} height={14} alt="bike" className="object-cover"/>
              <span className="text-xs text-muted-foreground">
                {Number(restaurant.deliveryFee) === 0
                  ? "Entrega grátis"
                  : `${formatCurrency(Number(restaurant.deliveryFee))}`}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <Image src="/timer.svg" width={14} height={14} alt="timer" className="object-cover"/>
              <span className="text-xs text-muted-foreground">
                {restaurant.deliveryTimeMinutes} min
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantItem;