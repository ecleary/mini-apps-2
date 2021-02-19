import React from 'react';

export const Event = ({ eventData }) => {
  const {
    date,
    description,
    lang,
    category1,
    category2,
    granularity,
  } = eventData;
  return (
    <div>
      <div>{date}</div>
      <div>{description}</div>
      <div>{lang}</div>
      <div>{category1}</div>
      <div>{category2}</div>
      <div>{granularity}</div>
    </div>
  );
};
