import { imageLoader } from "next-image-loader/image-loader";

// write self-define a custom loader
// (resolverProps: { src: string; width: number; quality?: number }) => string
imageLoader.loader = ({ src, width }) => {
    console.log("Image Loader");
    const filename = src.substring(src.lastIndexOf('/')+1);
    return `https://cdn.mattscoinage.com/mattscoinage/products/${filename}?w=${width}`;
}
