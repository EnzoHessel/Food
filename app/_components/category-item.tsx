import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  return (
    <Link
      href={`/categories/${category.id}/products`}
      className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-4 shadow-sm"
    >
      <div className="relative w-6 h-6">
        <Image
          src={category.imageUrl}
          alt={category.name}
          fill
          sizes="100%"
          className="object-contain"
        />
      </div>

      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  );
};

export default CategoryItem;