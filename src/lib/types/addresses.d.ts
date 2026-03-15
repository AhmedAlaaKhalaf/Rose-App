export type TAddress = {
  street: string;
  phone: string;
  city: string;
  lat: string;
  long: string;
  username: string;
  _id: string;
};

export type TAddressResponse = {
  message: string;
  addresses: TAddress[];
};
