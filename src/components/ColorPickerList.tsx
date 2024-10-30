import { colors } from "../data";

interface IProps {
  selectedColors: string[];
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
}
const ColorPickerList = ({ selectedColors, setSelectedColors }: IProps) => {
  /* ────────────── STATE ────────────── */

  /* ────────────── Handler ────────────── */
  function addColorHandler(color: string) {
    setSelectedColors((colors) =>
      colors.some((c) => c === color)
        ? colors.filter((c) => c !== color)
        : [...colors, color],
    );
  }

  /* ────────────── Render ────────────── */
  const textColorsList = selectedColors.map((c) => (
    <span
      key={c}
      className={`mr-2 rounded-lg p-1 text-sm text-white`}
      style={{ backgroundColor: c }}
    >
      {c}
    </span>
  ));

  const circleColorsList = colors.map((c) => (
    <span
      key={c}
      onClick={() => addColorHandler(c)}
      className={`mr-2 inline-block h-5 w-5 cursor-pointer rounded-full`}
      style={{ backgroundColor: c }}
    />
  ));

  return (
    <div className="flex flex-col gap-5">
      <div className="overflow-x-auto">{textColorsList}</div>
      <div>{circleColorsList}</div>
    </div>
  );
};

export default ColorPickerList;
