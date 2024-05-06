import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";
import ProductsList from "./_components/product-list";
import { Button } from "./_components/ui/button";
import { ChevronRightIcon } from "lucide-react";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner01.svg"
          alt="Até 30% de desconto em pizzas"
          width={0}
          height={0}
          className="w-full h-auto object-contain"
          sizes="100vw"
          quality={100}
        />
      </div>


      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button variant="ghost" className="text-primary p-0 hover:bg-transparent h-fit">
            Ver todos
            <ChevronRightIcon size={16}/>
          </Button>
        </div>
        <ProductsList />
      </div>
    </>
  )
}

export default Home;