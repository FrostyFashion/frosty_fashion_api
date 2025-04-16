import { ReviewModel } from "../models/review.js";
import { UserModel } from "../models/user.js";
import { reviewValidator } from "../validators/review.js";

export const createReview = async (req, res) => {
  const { error, value } = reviewValidator.validate(req.body);

  if (error) {
    return res.status(422).json(error);
  }

 const user = await UserModel.findById(req.auth.id);

  const result = await ReviewModel.create({
    ...value,
    username: user.userName,
    userId: req.auth.id,
    productId: req.params.productId,
  });

  

  res.status(200).json({ message: result});
};

export const getReviews = async (req, res, next) => {
  try {
    const id = req.params.productId;

    // const reviews = await ReviewModel.findById(productId);
    const reviews = await ReviewModel.find({productId: id});

    if(reviews)
    {
        return res.status(200).json(reviews);
    }

    res.status(404).json('Product review not found');

  } catch (error) {
    next(error);
  }
};
