// components
import ThemeWrapper from "./components/ThemeWrapper";

// styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./App.module.scss";
import "./interface/variables.css";

const mc = mapClassesCurried(maps, true) as (c: string) => string;

function App() {
  const classList = useClassList({ defaultClass: "app", maps, string: true }) as string;

  return (
    <ThemeWrapper value={"light"}>
      <div className={classList}>
        <h1 className={mc('app__name')}>NAME</h1>
      </div>
    </ThemeWrapper>
  );
}

export default App;
