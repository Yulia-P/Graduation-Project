import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDiscounts } from "../../redux/slices/discounts";
import Grid from "@mui/material/Grid";

export const AllDiscounts = () => {
  const dispatch = useDispatch();

  const { discounts } = useSelector((state) => state.discounts);
  console.log(discounts);
  let mappedDiscounts = <></>;
  if (discounts.status == "loaded") {
    mappedDiscounts = discounts.items.map((item, i) => (
      <>
        <div>
            <h1>Скидка {item.Discount}</h1>
            <h2> Необходимо баллов {item.PointD}</h2>
        </div>
        
      </>
    ));
  }

  React.useEffect(() => {
    dispatch(fetchAllDiscounts());
  }, [dispatch]);

  return <>{mappedDiscounts}</>;
};