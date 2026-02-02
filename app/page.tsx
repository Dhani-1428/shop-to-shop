"use client"

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BrandsSidebar } from '@/components/brands-sidebar'
import { ProductCard } from '@/components/product-card'
import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { sampleProducts, getFeaturedProducts, getNewArrivals, getSaleProducts } from '@/lib/sample-products'
import Link from 'next/link'
import {
  ArrowRight,
  Truck,
  RotateCcw,
  Headphones,
  CreditCard,
  Shield,
  Zap,
  Star,
  Award,
  Clock,
} from 'lucide-react'

const services = [
  { icon: RotateCcw, titleKey: 'freeReturn', descKey: 'freeReturnDesc' },
  { icon: Truck, titleKey: 'freeShipping', descKey: 'freeShippingDesc' },
  { icon: Headphones, titleKey: 'support247', descKey: 'support247Desc' },
  { icon: CreditCard, titleKey: 'giftCard', descKey: 'giftCardDesc' },
  { icon: Shield, titleKey: 'securePayment', descKey: 'securePaymentDesc' },
  { icon: Zap, titleKey: 'onlineService', descKey: 'onlineServiceDesc' },
]

const features = [
  { icon: Award, titleKey: 'qualityProducts', descKey: 'qualityProductsDesc' },
  { icon: Truck, titleKey: 'fastDelivery', descKey: 'fastDeliveryDesc' },
  { icon: Headphones, titleKey: 'expertSupport', descKey: 'expertSupportDesc' },
  { icon: Star, titleKey: 'competitivePrices', descKey: 'competitivePricesDesc' },
]

export default function HomePage() {
  const { t } = useLanguage()
  const featuredProducts = getFeaturedProducts()
  const newArrivals = getNewArrivals()
  const saleProducts = getSaleProducts()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-secondary">
          <div className="container mx-auto px-4 py-12 lg:py-20">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                  {t('new')} Collection 2026
                </span>
                <h1 className="mb-6 text-4xl font-bold leading-tight text-secondary-foreground lg:text-5xl xl:text-6xl text-balance">
                  {t('heroTitle')}
                </h1>
                <p className="mb-8 text-lg text-secondary-foreground/70 lg:text-xl text-pretty">
                  {t('heroSubtitle')}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/shop">
                    <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                      {t('shopNow')}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/brands">
                    <Button size="lg" variant="outline" className="border-secondary-foreground/20 text-secondary-foreground hover:bg-secondary-foreground/10 bg-transparent">
                      {t('exploreBrands')}
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative">
                  <div className="absolute -inset-4 rounded-3xl bg-primary/20 blur-3xl" />
                  <div className="relative grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="aspect-square overflow-hidden rounded-2xl bg-muted">
                        <div className="flex h-full items-center justify-center bg-card p-6">
                          <div className="text-center">
                            <p className="text-3xl font-bold text-primary">50TEK</p>
                            <p className="text-sm text-muted-foreground">Premium Parts</p>
                          </div>
                        </div>
                      </div>
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-primary">
                        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                          <p className="text-4xl font-bold text-primary-foreground">40%</p>
                          <p className="text-primary-foreground/80">{t('off')}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4 pt-8">
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-card">
                        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                          <p className="text-3xl font-bold text-foreground">HOCO</p>
                          <p className="text-sm text-muted-foreground">Accessories</p>
                        </div>
                      </div>
                      <div className="aspect-square overflow-hidden rounded-2xl bg-accent">
                        <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                          <Clock className="mb-2 h-8 w-8 text-primary" />
                          <p className="text-sm font-medium text-foreground">24/7</p>
                          <p className="text-xs text-muted-foreground">{t('support247')}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Bar */}
        <section className="border-y bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 divide-x divide-border md:grid-cols-3 lg:grid-cols-6">
              {services.map((service, index) => (
                <div key={index} className="flex items-center gap-3 p-4 lg:p-6">
                  <service.icon className="h-8 w-8 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{t(service.titleKey)}</h3>
                    <p className="text-xs text-muted-foreground">{t(service.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar */}
            <div className="order-2 lg:order-1 lg:col-span-1">
              <BrandsSidebar />
            </div>

            {/* Products Section */}
            <div className="order-1 space-y-12 lg:order-2 lg:col-span-3">
              {/* Featured Products */}
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">{t('featuredProducts')}</h2>
                  <Link href="/shop">
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                      {t('viewAll')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {featuredProducts.slice(0, 6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>

              {/* Promotional Banners */}
              <section className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center justify-between rounded-2xl bg-primary p-6 lg:p-8">
                  <div>
                    <p className="mb-2 text-primary-foreground/80">{t('sale')}</p>
                    <h3 className="mb-1 text-xl font-bold text-primary-foreground lg:text-2xl">50TEK Parts</h3>
                    <p className="text-4xl font-bold text-primary-foreground lg:text-5xl">
                      40% <span className="text-2xl">{t('off')}</span>
                    </p>
                  </div>
                  <div className="hidden rounded-xl bg-primary-foreground/10 p-4 sm:block">
                    <Zap className="h-16 w-16 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-secondary p-6 lg:p-8">
                  <div>
                    <p className="mb-2 text-secondary-foreground/80">{t('new')}</p>
                    <h3 className="mb-1 text-xl font-bold text-secondary-foreground lg:text-2xl">HOCO Accessories</h3>
                    <p className="text-4xl font-bold text-secondary-foreground lg:text-5xl">
                      25% <span className="text-2xl">{t('off')}</span>
                    </p>
                  </div>
                  <div className="hidden rounded-xl bg-secondary-foreground/10 p-4 sm:block">
                    <Star className="h-16 w-16 text-secondary-foreground" />
                  </div>
                </div>
              </section>

              {/* New Arrivals */}
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">{t('newArrivals')}</h2>
                  <Link href="/shop?filter=new">
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                      {t('viewAll')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {newArrivals.slice(0, 6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>

              {/* Best Sellers / Sale Products */}
              <section>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">{t('bestSellers')}</h2>
                  <Link href="/shop?filter=sale">
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                      {t('viewAll')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {saleProducts.slice(0, 6).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <section className="bg-muted py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-foreground">{t('whyChooseUs')}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-background p-6 text-center transition-shadow hover:shadow-lg"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{t(feature.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(feature.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
