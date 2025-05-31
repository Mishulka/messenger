export default interface Indexed {
  [key: string]: unknown;
}

export type User = {
  first_name: string;
  last_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};
