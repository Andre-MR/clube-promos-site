import { useState, useEffect } from "react";
import Offer from "../../../models/offer";
import CardLogos from "../card-logos/card-logos";
import CardHeader from "../card-header/card-header";
import CardContent from "../card-content/card-content";
import CardFooter from "../card-footer/card-footer";
import Store from "../../../models/store";

type Props = {
  key: string;
  offer: Offer;
  stores: Store[];
};

export default function Card(props: Props) {
  const [viewed, setViewed] = useState(false);
  const [views, setViews] = useState(props.offer.Views - 1);

  useEffect(() => {
    setViews(views + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewed]);

  let card: HTMLDivElement | null = null;
  const setCard = (element: HTMLDivElement) => {
    card = element;
  };
  function isInViewport(e: HTMLDivElement) {
    if (e) {
      const rect = e.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) + 120 &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }
    return false;
  }

  if (typeof window !== "undefined" && !viewed) {
    window.addEventListener(
      "scroll",
      function () {
        if (isInViewport(card!)) {
          setViewed(true);
        }
      },
      {
        passive: true,
      }
    );
  }

  return (
    <div className="relative grid" ref={setCard}>
      <div className="m-3 flex flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-gray-400 hover:shadow-lg hover:shadow-white">
        <CardLogos offer={props.offer} stores={props.stores} />
        <CardHeader offer={props.offer} />
        <CardContent offer={props.offer} />
        {/* <CardFooter {...{ offer, views }} /> */}
        <CardFooter offer={props.offer} />
      </div>
    </div>
  );
}
