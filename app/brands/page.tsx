"use client"

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BrandsSidebar } from '@/components/brands-sidebar'
import { ProductCard } from '@/components/product-card'
import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { sampleProducts, categories } from '@/lib/sample-products'
import { Grid3X3, LayoutList, X, Zap, Star } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import Link from 'next/link'

function BrandsContent() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const brandParam = searchParams.get('brand')

  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProducts = useMemo(() => {
    let products = [...sampleProducts]

    // Category filter
    if (categoryParam) {
      products = products.filter((p) => p.category === categoryParam)
    }

    // Brand filter
    if (brandParam) {
      products = products.filter(
        (p) => p.brand?.toLowerCase() === brandParam.toLowerCase()
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
        // featured
        products.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          if (a.isSale && !b.isSale) return -1
          if (!a.isSale && b.isSale) return 1
          return 0
        })
    }

    return products
  }, [categoryParam, brandParam, sortBy])

  const currentCategory = categories.find((c) => c.slug === categoryParam)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 text-3xl font-bold text-secondary-foreground lg:text-4xl">
              {brandParam
                ? brandParam.toUpperCase()
                : currentCategory
                  ? t(currentCategory.key)
                  : t('brands')}
            </h1>
            <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
              <a href="/" className="hover:text-primary">
                {t('home')}
              </a>
              <span>/</span>
              <a href="/brands" className="hover:text-primary">
                {t('brands')}
              </a>
              {(categoryParam || brandParam) && (
                <>
                  <span>/</span>
                  <span>
                    {brandParam?.toUpperCase() ||
                      (currentCategory ? t(currentCategory.key) : '')}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Featured Brands Section */}
        {!categoryParam && !brandParam && (
          <div className="border-b bg-muted py-8">
            <div className="container mx-auto px-4">
              <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
                {t('specialBrands')}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 max-w-2xl mx-auto">
                <Link
                  href="/brands?brand=50tek"
                  className="group flex items-center gap-4 rounded-2xl bg-primary p-6 transition-transform hover:scale-[1.02]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-foreground/10">
                    <Zap className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-foreground">50TEK</h3>
                    <p className="text-primary-foreground/70">Premium Quality Parts</p>
                    <Badge className="mt-2 bg-primary-foreground/20 text-primary-foreground">
                      {sampleProducts.filter((p) => p.brand === '50TEK').length} Products
                    </Badge>
                  </div>
                </Link>
                <Link
                  href="/brands?brand=hoco"
                  className="group flex items-center gap-4 rounded-2xl bg-secondary p-6 transition-transform hover:scale-[1.02]"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary-foreground/10">
                    <Star className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-foreground">HOCO</h3>
                    <p className="text-secondary-foreground/70">Trusted Accessories</p>
                    <Badge variant="secondary" className="mt-2">
                      {sampleProducts.filter((p) => p.brand === 'HOCO').length} Products
                    </Badge>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        {!brandParam && !categoryParam && (
          <div className="border-b bg-background py-12">
            <div className="container mx-auto px-4">
              <h2 className="mb-8 text-center text-2xl font-bold text-foreground">
                {t('topCategories')}
              </h2>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/brands?category=${category.slug}`}
                    className="group rounded-xl border bg-card p-4 text-center transition-all hover:border-primary hover:shadow-md"
                  >
                    <p className="font-medium text-card-foreground group-hover:text-primary text-sm">
                      {t(category.key)}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{category.count} items</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Products Section */}
        <div className="container mx-auto px-4 py-8">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2">
              {(categoryParam || brandParam) && (
                <Link href="/brands">
                  <Button variant="outline" size="sm">
                    <X className="mr-1 h-3 w-3" />
                    Clear Filters
                  </Button>
                </Link>
              )}
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Mobile Filter */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden bg-transparent">
                    {t('categories')}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto p-0">
                  <SheetTitle className="sr-only">Categories</SheetTitle>
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
              {filteredProducts.length === 0 ? (
                <div className="rounded-xl border bg-card p-12 text-center">
                  <p className="text-lg text-muted-foreground">No products found in this category</p>
                  <Link href="/brands">
                    <Button variant="link" className="mt-2 text-primary">
                      View all brands
                    </Button>
                  </Link>
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

export default function BrandsPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <BrandsContent />
    </Suspense>
  )
}
