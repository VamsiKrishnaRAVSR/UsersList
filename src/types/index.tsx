export interface User {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  address: string;
  city: string;
  pincode: number;
  avatar: string;
  // [key: string]: string | number;
}

// export type UserKeys = "id" | "first_name" | "date_of_birth" | "city";

export interface UserDetails {
  data: User[];
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  listLength: number;
  lastIndex: number;
  firstIndex: number;
}
