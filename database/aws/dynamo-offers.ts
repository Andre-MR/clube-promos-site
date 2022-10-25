import { AWSDynamoDB, Table } from "./dynamo-config";
import Offer from "../../models/offer";

const db = AWSDynamoDB();

let payload;

async function awsGetOffers(key: {
  PK: string;
  SK: string;
  limit: number;
}): Promise<Offer[]> {
  payload = {
    TableName: Table!,
    KeyConditionExpression: "PK = :PK and SK <= :SK",
    ExpressionAttributeValues: {
      ":PK": key.PK, // "OFFER#2022" etc
      ":SK": key.SK, //"20220101001" etc
    },
    ScanIndexForward: false,
    Limit: key.limit,
  };
  const result = await db.query(payload).promise();
  return result.Items as Offer[];
}

// change to update metrics info from customer actions
async function awsUpdateOffer(offer: Offer, imageFile: Buffer | null) {
  const today = new Date();
  // const todayYear = today.getFullYear().toString();
  // const todayMonth = (today.getMonth() + 1).toString().padStart(2, "0");
  // const todayDay = today.getDate().toString().padStart(2, "0");

  let params = {
    TableName: Table!,
    Key: { PK: offer.PK, SK: offer.SK },
    UpdateExpression: `SET Active = :active, Campaigns = :campaigns`,
    ExpressionAttributeValues: {
      ":active": offer.Active,
      ":campaigns": offer.Campaigns.length > 0 ? offer.Campaigns : [],
    },
    // ExpressionAttributeNames: {
    //   // dynamodb reserved words
    //   "#aliasStore": "Store",
    //   "#aliasUrl": "Url",
    // },
    ReturnValues: "UPDATED_NEW",
  };
  const result = await db.update(params).promise();
  return result;
}

export { awsGetOffers, awsUpdateOffer };
