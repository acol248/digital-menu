// styles
import useClassList, { mapClassesCurried } from "@blocdigital/useclasslist";
import maps from "./MenuSection.module.scss";
const mc = mapClassesCurried(maps, true) as (c: string) => string;

// types
import type { HTMLProps } from "react";

interface IMenuSection extends HTMLProps<HTMLDivElement> {
  variant?: string;
  title: string;
  items: Array<{
    name: string;
    description: string;
    price: number;
    allergens?: {
      vegan: boolean;
      gluten: boolean;
      halal: boolean;
      sesame: boolean;
      nuts: boolean;
      crustacean: boolean;
      eggs: boolean;
      fish: boolean;
      mustard: boolean;
      milk: boolean;
      peanuts: boolean;
      soya: boolean;
      shellfish: boolean;
    };
  }>;
  alignment?: "center" | "flex-start" | "flex-end";
}

export default function MenuSection({ className, variant, title, items = [], alignment = "center" }: IMenuSection) {
  const classList = useClassList({ defaultClass: "menu-section", className, variant, maps, string: true }) as string;

  return (
    <div className={classList} style={{ alignItems: alignment }}>
      <h2 className={mc("menu-section__title")}>{title}</h2>

      {items.map(({ name, description, price }) => (
        <div className={mc("menu-section__item")}>
          <div className={mc("menu-section__text")}>
            <h4>{name}</h4>
            <p>{description}</p>
          </div>

          <p className={mc("menu-section__price")}>{price}</p>
        </div>
      ))}
    </div>
  );
}
