import React from 'react'
import ReactionList from '../components/ReactionList'

const ReviewList = ({ reviews, handleReactionReview, type }) => {
  return (
    <>
      {reviews?.length > 0 && (
        <ul className="list-unstyled">
          {reviews.map((review, index) => (
            <>
              <ReviewContent review={review} key={`${index}-${type}-${review._id}`} />
              <ReactionList load={review} key={`${type}-${review._id}`} handleReaction={handleReactionReview} type={type}></ReactionList>
            </>
          ))}
        </ul>
      )}
    </>
  );
};

const ReviewContent = ({ review }) => {
  return (
    <div key={`${review._id}`}>
      <span className="text-muted">@{review?.user?.name}: </span>
      <span> {review.content} </span>
    </div>
  );
};

export default ReviewList;