import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import HeaderMain from "../components/header/header-main";
import MainFooter from "../components/footer/main-footer";
import CardGrid from "../components/card/card-main/card-grid";
import Category from "../models/category";
import Offer from "../models/offer";
import awsGetCategories from "../database/aws/dynamo-categories";
import Store from "../models/store";
import { useState } from "react";
import awsGetStores from "../database/aws/dynamo-stores";
import { FilterParameters } from "../models/filter-parameters";
import { awsGetOffers } from "../database/aws/dynamo-offers";

type Props = {
  offers: Offer[];
  stores: Store[];
  categories: Category[];
};

const Home: NextPage<Props> = (props) => {
  const [offers, setOffers] = useState(props.offers);
  const [offersFiltered, setOffersFiltered] = useState(props.offers);
  const [filterParameters, setFilterParameters] = useState(
    new FilterParameters()
  );

  return (
    <div className="h-full">
      <Head>
        <title>{process.env.NEXT_PUBLIC_MAIN_TITLE}</title>
        <meta name="description" content={process.env.NEXT_PUBLIC_MAIN_TITLE} />
        <link rel="icon" href="/favicon.png" as="image" />
      </Head>

      <main className="flex h-full flex-col bg-gradient-to-b from-gray-300 to-gray-100">
        <HeaderMain categories={props.categories} />
        <div className="mt-24 mb-4 flex h-full">
          <CardGrid
            offers={offers}
            setOffers={setOffers}
            offersFiltered={offersFiltered}
            setOffersFiltered={setOffersFiltered}
            filterParameters={filterParameters}
            stores={props.stores}
            category={null}
          />
        </div>
        <MainFooter />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const today = new Date();
  const PK = `OFFER#${today.getFullYear()}`;
  const SK = `${today.getFullYear().toString()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${(today.getDate() + 1).toString().padStart(2, "0")}`;
  const offers = await awsGetOffers({
    PK: PK,
    SK: SK,
    limit: 8,
  });

  const stores = await awsGetStores();
  const categories = await awsGetCategories();

  return {
    props: {
      offers: offers,
      stores: stores,
      categories: categories,
    },
  };
};
