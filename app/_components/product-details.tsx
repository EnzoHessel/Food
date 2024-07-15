"use client"

import { Prisma } from "@prisma/client";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import DiscountBadge from "./discount-badge";
import Image from "next/image";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { Card } from "./ui/card";
import ProductList from "./product-list";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>;
  complemataryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    };
  }>[]}


const ProductDetails = ({ product, complemataryProducts }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantityClick = () => setQuantity(currentState => currentState + 1);
  const handleDecreaseQuantityClick = () => setQuantity(currentState => {
    if (currentState === 1) return 1
    else return currentState - 1}
  );

  return (
    <div className="py-5">
      {/* restaurante */}
      <div className="flex items-center gap-[0.365rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>
      </div>

      {/* nome do produto */}
      <h1 className="text-xl mt-1 font-semibold mb-2 px-5">{product.name}</h1>

      {/* preço do produto e quantidade */}
      <div className="flex justify-between px-5">
        {/* preco com desconto */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product}/>
            )}
          </div>

          {/* preço original */}
          <p className="text-sm text-muted-foreground">
            De: {formatCurrency(Number(product.price))}
          </p>
        </div>

        {/* quantidade */}

        <div className="flex gap-3 items-center text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border-muted-foreground border-solid border"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">
            {quantity}
          </span>
          <Button
            size="icon"
            onClick={handleIncreaseQuantityClick}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>

      {/* dados da entrega */}
      <div className="px-5">
        <Card className="flex justify-around py-3 mt-6">
          {/* custo */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega</span>
              <BikeIcon size={14}/>
            </div>

            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="text-xs font-sem">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
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
              {product.restaurant.deliveryTimeMinutes} min
            </p>

          </div>
        </Card>
      </div>

      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="font-semibold px-5">Sucos</h3>
        <ProductList products={complemataryProducts} />
      </div>
    </div>
  )
}

export default ProductDetails;
