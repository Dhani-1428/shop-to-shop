"use client"

import Link from 'next/link'
import { useLanguage } from './language-provider'
import { Badge } from '@/components/ui/badge'
import { Zap, Star } from 'lucide-react'

const specialBrands = [
  {
    name: '50TEK',
    description: 'Premium Quality Parts',
    icon: Zap,
    color: 'bg-primary',
  },
  {
    name: 'HOCO',
    description: 'Trusted Accessories',
    icon: Star,
    color: 'bg-secondary',
  },
]

const categories = [
  { key: 'iphoneParts', slug: 'iphone' },
  { key: 'samsungParts', slug: 'samsung' },
  { key: 'xiaomiParts', slug: 'xiaomi' },
  { key: 'oppoRenoParts', slug: 'oppo-reno' },
  { key: 'realmeParts', slug: 'realme' },
  { key: 'huaweiParts', slug: 'huawei' },
  { key: 'onePlusParts', slug: 'oneplus' },
  { key: 'motorolaParts', slug: 'motorola' },
  { key: 'alcatelParts', slug: 'alcatel' },
  { key: 'tclParts', slug: 'tcl' },
  { key: 'zteParts', slug: 'zte' },
  { key: 'vivoParts', slug: 'vivo' },
  { key: 'nokiaParts', slug: 'nokia' },
  { key: 'googlePixelParts', slug: 'google-pixel' },
  { key: 'tablets', slug: 'tablets' },
  { key: 'lgParts', slug: 'lg' },
  { key: 'otherParts', slug: 'other' },
  { key: 'repairTools', slug: 'repair-tools' },
]

interface BrandsSidebarProps {
  className?: string
  showCategories?: boolean
}

export function BrandsSidebar({ className = '', showCategories = true }: BrandsSidebarProps) {
  const { t } = useLanguage()

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Special Brands */}
      <div className="rounded-xl bg-sidebar p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-sidebar-foreground">
          <Star className="h-5 w-5 text-sidebar-primary" />
          {t('specialBrands')}
        </h3>
        <div className="space-y-3">
          {specialBrands.map((brand) => (
            <Link
              key={brand.name}
              href={`/brands?brand=${brand.name.toLowerCase()}`}
              className="group flex items-center gap-3 rounded-lg bg-sidebar-accent p-4 transition-all hover:bg-sidebar-primary"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${brand.color} transition-transform group-hover:scale-105`}
              >
                <brand.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sidebar-foreground group-hover:text-white">{brand.name}</p>
                <p className="text-sm text-sidebar-foreground/70 group-hover:text-white/70">
                  {brand.description}
                </p>
              </div>
              <Badge variant="secondary" className="bg-sidebar-primary/20 text-sidebar-primary group-hover:bg-white/20 group-hover:text-white">
                {t('new')}
              </Badge>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      {showCategories && (
        <div className="rounded-xl border bg-card p-6">
          <h3 className="mb-4 text-lg font-bold text-card-foreground">{t('categories')}</h3>
          <nav>
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/brands?category=${category.slug}`}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <span>{t(category.key)}</span>
                    <span className="text-xs text-muted-foreground/60">
                      {Math.floor(Math.random() * 50) + 10}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </aside>
  )
}
