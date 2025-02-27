import mongooseConnect from "@/lib/mongoose";
import { Product } from "@/models/Product";

const handle = async (req, res) => {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await Product.find({ _id: ids }));
};

export default handle;
