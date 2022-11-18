import Image from "next/legacy/image";
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
          // priority={true}
          alt="Offer Image"
          // width={200}
          // height={180}
          layout="fill"
          objectFit="contain"
          blurDataURL={offer.ImageUrl}
          placeholder="empty"
          loading="eager"
        />
      </a>
    </div>
  );
}
