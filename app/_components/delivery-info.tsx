import React from 'react'
import { Card } from './ui/card'
import { BikeIcon, TimerIcon } from 'lucide-react'
import { formatCurrency } from '../_helpers/price'
import { Restaurant } from '@prisma/client';

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <div>
      <Card className="flex justify-around py-3 mt-6">
        {/* custo */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <BikeIcon size={14}/>
          </div>

          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-sem">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-sm font-semibold">
              Entrega grátis
            </p>
          )}

        </div>
        {/* tempo */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="text-xs">Entrega</span>
            <TimerIcon size={14}/>
          </div>

          <p className="text-xs font-semibold">
            {restaurant.deliveryTimeMinutes} min
          </p>
        </div>
      </Card>
    </div>
  )
}

export default DeliveryInfo