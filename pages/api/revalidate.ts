import { NextApiRequest, NextApiResponse } from "next";
import awsGetCategories from "../../database/aws/dynamo-categories";
import SanitizeURL from "../../utils/sanitize-url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await res.revalidate("/");
    const categories = await awsGetCategories();
    for (const category of categories) {
      await res.revalidate(
        `/categorias/${category.SK}/${SanitizeURL(category.Description)}`
      );
    }
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
