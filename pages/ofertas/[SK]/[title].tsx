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
  const offer = await awsGetOffers({
    PK: "OFFER#2022",
    SK: SK as string,
    limit: 1,
  });
  const categories = await awsGetCategories();
  const stores = await awsGetStores();

  return {
    props: {
      offer: offer[0],
      categories: categories,
      stores: stores,
    },
    revalidate: 60,
  };
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { SK: "20221001001", title: "teste" } }],
    // paths: [],
    fallback: "blocking",
  };
}
