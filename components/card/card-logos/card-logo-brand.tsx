import Image from "next/image";
import favicon from "../../../public/favicon.png";

export default function CardLogoBrand() {
  return (
    <div
      className="absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full text-center 
        text-xs font-bold tracking-wide opacity-90"
    >
      <Image src={favicon} fill priority={true} alt="mage-mock" sizes="100vw" />
    </div>
  );
}
