import { db } from "@/app/_lib/prisma"
import { notFound } from "next/navigation"
import RestaurantImage from "./_components/restaurant-image"
import Image from "next/image"
import { StarIcon } from "lucide-react"
import DeliveryInfo from "@/app/_components/delivery-info"
import ProductList from "@/app/_components/product-list"

interface RestaurantPageProps {
  params: {
    id: string
  }
}

const RestaurantPage = async ({params: { id }}: RestaurantPageProps) => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id
    },
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                }
              }
            }
          }
        }
      },
      products: {
        take: 10,
        include: {
          restaurant: {
            select: {
              name: true,
            }
          }
        }
      }
    }
  })

  if (!restaurant) {
    return notFound();
  }
  return (
    <div>
      <RestaurantImage restaurant={restaurant} />

      <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white flex items-center justify-between px-5 pt-5">
        {/* titulo */}
        <div className="flex items-center gap-[0.375rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>

        {/* avaliação */}
        <div className="left-[10px] top-[10px] flex items-center gap-[4px] rounded-full bg-foreground text-white px-[10px] py-1">
          <StarIcon size={12} className="fill-[#FFB100] text-[#FFB100]"/>
          <span className="text-xs font-semibold">
            5.0
          </span>
        </div>
      </div>

      <div className="px-5">
        <DeliveryInfo restaurant={restaurant}/>
      </div>

      <div className="flex overflow-x-scroll gap-4 [&::-webkit-scrollbar]:hidden px-5 mt-3">
        {restaurant.categories.map(category => (
          <div key={category.id} className="bg-[#f4f4f4] min-w-[167px] rounded-lg text-center">
            <span className="text-muted-foreground text-xs">
              {category.name}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {/* TODO mostrar produtos mais pedidos quando implemetarmos realização de pedidos */}
        <h2 className="font-semibold px-5">Mais pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>

      {restaurant.categories.map(category => (
        <div className="mt-6 space-y-4" key={category.id}>
          {/* TODO mostrar produtos mais pedidos quando implemetarmos realização de pedidos */}
          <h2 className="font-semibold px-5">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
    </div>
  )
}

export default RestaurantPage
