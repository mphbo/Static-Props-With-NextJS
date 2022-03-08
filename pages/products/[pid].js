import path from "path";
import fs from "fs/promises";

function ProductDetailPage({ loadedProduct }) {
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);
};

export async function getStaticProps(context) {
  const { params } = context;
  const data = await getData();
  const productId = params.pid;

  const product = data.products.find((product) => product.id === productId);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);

  const params = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: params,
    fallback: true,
  };
}

export default ProductDetailPage;
