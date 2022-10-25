import Link from "next/link";
import Category from "../../models/category";

type Props = {
  category: Category;
};

export default function HeaderCategory(props: Props) {
  return (
    <div className="cursor-pointer">
      <Link
        className="flex text-white"
        key={props.category.SK}
        href={`/categorias/${props.category.SK}/${props.category.Description}`}
      >
        <p className="text-white">{props.category.Description}</p>
      </Link>
    </div>
  );
}
