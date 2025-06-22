export interface RandomUserResponse {
  results: RandomUser[];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

export interface RandomUser {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  birthDate: string;
  picture: string;
  gender: string;
  age: number;
  fullAddress: string;
}

export interface UserDetailViewModel {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  birthDate: string;
  bio: string;
  avatar: string;
  contacts: number;
  profileViews: number;
  cats: CatData[];
}

export interface CatData {
  name: string;
  image: string;
}

export interface UserServiceState {
  users: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  totalUsers: number;
}
