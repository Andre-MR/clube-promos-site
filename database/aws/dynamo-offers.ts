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
      ":PK": key.PK,
      ":SK": key.SK,
    },
    ScanIndexForward: false,
    Limit: key.limit,
  };
  const result = await db.query(payload).promise();
  return result.Items as Offer[];
}

async function awsUpdateOffer(offer: Offer, imageFile: Buffer | null) {
  const today = new Date();
  let params = {
    TableName: Table!,
    Key: { PK: offer.PK, SK: offer.SK },
    UpdateExpression: `SET Active = :active, Campaigns = :campaigns`,
    ExpressionAttributeValues: {
      ":active": offer.Active,
      ":campaigns": offer.Campaigns.length > 0 ? offer.Campaigns : [],
    },
    ReturnValues: "UPDATED_NEW",
  };
  const result = await db.update(params).promise();
  return result;
}

export { awsGetOffers, awsUpdateOffer };
