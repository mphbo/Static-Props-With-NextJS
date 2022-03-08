import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

function LastSales() {
  const { data, error } = useSWR(
    "https://nextjs-course-ba476-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );
  const [sales, setSales] = useState();

  useEffect(() => {
    console.log(data);
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  //   useEffect(() => {
  //     setIsLoading(true);
  //     fetch("https://nextjs-course-ba476-default-rtdb.firebaseio.com/sales.json")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const transformedSales = [];
  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }
  //         setSales(transformedSales);
  //         setIsLoading(false);
  //       });
  //   }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  const saleItems = sales?.map((sale) => (
    <li>
      {sale.username} - ${sale.volume}
    </li>
  ));
  return <ul>{saleItems}</ul>;
}

export default LastSales;
