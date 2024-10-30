import { IProduct } from "../interfaces";
import { textSlicer } from "../utils/functions";
import CircleColor from "./CircleColor";
import Image from "./Image";
import Button from "./UI/Button";

interface IProps {
  product: IProduct;
  index: number;
  onEdit: (product: IProduct, index: number) => void;
  onDelete: (product: IProduct, index: number) => void;
}

const ProductCard = ({ product, onEdit, index, onDelete }: IProps) => {
  const maxNumberOfColorsToRender = 4;

  /* ────────────── Render  ────────────── */
  const renderColors = product.colors
    .slice(0, maxNumberOfColorsToRender)
    .map((c) => <CircleColor key={c} color={c} />);

  /* ────────────── Derived Values  ────────────── */
  const NumberOfColorsToRender =
    product.colors.length - maxNumberOfColorsToRender;

  return (
    <div className="mx-auto flex max-w-sm flex-col justify-between rounded-lg border-2 p-3 md:mx-0 md:max-w-none">
      <Image
        imageURL={product.imageURL}
        alt="car"
        className="h-[180px] bg-contain"
      />
      <h3 className="text-1xl mt-3">{product.title}</h3>
      <p className="mt-2">{textSlicer(product.description, 50)}</p>
      <div className="flex items-center">
        {renderColors}{" "}
        {NumberOfColorsToRender > 0 && `+${NumberOfColorsToRender}`}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="text-[20px]">
          ${Number(product.price).toLocaleString("en-US")}
        </span>
        <Image
          imageURL={product.category.imageURL}
          alt="car"
          className="h-[40px] w-[40px] rounded-full bg-contain"
        />
      </div>

      <div className="mt-3 flex gap-5 text-white">
        <Button
          onClick={() => onEdit(product, index)}
          width="w-full"
          className="bg-blue-500"
        >
          Edit
        </Button>
        <Button
          onClick={() => onDelete(product, index)}
          width="w-full"
          className="bg-red-600"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
