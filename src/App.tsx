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
    price: 14,
  },
  {
    name: "Soup Of The Day",
    description:
      "Vegetable soup with buttered bread on the side.",
    price: 8,
  },
  {
    name: "The Big One",
    description:
      "A 12oz prime cut steak with home style skin on fries, onion rings and coleslaw.",
    price: 35,
  },
];

function App() {
  const classList = useClassList({ defaultClass: "app", maps, string: true }) as string;

  return (
    <ThemeWrapper value={"light"}>
      <div className={classList}>
        <h1 className={mc("app__name")}>EXAMPLE RESTAURANT</h1>

        <div className={mc("app__grid")}>
          <MenuSection title="Soups" items={exampleData} />

          <MenuSection title="Pizzas" items={exampleData} />

          <MenuSection title="Comfort" items={exampleData} />
        </div>
      </div>
    </ThemeWrapper>
  );
}

export default App;
