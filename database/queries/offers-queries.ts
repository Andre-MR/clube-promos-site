import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import Offer from "../../models/offer";

enum QueryPeriods {
  Days1 = "Days1",
  Days7 = "Days7",
  Days30 = "Days30",
  Years1 = "Years1",
}

async function saveOffer(
  offer: Offer,
  imageFile: Buffer | null
): Promise<Offer> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/api/queries/offers`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ offer: offer, imageFile: imageFile }), // body data type must match "Content-Type" header
    }
  );
  return await response.json();
}

async function fetchOffers(
  PK: string,
  SK: string,
  limit: number
): Promise<Offer[]> {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_MAIN_URL
    }/api/queries/offers?${new URLSearchParams({
      PK: PK,
      SK: SK,
      limit: limit.toString(),
    })}`,
    {
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      cache: "default", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(offer), // body data type must match "Content-Type" header
    }
  );
  return (await response.json()) as Offer[];
}

async function getOffers(
  queryPeriod: QueryPeriods,
  limitDate: string,
  limit: number
) {
  switch (queryPeriod) {
    case QueryPeriods.Days1:
      return await getOffersDays(1, limitDate, limit);
    case QueryPeriods.Days30:
      return await getOffersDays(30, limitDate, limit);
    case QueryPeriods.Years1:
      return await getOffersDays(365, limitDate, limit);
    default:
      return await getOffersDays(7, limitDate, limit);
    //
  }
}

async function getOffersBySK(PK: string, SK: string, limit: number) {
  return await fetchOffers(PK, SK, limit);
}

async function getOffersDays(days: number, maxDate: string, limit: number) {
  const today = new Date();
  const targetDate = new Date(maxDate);
  if ((today.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24) > days) {
    return [];
  }
  if (targetDate.getFullYear() < today.getFullYear()) {
    const PK1 = `OFFER#${targetDate.getFullYear()}`;
    const SK1 = `${targetDate.getFullYear()}${(targetDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${targetDate.getDate().toString().padStart(2, "0")}`;
    const result1 = await fetchOffers(PK1, SK1, limit);
    const PK2 = `OFFER#${today.getFullYear()}`;
    const SK2 = `${today.getFullYear()}`;
    const result2 = await fetchOffers(PK2, SK2, limit);
    return [...result1, ...result2];
  } else {
    const PK = `OFFER#${targetDate.getFullYear()}`;
    const SK = `${targetDate.getFullYear()}${(targetDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}${targetDate.getDate().toString().padStart(2, "0")}`;
    return await fetchOffers(PK, SK, limit);
  }
}

// async function getOffersDays(days: number, maxDate: string, limit: number) {
//   const highDate = new Date(maxDate);
//   const lowDate = new Date(highDate);
//   lowDate.setDate(lowDate.getDate() - days);
//   if (lowDate.getFullYear() < highDate.getFullYear()) {
//     const PK1 = `OFFER#${lowDate.getFullYear()}`;
//     const SK1 = `${lowDate.getFullYear()}${(lowDate.getMonth() + 1)
//       .toString()
//       .padStart(2, "0")}${lowDate.getDate().toString().padStart(2, "0")}`;
//     const result1 = await fetchOffers(PK1, SK1, limit);
//     const PK2 = `OFFER#${highDate.getFullYear()}`;
//     const SK2 = `${highDate.getFullYear()}`;
//     const result2 = await fetchOffers(PK2, SK2, limit);
//     return [...result1, ...result2];
//   } else {
//     const PK = `OFFER#${lowDate.getFullYear()}`;
//     const SK = `${lowDate.getFullYear()}${(lowDate.getMonth() + 1)
//       .toString()
//       .padStart(2, "0")}${lowDate.getDate().toString().padStart(2, "0")}`;
//     return await fetchOffers(PK, SK, limit);
//   }
// }

export { saveOffer, getOffers, getOffersBySK, QueryPeriods };
