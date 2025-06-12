export default interface Indexed {
  [key: string]: unknown;
}

export type User = {
  id: number;
  avatar: string;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};
