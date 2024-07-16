import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProp {
  category: Category;
}

const CategoryItem = ({category}: CategoryItemProp) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex items-center justify-center gap-3 rounded-full bg-white py-[9px] px-4 w-full shadow-sm"
    >
      <div className="relative w-6 h-6">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          className="object-conta6"
        />
      </div>
      <span className="font-semibold text-sm">{category.name}</span>
    </Link>
  )
}

export default CategoryItem;