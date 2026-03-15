import { TOccasion } from "./occasion";

export type TAllOccasions = {
  message: string;
  metadata: {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
  occasions: TOccasion[];
};
