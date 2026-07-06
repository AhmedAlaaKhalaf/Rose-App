import { userAddressSchema } from "../schemas/user-address.schema";
import type { TAddressInput } from "./addresses";

export type TUserAddress = {
  id: string;
  title: string;
  isPrimary: boolean;
  city: string;
  street: string;
  phone: string;
  latitude: number;
  longitude: number;
};

export type TUserAddressDetails = TAddressInput;

export type TUserAddressFormFields = z.infer<ReturnType<typeof userAddressSchema>>;
