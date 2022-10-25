import { GetStaticProps, NextPage } from "next";
import Offer from "../../../models/offer";
import Card from "../../../components/card/card-main/card";
import MainFooter from "../../../components/footer/main-footer";
import HeaderMain from "../../../components/header/header-main";
import Head from "next/head";
import Category from "../../../models/category";
import awsGetCategories from "../../../database/aws/dynamo-categories";
import { awsGetOffers } from "../../../database/aws/dynamo-offers";
import awsGetStores from "../../../database/aws/dynamo-stores";
import Store from "../../../models/store";

type Props = {
  offers: Offer[];
  categories: Category[];
  stores: Store[];
};

const DescriptionPage: NextPage<Props> = (props) => {
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
            {props.offers.map((offer) => (
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

export default DescriptionPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { SK, description } = context.params!;

  const today = new Date();
  const offerPK = `OFFER#${today.getFullYear()}`;
  const offerSK = `${today.getFullYear().toString()}${(today.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${today.getDate().toString().padStart(2, "0")}`;
  const offers = await awsGetOffers({
    PK: offerPK,
    SK: offerSK,
    limit: 100,
  });

  const categories = await awsGetCategories();
  const stores = await awsGetStores();

  let targetCategory = "";

  const filteredOffers = offers.filter((offer) => {
    if (offer.Categories[0] == description) {
      return offer;
    }
  });
  for (const category of categories) {
    if (category.Description == description) {
      targetCategory = category.Description;
      break;
    }
  }

  return {
    props: {
      offers: filteredOffers,
      categories: categories,
      stores: stores,
    },
    revalidate: 60,
  };
};

export async function getStaticPaths() {
  const categories = await awsGetCategories();
  return {
    // paths: []
    paths: categories.map((category) => ({
      params: { SK: category.SK, description: category.Description },
    })),
    fallback: "blocking",
  };
}
