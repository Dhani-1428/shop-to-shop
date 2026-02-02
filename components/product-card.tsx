"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from './language-provider'
import { useStore, type Product } from './store-provider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Heart, ShoppingCart, Eye } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useLanguage()
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useStore()

  const inWishlist = isInWishlist(product.id)
  const inCart = isInCart(product.id)

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">{t('new')}</Badge>
          )}
          {product.isSale && product.discount && (
            <Badge className="bg-secondary text-secondary-foreground">
              {product.discount}% {t('off')}
            </Badge>
          )}
        </div>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="h-10 w-10 rounded-full bg-background text-foreground hover:bg-primary hover:text-primary-foreground"
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-5 w-5 ${inWishlist ? 'fill-primary text-primary' : ''}`} />
            <span className="sr-only">{t('addToWishlist')}</span>
          </Button>
          <Link href={`/shop/${product.id}`}>
            <Button
              size="icon"
              variant="secondary"
              className="h-10 w-10 rounded-full bg-background text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <Eye className="h-5 w-5" />
              <span className="sr-only">{t('viewDetails')}</span>
            </Button>
          </Link>
          <Button
            size="icon"
            variant="secondary"
            className={`h-10 w-10 rounded-full ${
              inCart
                ? 'bg-primary text-primary-foreground'
                : 'bg-background text-foreground hover:bg-primary hover:text-primary-foreground'
            }`}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">{t('addToCart')}</span>
          </Button>
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Badge variant="destructive" className="text-sm">
              {t('outOfStock')}
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {product.brand && (
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>
        )}
        <Link href={`/shop/${product.id}`}>
          <h3 className="mb-2 line-clamp-2 font-medium text-card-foreground transition-colors hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart Button - Mobile Visible */}
      <div className="border-t p-4 lg:hidden">
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => addToCart(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {t('addToCart')}
        </Button>
      </div>
    </div>
  )
}
