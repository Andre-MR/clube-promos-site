import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import HeaderMain from "../../components/header/header-main";
import MainFooter from "../../components/footer/main-footer";
import CardGrid from "../../components/card/card-main/card-grid";
import Category from "../../models/category";
import Offer from "../../models/offer";
import awsGetCategories from "../../database/aws/dynamo-categories";
import Store from "../../models/store";
import { useState } from "react";
import awsGetStores from "../../database/aws/dynamo-stores";
import { FilterParameters } from "../../models/filter-parameters";
import { awsGetOffers } from "../../database/aws/dynamo-offers";
import Card from "../../components/card/card-main/card";

type Props = {
  offers: Offer[];
  stores: Store[];
  categories: Category[];
  query: string;
};

const Home: NextPage<Props> = (props) => {
  const [offers, setOffers] = useState(props.offers);
  // const [offersFiltered, setOffersFiltered] = useState(props.offers);
  // const [categorySelected, setCategorySelected] = useState();
  // const [filterParameters, setFilterParameters] = useState(
  //   new FilterParameters()
  // );

  return (
    <div className="h-full">
      <Head>
        <title>Clube Promos Alpha</title>
        <meta name="description" content="Clube Promos Versão Alpha" />
        <link rel="icon" href="/favicon.png" />

        <meta
          property="og:image"
          content="https://i.pinimg.com/474x/f8/37/c7/f837c7636514518dbfcd20842967ec53.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://i.pinimg.com/474x/f8/37/c7/f837c7636514518dbfcd20842967ec53.jpg"
        />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="400" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="A shiny red apple with a bite taken out"
        />
      </Head>
      <main className="flex h-screen flex-col justify-start bg-gradient-to-b from-gray-300 to-gray-100">
        <HeaderMain categories={props.categories} />
        {props.offers.length > 0 ? (
          <div className="my-24 grid h-full w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {offers.map((offer) => (
              <Card key={offer.SK} offer={offer} stores={props.stores} />
            ))}
          </div>
        ) : (
          <div className="flex h-full">
            <p className="flex w-full items-center justify-center text-2xl font-semibold">
              {"Sem resultados :("}
            </p>
          </div>
        )}
        <MainFooter />
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context.params!;
  const today = new Date();
  const PK = `OFFER#${today.getFullYear()}`;
  const SK = `${today.getFullYear().toString()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;
  const offers = await awsGetOffers({
    PK: PK,
    SK: SK,
    limit: 100,
  });
  const filteredOffers = offers.filter((offer) => {
    return offer.Title.toLowerCase().includes(query!.toString().toLowerCase())
      ? offer
      : null;
  });
  const stores = await awsGetStores();
  const categories = await awsGetCategories();

  return {
    props: {
      offers: filteredOffers,
      stores: stores,
      categories: categories,
      query: query,
    },
  };
};
