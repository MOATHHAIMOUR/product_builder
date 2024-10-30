import { ChangeEvent, FormEvent, useState } from "react";
import ProductCard from "./components/ProductCard";
import Modal from "./components/UI/Modal";
import { categories, formInputsList, productList } from "./data";
import Button from "./components/UI/Button";
import Input from "./components/UI/Input";
import { ICategory, IProduct } from "./interfaces";
import { productValidation } from "./validations";
import ErrorMsg from "./components/ErrorMsg";
import ColorPickerList from "./components/ColorPickerList";
import { v4 as uuid } from "uuid";
import SelectMenu from "./components/UI/SelectMenu";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const defaultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    category: {
      imageURL: "",
      name: "",
    },
    colors: [],
  };
  const defaultError = {
    description: "",
    imageURL: "",
    price: "",
    title: "",
    category: "",
    color: "",
  };

  /* ────────────── STATE ────────────── */

  const [isOpen, setIsOpen] = useState(false);

  const [tempColors, setTempColors] = useState<string[]>([]);

  const [product, SetProduct] = useState<IProduct>(defaultProduct);

  const [isEdit, setIsEdit] = useState(false);

  const [productIndex, setProductIndex] = useState(0);

  const [error, setError] = useState<{
    title: string;
    description: string;
    imageURL: string;
    price: string;
    category: string;
    color: string;
  }>(defaultError);

  const [products, setProducts] = useState<IProduct[]>(productList);

  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    imageURL: string;
  } | null>(categories[0]);

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  /* ────────────── Handler ────────────── */

  function openModal() {
    setIsEdit(false);
    setTempColors([]);
    SetProduct(defaultProduct);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setError(defaultError);
    SetProduct(defaultProduct);
  }

  function onChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    SetProduct((product) => ({ ...product, [name]: value }));
    setError((err) => ({ ...err, [name]: "" }));
  }

  function submitHandler(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { title, price, description, imageURL } = product;

    const errors = productValidation({
      title,
      description,
      price,
      imageURL,
      category: selectedCategory,
      colors: tempColors,
    });

    const hasError = Object.values(errors).some((o) => o !== "");

    if (hasError) {
      setError(errors);
      return;
    }

    // Reset Every thing after submit form
    setError(defaultError);
    console.log(product);
    if (isEdit) {
      const updatedProducts = [...products];
      updatedProducts[productIndex] = {
        ...product,
        category: selectedCategory as ICategory,
        colors: tempColors,
      };
      setProducts(updatedProducts);
    } else {
      setProducts((prev) => [
        {
          ...product,
          id: uuid(),
          colors: tempColors,
          category: selectedCategory!,
        },
        ...prev,
      ]);
    }

    setTempColors([]);
    closeModal();
  }

  function onCancel() {
    SetProduct(defaultProduct);
    setError(defaultError);
    closeModal();
  }

  function onEditHandler(product: IProduct, index: number) {
    openModal();
    setIsEdit(true);
    SetProduct(product);
    setTempColors(product.colors);
    setSelectedCategory(product.category as ICategory);
    setProductIndex(index);
  }

  function removeProductHandler() {
    setProducts((products) => products.filter((p) => p.id !== product.id && p));
    setConfirmDeleteModal(false);
    SetProduct(defaultProduct);
    toast("Removed Successfully");
  }

  /* ────────────── Render  ────────────── */

  const renderProductList = products.map((p, index) => (
    <ProductCard
      key={p.id}
      product={p}
      onEdit={onEditHandler}
      index={index}
      onDelete={(product, index) => {
        setConfirmDeleteModal(true);
        setProductIndex(index);
        SetProduct(product);
      }}
    />
  ));

  const renderFormInputList = formInputsList.map((input) => (
    <div key={input.id} className="flex flex-col gap-1">
      <label htmlFor={input.id}>{input.label}</label>
      <Input
        id={input.id}
        type={input.type}
        name={input.name}
        onChange={onChangeHandler}
        value={product[input.name]}
      />
      {error[input.name] !== "" && <ErrorMsg msg={error[input.name]} />}
    </div>
  ));

  /* ────────────── TSX  ────────────── */

  return (
    <main
      className={`container ${isOpen || confirmDeleteModal ? "blur-md" : ""} `}
    >
      <div className="mx-auto w-fit">
        <Button
          className="my-10 w-44 rounded-md border-2 bg-blue-600 p-2 text-white"
          onClick={openModal}
        >
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {renderProductList}
      </div>
      {/* ADD And Edit PRODUCT MODAL */}
      <Modal
        title={isEdit ? "Edit Product" : "Add New Product"}
        isOpen={isOpen}
        closeModal={closeModal}
      >
        <form onSubmit={submitHandler} className="space-y-4">
          {renderFormInputList}
          <div>
            <ColorPickerList
              selectedColors={tempColors}
              setSelectedColors={setTempColors}
            />
            {error !== null && error["color"] !== "" && (
              <ErrorMsg msg={error.color} />
            )}
          </div>

          <div>
            <SelectMenu
              selected={selectedCategory}
              setSelected={(value) => setSelectedCategory(value)}
            />
            {error !== null && error["category"] !== "" && (
              <ErrorMsg msg={error.category} />
            )}
          </div>

          <div className="flex gap-4">
            <Button className="bg-blue-500 text-white" width="w-full">
              Submit
            </Button>
            <Button
              onClick={onCancel}
              className="bg-gray-400 text-white"
              width="w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/*  Delete Product Modal */}
      <Modal
        isOpen={confirmDeleteModal}
        closeModal={() => setConfirmDeleteModal(false)}
        title="Delete Product"
      >
        <div className="flex flex-col space-y-8">
          <p>
            Are you sure Do You want to delete Product with Id:
            <span className="text-green-500">{" " + product.id}</span>
          </p>
          <div className="flex justify-between gap-5">
            <Button
              width="w-full"
              className="rounded-md bg-blue-400 text-white"
              onClick={removeProductHandler}
            >
              Delete
            </Button>
            <Button
              width="w-full"
              className="rounded-md bg-red-400 text-white"
              onClick={() => setConfirmDeleteModal(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
      <Toaster />
    </main>
  );
}
export default App;
