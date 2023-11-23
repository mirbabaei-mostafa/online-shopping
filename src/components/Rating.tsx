import React from 'react';
import { BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';

interface Props {
  rate: number;
}

const Rating = (props: Props) => {
  return (
    <div className="ratingBox">
      {Array(5)
        .fill(0)
        .map((_, i) => {
          if (i + 1 <= props.rate) {
            return <BsStarFill key={i} />;
          } else if (i < props.rate && i + 1 > props.rate) {
            return <BsStarHalf key={i} />;
          } else {
            return <BsStar key={i} />;
          }
        })}
    </div>
  );
};

export default Rating;
