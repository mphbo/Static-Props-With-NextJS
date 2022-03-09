import React, { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";

function LastSales(props) {
  const { data, error } = useSWR(
    "https://nextjs-course-ba476-default-rtdb.firebaseio.com/sales.json",
    (url) => fetch(url).then((res) => res.json())
  );
  const [sales, setSales] = useState(props.sales);

  useEffect(() => {
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
  //   }, []);

  if (error) {
    return <p>Failed to load.</p>;
  }

  if (!data || !sales) {
    return <p>Loading...</p>;
  }

  const saleItems = sales?.map((sale, index) => (
    <li key={index}>
      {sale.username} - ${sale.volume}
    </li>
  ));
  return <ul>{saleItems}</ul>;
}

export async function getStaticProps() {
  return fetch(
    "https://nextjs-course-ba476-default-rtdb.firebaseio.com/sales.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return {
        props: {
          sales: transformedSales,
        },
      };
    });
}

export default LastSales;
