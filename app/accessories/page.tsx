"use client"

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sampleProducts } from '@/lib/sample-products'
import { Search, Grid3X3, LayoutList, X, Star, Zap } from 'lucide-react'
import Link from 'next/link'

export default function AccessoriesPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const accessories = useMemo(() => {
    let products = sampleProducts.filter((p) => p.category === 'accessories')

    // Search filter
    if (searchQuery) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        products.sort((a, b) => b.price - a.price)
        break
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        products.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          if (a.isSale && !b.isSale) return -1
          if (!a.isSale && b.isSale) return 1
          return 0
        })
    }

    return products
  }, [searchQuery, sortBy])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 text-3xl font-bold text-secondary-foreground lg:text-4xl">
              {t('accessories')}
            </h1>
            <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
              <Link href="/" className="hover:text-primary">
                {t('home')}
              </Link>
              <span>/</span>
              <span>{t('accessories')}</span>
            </div>
          </div>
        </div>

        {/* Featured Brands for Accessories */}
        <div className="border-b bg-muted py-8">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 sm:grid-cols-2 max-w-2xl mx-auto">
              <Link
                href="/brands?brand=50tek"
                className="group flex items-center gap-4 rounded-2xl bg-primary p-6 transition-transform hover:scale-[1.02]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-foreground/10">
                  <Zap className="h-7 w-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary-foreground">50TEK</h3>
                  <p className="text-sm text-primary-foreground/70">Premium Parts & Tools</p>
                </div>
              </Link>
              <Link
                href="/brands?brand=hoco"
                className="group flex items-center gap-4 rounded-2xl bg-secondary p-6 transition-transform hover:scale-[1.02]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-foreground/10">
                  <Star className="h-7 w-7 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-secondary-foreground">HOCO</h3>
                  <p className="text-sm text-secondary-foreground/70">Quality Accessories</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="container mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-4">
            {/* Search */}
            <div className="relative w-full md:w-auto md:flex-1 md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={t('sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="hidden items-center gap-1 rounded-lg border p-1 sm:flex">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded-md p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  aria-label="Grid view"
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-md p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  aria-label="List view"
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {accessories.length} accessories
          </p>

          {/* Products Grid */}
          {accessories.length === 0 ? (
            <div className="rounded-xl border bg-card p-12 text-center">
              <p className="text-lg text-muted-foreground">No accessories found</p>
              <Button
                variant="link"
                className="mt-2 text-primary"
                onClick={() => setSearchQuery('')}
              >
                Clear search
              </Button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                  : 'space-y-4'
              }
            >
              {accessories.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
