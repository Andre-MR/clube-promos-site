import Image from "next/image";
import Offer from "../../../models/offer";

export default function CardImage({ offer }: { offer: Offer }) {
  return (
    <div className="absolute z-10 mt-1 flex h-full w-full justify-center">
      <a
        className="relative flex h-[90%] w-[90%] flex-col items-center justify-between"
        target={"_blank"}
        rel="noreferrer"
        href={offer ? offer.Url : ""}
      >
        <Image
          src={offer.ImageUrl}
          className="object-contain"
          fill
          sizes="100vw"
          alt="Offer Image"
          blurDataURL={offer.ImageUrl}
          placeholder="empty"
        />
      </a>
    </div>
  );
}
