import { News } from '@/lib/models/news';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  details?: unknown;
}

export interface SearchResponse extends ApiResponse<News[]> {
  data?: Array<{
    _id: string;
    title: string;
    excerpt: string;
    image: string;
    slug: string;
    date: string;
  }>;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  pagination?: {
    total: number;
    pages: number;
    currentPage: number;
    perPage: number;
  };
}