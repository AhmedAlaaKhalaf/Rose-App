export type TAddress = {
  id: string;
  title: string;
  isPrimary: boolean;
  city: string;
  street: string;
  phone: string;
  latitude: number;
  longitude: number;
};

export type TAddressInput = {
  title: string;
  city: string;
  street: string;
  phone: string;
  latitude: number;
  longitude: number;
  isPrimary?: boolean;
};

export type TAddressResponse = {
  addresses: TAddress[];
};
