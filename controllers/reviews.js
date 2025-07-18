const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async(req, res)=>{
let listing = await Listing.findById(req.params.id);
let newReview = new Review(req.body.review);
newReview.author = req.user._id;
console.log(newReview);
listing.reviews.push(newReview);

await newReview.save();
await listing.save();
  // console.log(deletedListing);
req.flash("success", "New review created");
res.redirect(`/listings/${listing._id}`);

// console.log("new review saved");
// res.send("new review saved");
}


module.exports.destroyReview = async(req, res)=>{
  let {id, reviewId} = req.params;
  await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
    // console.log(deletedListing);
  req.flash("success", "Review deleted");
  res.redirect(`/listings/${id}`);
}