 import { ReviewModel } from "../models/review.js";
 import { UserModel } from "../models/user.js";
 import { reviewValidator } from "../validators/review.js";

 export const reviewController = async (req, res) => {
   const { error, value } = reviewValidator.validate(req.body);

   if (error) {
     return res.status(422).json(error);
   }

   const result = await ReviewModel.create({
     ...value,
     userId: req.auth.id,
     productId: req.params.productId
   });

   const user = await UserModel.findById(req.auth.id);

   res.status(200).json({ message: result, username: user.userName });
 };