import { SVGProps, useMemo } from "react";

interface IIcon extends SVGProps<SVGSVGElement> {
  type: "close";
}

export default function Icon({ type, ...props }: IIcon) {
  const icon = useMemo(() => {
    switch (type) {
      case "close":
        return (
          <svg {...props} viewBox="0 96 960 960">
            <path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
          </svg>
        );
      default:
        return null;
    }
  }, [props, type]);

  return icon;
}
