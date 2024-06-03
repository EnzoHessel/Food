import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProp {
  category: Category;
}

const CategoryItem = ({category}: CategoryItemProp) => {
  return (
    <div className="flex items-center gap-3 py-[9px] px-4 bg-white rounded-full min-w-max shadow-sm">
      <Image src={category.imageUrl} alt={category.name} width={30} height={30}/>
      <span className="font-semibold text-sm">{category.name}</span>
    </div>
  )
}

export default CategoryItem;