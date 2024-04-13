// components
import ThemeWrapper from "./components/ThemeWrapper";
import MenuSection from "./components/MenuSection";

// styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./App.module.scss";
import "./interface/variables.css";

const mc = mapClassesCurried(maps, true) as (c: string) => string;

const exampleData = [
  {
    name: "Bolognese",
    description:
      "A sweet and tomatoey bolognese containing beef and pork mince, courgette, peppers, red onions and assorted seasoning.",
    price: 20,
  },
];

function App() {
  const classList = useClassList({ defaultClass: "app", maps, string: true }) as string;

  return (
    <ThemeWrapper value={"light"}>
      <div className={classList}>
        <h1 className={mc("app__name")}>NAME</h1>

        <MenuSection title="Example" items={exampleData} />
      </div>
    </ThemeWrapper>
  );
}

export default App;
