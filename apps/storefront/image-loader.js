// write self-define a custom loader
// (resolverProps: { src: string; width: number; quality?: number }) => string
export default function myImageLoader({ src, width, quality }) {
  const filename = src.substring(src.lastIndexOf("/") + 1);
  return `https://cdn.mattscoinage.com/mattscoinage/products/${filename}?w=${width}`;
}
