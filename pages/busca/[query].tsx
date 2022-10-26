import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import HeaderMain from "../../components/header/header-main";
import MainFooter from "../../components/footer/main-footer";
import Category from "../../models/category";
import Offer from "../../models/offer";
import awsGetCategories from "../../database/aws/dynamo-categories";
import Store from "../../models/store";
import awsGetStores from "../../database/aws/dynamo-stores";
import { awsGetOffers } from "../../database/aws/dynamo-offers";
import Card from "../../components/card/card-main/card";

type Props = {
  offers: Offer[];
  stores: Store[];
  categories: Category[];
  query: string;
};

const Home: NextPage<Props> = (props) => {
  return (
    <div className="h-full">
      <Head>
        <title>Clube Promos Beta</title>
        <meta name="description" content="Clube Promos Versão Beta" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex h-full flex-col bg-gradient-to-b from-gray-300 to-gray-100">
        <HeaderMain categories={props.categories} />
        <div className="mt-24 mb-4 flex h-full w-full">
          <div className="w-full">
            <h1 className="mx-2 my-1 flex justify-start text-2xl font-semibold tracking-wide text-gray-800">
              {`Busca: ${props.query}`}
            </h1>
            {props.offers.length > 0 ? (
              <div className="mb-4 grid grid-cols-1 justify-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {props.offers.map((offer) => (
                  <Card key={offer.SK} offer={offer} stores={props.stores} />
                ))}
              </div>
            ) : (
              <div className="flex h-[600px] w-full items-center justify-center text-2xl font-semibold sm:h-[500px]">
                <p className="text-2xl font-semibold">
                  {"Sem ofertas por enquanto :("}
                </p>
              </div>
            )}
          </div>
        </div>
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
