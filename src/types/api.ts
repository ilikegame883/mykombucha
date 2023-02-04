import { Types } from "mongoose";

export interface BreweryData {
  _id: Types.ObjectId | string;
  name: string;
  slug: string;
  city: string;
  country: string;
  description: string;
  image: string;
  favorite_list: Types.ObjectId[] | UserData[] | string[];
  favorite_count: number;
  kombucha_type: string[];
  brewery_type: string;
  search_key: string;
  urls: {
    website?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  kombuchas?: KombuchaData[];
  reviews?: ReviewData[];
  createdAt: string;
  updatedAt: string;
}

export interface KombuchaData {
  _id: Types.ObjectId | string;
  name: string;
  brewery?: BreweryData | Types.ObjectId | string;
  brewery_name: string;
  brewery_slug: string;
  description: string;
  image: string;
  kombucha_type: string;
  search_key: string;
  flavor: string[];
  ABV: number;
  served_in: string[];
  reviews: string[];
  review_count: number;
  rating_avg: number;
  rating_sum: number;
  updatedAt: string;
  createdAt?: string;
  data?: KombuchaData | Types.ObjectId | string;
}

export interface ReviewData {
  _id: Types.ObjectId | string;
  rating: number;
  comment: string;
  served_in: string;
  review_author: RecentReviewAuthor;
  username: string;
  kombucha: KombuchaData;
  likes: string[];
  like_count: number;
  updatedAt: string;
  createdAt: string;
}

export interface RecentReview {
  _id: Types.ObjectId | string;
  rating: number;
  comment: string;
  served_in: string;
  review_author: RecentReviewAuthor;
  username: string;
  kombucha: KombuchaData;
  likes: Types.ObjectId[] | string[];
  like_count: number;
  updatedAt: string;
  createdAt: string;
}

export interface RecentReviewAuthor {
  _id: Types.ObjectId | string;
  username: string;
  profile: { image: string };
  data?: UserData;
}

export interface UserData {
  _id: Types.ObjectId | string;
  username: string;
  name: string;
  email: string;
  password: string;
  profile: {
    image: string;
    image_id?: string;
    city?: string;
    country?: string;
    bio?: string;
  };
  reviews: ReviewData[] | Types.ObjectId[] | string[];
  review_total: number;
  rating_avg: number;
  wish_list: UserWishListData[] | Types.ObjectId[] | string[];
  createdAt: string;
  updatedAt: string;
  data?: UserData | Types.ObjectId | string;
}

export interface UserWishListData {
  kombucha_id: KombuchaData | Types.ObjectId | string;
  add_date: string;
}

export interface TopRatersData {
  _id: Types.ObjectId | string;
  review_total: number;
  user: {
    _id: Types.ObjectId | string;
    username: string;
    profile: { image: string };
  };
}

export interface Wish_List {}
