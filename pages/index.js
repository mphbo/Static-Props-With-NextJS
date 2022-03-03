import path from "path";
import fs from "fs/promises";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home({ products }) {
  const productList = products.map((product) => (
    <li key={product.id}>
      <Link href={`/${product.id}`}>{product.title}</Link>
    </li>
  ));

  return <ul>{productList}</ul>;
}

export async function getStaticProps(context) {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
