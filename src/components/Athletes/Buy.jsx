import React from 'react';

export const Buy = (clickEvent) => (
    <Button onClick={clickEvent}
    color="danger"
    id="4"
    size="sm"
    tag="label"
   >
    <input
       className="d-none"
      name="options"
      type="radio"
      onClick={() => alert(`Sold`)}
    />
   <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
      Sell?
   </span>
  </Button>
);