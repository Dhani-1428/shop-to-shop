"use client"

import { useState, useMemo } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BrandsSidebar } from '@/components/brands-sidebar'
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
import { Search, SlidersHorizontal, Grid3X3, LayoutList, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'

export default function ShopPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500])
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let products = [...sampleProducts]

    // Search filter
    if (searchQuery) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Price filter
    products = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

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
      case 'new':
        products = products.filter((p) => p.isNew)
        break
      case 'sale':
        products = products.filter((p) => p.isSale)
        break
      default:
        // featured - prioritize new and sale items
        products.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          if (a.isSale && !b.isSale) return -1
          if (!a.isSale && b.isSale) return 1
          return 0
        })
    }

    return products
  }, [searchQuery, sortBy, priceRange])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 text-3xl font-bold text-secondary-foreground lg:text-4xl">
              {t('shop')}
            </h1>
            <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
              <a href="/" className="hover:text-primary">
                {t('home')}
              </a>
              <span>/</span>
              <span>{t('shop')}</span>
            </div>
          </div>
        </div>

        {/* Shop Content */}
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
              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    {t('filterBy')}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto p-0">
                  <SheetTitle className="sr-only">Filters</SheetTitle>
                  <div className="p-4">
                    <BrandsSidebar />
                  </div>
                </SheetContent>
              </Sheet>

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
                  <SelectItem value="new">{t('new')}</SelectItem>
                  <SelectItem value="sale">{t('sale')}</SelectItem>
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

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
              <BrandsSidebar />
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Results count */}
              <p className="mb-4 text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </p>

              {filteredProducts.length === 0 ? (
                <div className="rounded-xl border bg-card p-12 text-center">
                  <p className="text-lg text-muted-foreground">No products found</p>
                  <Button
                    variant="link"
                    className="mt-2 text-primary"
                    onClick={() => {
                      setSearchQuery('')
                      setSortBy('featured')
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid gap-6 sm:grid-cols-2 xl:grid-cols-3'
                      : 'space-y-4'
                  }
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
