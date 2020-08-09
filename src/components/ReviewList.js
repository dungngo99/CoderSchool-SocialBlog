import React from 'react'
import ReactionList from '../components/ReactionList'

const ReviewList = ({ reviews, handleReactionReview, type }) => {
  return (
    <>
      {reviews?.length > 0 && (
        <ul className="list-unstyled">
          {reviews.map((review) => (
            <>
              <ReviewContent review={review} key={review._id} />
              <ReactionList blog={review} key={`reaction-${review._id}`} handleReaction={handleReactionReview} type={type}></ReactionList>
            </>
          ))}
        </ul>
      )}
    </>
  );
};

const ReviewContent = ({ review }) => {
  return (
    <div>
      <span className="text-muted">@{review?.user?.name}: </span>
      <span> {review.content} </span>
    </div>
  );
};

export default ReviewList;