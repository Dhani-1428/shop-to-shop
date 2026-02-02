"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/components/language-provider'
import { useStore } from '@/components/store-provider'
import { Button } from '@/components/ui/button'
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react'

export default function WishlistPage() {
  const { t } = useLanguage()
  const { wishlist, removeFromWishlist, addToCart } = useStore()

  const handleMoveToCart = (productId: string) => {
    const product = wishlist.find((item) => item.id === productId)
    if (product) {
      addToCart(product)
      removeFromWishlist(productId)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 text-3xl font-bold text-secondary-foreground lg:text-4xl">
              {t('wishlist')}
            </h1>
            <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
              <Link href="/" className="hover:text-primary">
                {t('home')}
              </Link>
              <span>/</span>
              <span>{t('wishlist')}</span>
            </div>
          </div>
        </div>

        {/* Wishlist Content */}
        <div className="container mx-auto px-4 py-8">
          {wishlist.length === 0 ? (
            <div className="rounded-2xl border bg-card p-12 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-card-foreground">{t('emptyWishlist')}</h2>
              <p className="mb-6 text-muted-foreground">
                Save items you love by clicking the heart icon
              </p>
              <Link href="/shop">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('continueShopping')}
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              {/* Wishlist count */}
              <p className="mb-6 text-muted-foreground">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
              </p>

              {/* Wishlist Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {wishlist.map((item) => (
                  <div key={item.id} className="group overflow-hidden rounded-xl border bg-card">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      {item.isSale && item.discount && (
                        <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                          {item.discount}% {t('off')}
                        </span>
                      )}
                      {item.isNew && (
                        <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                          {t('new')}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      {item.brand && (
                        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {item.brand}
                        </p>
                      )}
                      <Link href={`/shop/${item.id}`}>
                        <h3 className="mb-2 line-clamp-2 font-medium text-card-foreground hover:text-primary">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="mb-4 flex items-center gap-2">
                        <span className="text-lg font-bold text-primary">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => handleMoveToCart(item.id)}
                          disabled={!item.inStock}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          {t('addToCart')}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">{t('remove')}</span>
                        </Button>
                      </div>

                      {!item.inStock && (
                        <p className="mt-2 text-center text-sm text-destructive">
                          {t('outOfStock')}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="mt-8 text-center">
                <Link href="/shop">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {t('continueShopping')}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
