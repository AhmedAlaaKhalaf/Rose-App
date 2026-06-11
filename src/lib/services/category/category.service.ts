export async function categoryService() {
  const res = await fetch(`${process.env.API}/categories`);
}
