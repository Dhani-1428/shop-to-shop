"use client"

import Link from 'next/link'
import { useLanguage } from './language-provider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  ShoppingCart,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
} from 'lucide-react'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Newsletter Section */}
      <div className="bg-primary">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-primary-foreground">{t('newsletter')}</h3>
              <p className="text-primary-foreground/80">{t('newsletterDesc')}</p>
            </div>
            <div className="flex w-full max-w-md gap-2">
              <Input
                type="email"
                placeholder={t('enterEmail')}
                className="h-12 border-0 bg-white text-foreground placeholder:text-muted-foreground"
              />
              <Button className="h-12 bg-secondary px-6 text-secondary-foreground hover:bg-secondary/90">
                <Send className="mr-2 h-4 w-4" />
                {t('subscribe')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                Shop<span className="text-primary">To</span>Shop
              </span>
            </Link>
            <p className="mb-4 text-secondary-foreground/70">
              Your one-stop destination for premium mobile phone parts, accessories, and repair tools.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary-foreground/10 transition-colors hover:bg-primary hover:text-primary-foreground"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-bold">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('shop')}
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('brands')}
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('accessories')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('aboutUs')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('termsConditions')}
                </Link>
              </li>
              <li>
                <Link href="#" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('faq')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-lg font-bold">{t('categories')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/brands?category=iphone" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('iphoneParts')}
                </Link>
              </li>
              <li>
                <Link href="/brands?category=samsung" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('samsungParts')}
                </Link>
              </li>
              <li>
                <Link href="/brands?category=xiaomi" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('xiaomiParts')}
                </Link>
              </li>
              <li>
                <Link href="/brands?category=huawei" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('huaweiParts')}
                </Link>
              </li>
              <li>
                <Link href="/brands?category=oneplus" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('onePlusParts')}
                </Link>
              </li>
              <li>
                <Link href="/brands?category=repair-tools" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  {t('repairTools')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-bold">{t('contactInfo')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-secondary-foreground/70">
                  123 Tech Street, Mobile City, MC 12345, Portugal
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="tel:+351123456789" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  (+351) 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="mailto:info@shoptoshop.com" className="text-secondary-foreground/70 transition-colors hover:text-primary">
                  info@shoptoshop.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-secondary-foreground/10 bg-primary">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col items-center justify-between gap-2 text-sm text-primary-foreground md:flex-row">
            <p>
              &copy; {new Date().getFullYear()} ShopToShop. {t('allRightsReserved')}.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="transition-colors hover:text-primary-foreground/80">
                {t('privacyPolicy')}
              </Link>
              <Link href="#" className="transition-colors hover:text-primary-foreground/80">
                {t('termsConditions')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
