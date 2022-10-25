import { Dispatch, SetStateAction, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getOffersBySK } from "../../../database/queries/offers-queries";
import { FilterParameters } from "../../../models/filter-parameters";
import Offer from "../../../models/offer";
import Store from "../../../models/store";
import Card from "./card";

type Props = {
  offers: Offer[];
  setOffers: Dispatch<SetStateAction<Offer[]>>;
  offersFiltered: Offer[];
  setOffersFiltered: Dispatch<SetStateAction<Offer[]>>;
  filterParameters: FilterParameters;
  stores: Store[];
  category: string | null;
};

export default function CardGrid(props: Props) {
  const [moreOffers, setMoreOffers] = useState(true);
  const getMoreOffers = async () => {
    const lastOfferSK = props.offers[props.offers.length - 1].SK;
    const lastDigit = Number.parseInt(
      lastOfferSK.charAt(lastOfferSK.length - 1)
    );
    const targetSK = lastOfferSK.replace(/.$/, (lastDigit - 1).toString());
    const newOffers = await getOffersBySK(
      props.offers[props.offers.length - 1].PK,
      targetSK,
      5
    );
    props.setOffers([...props.offers, ...newOffers]);
    if (props.offers.length > 50 || newOffers.length <= 0) {
      setMoreOffers(false);
    }
  };
  return (
    <div className="">
      <h1 className="mx-2 my-1 flex justify-start text-2xl font-semibold tracking-wide text-gray-800">
        {props.category ? props.category : "Ofertas em destaque"}
      </h1>
      <InfiniteScroll
        className="mb-4 grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        dataLength={props.offers.length}
        next={getMoreOffers}
        hasMore={moreOffers}
        loader={
          <div className="place-self-center self-center justify-self-center text-center">
            Carregando...
          </div>
        }
      >
        {props.offers.map((offer) => (
          <Card key={offer.SK} offer={offer} stores={props.stores} />
        ))}
      </InfiniteScroll>
    </div>
  );
}
