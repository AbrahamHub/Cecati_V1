"use client"

import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/hooks/use-debounce';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useToast } from "@/hooks/use-toast";
import { searchNews } from '@/lib/api-client';
import type { SearchResponse } from '@/lib/types/api';

export default function SearchNews() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<NonNullable<SearchResponse['data']>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useDebounce(searchTerm, 300);
  const { toast } = useToast();

  const handleSearch = useCallback(async () => {
    if (debouncedSearch.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await searchNews(debouncedSearch);
      if (response.error) {
        throw new Error(response.error);
      }
      setResults(response.data || []);
    } catch (error) {
      toast({
        title: "Error de búsqueda",
        description: error instanceof Error ? error.message : "Error al buscar noticias",
        variant: "destructive",
      });
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, toast]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          type="search"
          placeholder="Buscar noticias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          aria-label="Buscar noticias"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin h-4 w-4" />
        )}
      </div>

      {searchTerm.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-background border rounded-md shadow-lg">
          {results.length > 0 ? (
            <div className="max-h-[60vh] overflow-y-auto">
              {results.map((result) => (
                <Link key={result._id} href={`/blog/${result.slug}`}>
                  <Card className="border-0 rounded-none hover:bg-accent transition-colors">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-4">
                        {result.image && (
                          <div className="relative w-[50px] h-[50px] flex-shrink-0">
                            <Image
                              src={result.image}
                              alt={result.title}
                              fill
                              className="rounded object-cover"
                              sizes="50px"
                            />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-sm truncate">{result.title}</CardTitle>
                          {result.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {result.excerpt}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4">
              <p className="text-center text-muted-foreground">
                No se encontraron resultados
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}