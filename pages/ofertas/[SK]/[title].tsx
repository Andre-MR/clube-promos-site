import { GetStaticProps, NextPage } from "next";
import Offer from "../../../models/offer";
import Card from "../../../components/card/card-main/card";
import Error404 from "../../error/404";
import MainFooter from "../../../components/footer/main-footer";
import HeaderMain from "../../../components/header/header-main";
import Head from "next/head";
import Category from "../../../models/category";
import awsGetCategories from "../../../database/aws/dynamo-categories";
import { awsGetOffers } from "../../../database/aws/dynamo-offers";
import awsGetStores from "../../../database/aws/dynamo-stores";
import Store from "../../../models/store";

type Props = {
  offer: Offer;
  categories: Category[];
  stores: Store[];
};

const OfferPage: NextPage<Props> = (props) => {
  return (
    <div className="h-screen">
      <Head>
        <title>Clube Promos Alpha</title>
        <meta name="description" content="Clube Promos Versão Alpha" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="flex h-full flex-col">
        <HeaderMain categories={props.categories} />
        {props.offer ? (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-gray-300 to-gray-100">
            <div className="item-center flex w-full flex-col justify-center sm:w-1/2 lg:w-1/4">
              <Card offer={props.offer} key={""} stores={props.stores} />
            </div>
          </div>
        ) : (
          <Error404 />
        )}
        <MainFooter />
      </div>
    </div>
  );
};

export default OfferPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { SK, title } = context.params!;
  const offers = await awsGetOffers({
    PK: "OFFER#2022",
    SK: SK as string,
    limit: 1,
  });
  const categories = await awsGetCategories();
  const stores = await awsGetStores();

  return {
    props: {
      offer: offers[0],
      categories: categories,
      stores: stores,
    },
  };
};

export async function getStaticPaths() {
  const offers = await awsGetOffers({
    PK: "OFFER#2022",
    SK: "20221001001",
    limit: 1,
  });
  return {
    paths: [{ params: { SK: offers[0].SK, title: offers[0].Title } }],
    fallback: "blocking",
  };
}
