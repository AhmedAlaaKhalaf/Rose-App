import { TCategory } from "./category";
import { TOccasion } from "./occasion";
import { TProduct } from "./product";

type TDashboardProduct = Pick<TProduct, "id" | "title" | "rating" | "price" | "stock" | "ratings">;
type TDashboardCategory = Pick<TCategory, "_id" | "name" | "productsCount">;
type TDashboardOccasion = Pick<TOccasion, "_id" | "name" | "productsCount">;
