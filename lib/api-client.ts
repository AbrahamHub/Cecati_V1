import { ApiResponse, SearchResponse } from './types/api';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Unknown error' }));
    throw new ApiError(response.status, error.error || 'Unknown error');
  }
  return response.json();
}

export async function searchNews(query: string): Promise<SearchResponse> {
  try {
    if (!query || query.length < 2) {
      return { data: [] };
    }

    const response = await fetch(`/api/news/search?q=${encodeURIComponent(query)}`);
    return handleResponse<SearchResponse>(response);
  } catch (error) {
    console.error('Search error:', error);
    if (error instanceof ApiError) {
      return { error: error.message };
    }
    return { error: 'Error al buscar noticias' };
  }
}