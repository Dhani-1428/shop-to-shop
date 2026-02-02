"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/components/language-provider'
import { useStore } from '@/components/store-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus, X, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { t } = useLanguage()
  const { cart, removeFromCart, updateCartQuantity, cartTotal, clearCart } = useStore()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 text-3xl font-bold text-secondary-foreground lg:text-4xl">
              {t('cart')}
            </h1>
            <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
              <Link href="/" className="hover:text-primary">
                {t('home')}
              </Link>
              <span>/</span>
              <span>{t('cart')}</span>
            </div>
          </div>
        </div>

        {/* Cart Content */}
        <div className="container mx-auto px-4 py-8">
          {cart.length === 0 ? (
            <div className="rounded-2xl border bg-card p-12 text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-card-foreground">{t('emptyCart')}</h2>
              <p className="mb-6 text-muted-foreground">
                Start shopping to add items to your cart
              </p>
              <Link href="/shop">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t('continueShopping')}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border bg-card">
                  {/* Table Header - Desktop */}
                  <div className="hidden border-b px-6 py-4 md:grid md:grid-cols-12 md:gap-4">
                    <div className="col-span-5 text-sm font-semibold text-muted-foreground">
                      Product
                    </div>
                    <div className="col-span-2 text-center text-sm font-semibold text-muted-foreground">
                      {t('price')}
                    </div>
                    <div className="col-span-3 text-center text-sm font-semibold text-muted-foreground">
                      {t('quantity')}
                    </div>
                    <div className="col-span-2 text-right text-sm font-semibold text-muted-foreground">
                      {t('total')}
                    </div>
                  </div>

                  {/* Cart Items */}
                  <div className="divide-y">
                    {cart.map((item) => (
                      <div key={item.id} className="p-4 md:p-6">
                        <div className="grid items-center gap-4 md:grid-cols-12">
                          {/* Product Info */}
                          <div className="flex items-center gap-4 md:col-span-5">
                            <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-muted">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <Link
                                href={`/shop/${item.id}`}
                                className="font-medium text-card-foreground hover:text-primary"
                              >
                                {item.name}
                              </Link>
                              {item.brand && (
                                <p className="text-sm text-muted-foreground">{item.brand}</p>
                              )}
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-center md:col-span-2">
                            <span className="text-sm text-muted-foreground md:hidden">
                              {t('price')}:{' '}
                            </span>
                            <span className="font-medium text-card-foreground">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>

                          {/* Quantity */}
                          <div className="flex items-center justify-center gap-2 md:col-span-3">
                            <div className="flex items-center rounded-lg border">
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="flex h-9 w-9 items-center justify-center rounded-l-lg transition-colors hover:bg-muted"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateCartQuantity(item.id, parseInt(e.target.value) || 1)
                                }
                                className="h-9 w-14 rounded-none border-x border-y-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                min={1}
                              />
                              <button
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="flex h-9 w-9 items-center justify-center rounded-r-lg transition-colors hover:bg-muted"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Total & Remove */}
                          <div className="flex items-center justify-between md:col-span-2 md:justify-end md:gap-4">
                            <span className="font-semibold text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive hover:text-destructive-foreground"
                              aria-label="Remove item"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t p-4 md:p-6">
                    <Link href="/shop">
                      <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {t('continueShopping')}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-2xl border bg-card p-6">
                  <h2 className="mb-6 text-xl font-bold text-card-foreground">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t('subtotal')}</span>
                      <span className="font-medium text-card-foreground">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{t('shipping')}</span>
                      <span className="text-sm text-muted-foreground">{t('calculated')}</span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-card-foreground">{t('total')}</span>
                        <span className="text-xl font-bold text-primary">
                          ${cartTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    {t('checkout')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {/* Trust badges */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <span>{t('securePayment')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
