import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";

export const dynamic = 'force-dynamic';


export async function getProducts() {
  try {
    const response = await fetch('/api/products', {
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (e) {
    console.error('Fetch error:', e);
    return [];
  }
}



// export async function getProducts() {
//   const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
//   try {
//     const response = await fetch(baseURL + '/api/products', { cache: 'no-store' });
//     if (!response.ok) throw new Error('Failed to fetch products');
//     return await response.json();
//   } catch (e) {
//     console.error('Fetch error:', e);
//     return [];
//   }
// }




export default async function Home(props) {

  const products = await getProducts();

  console.log(products);

  let planner = null
  let stickers = [];

  for (let product of products) {
    if (product.name === "Medieval Dragon Month Planner") {
      planner = product;
      continue
    } 
    stickers.push(product);
  }

  return (
    < >
      <ImageBanner/>
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>
    </>
  );
}