"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useLanguage, languages, type Language } from './language-provider'
import { useStore } from './store-provider'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  Phone,
  ChevronDown,
  Globe,
  User,
  X,
} from 'lucide-react'

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/shop', key: 'shop' },
  { href: '/accessories', key: 'accessories' },
  { href: '/brands', key: 'brands' },
  { href: '/contact', key: 'contact' },
]

export function Header() {
  const { language, setLanguage, t } = useLanguage()
  const { cartCount, wishlist } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  const currentLanguage = languages.find((l) => l.code === language)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar */}
      <div className="hidden border-b border-border bg-secondary lg:block">
        <div className="container mx-auto flex h-10 items-center justify-between px-4">
          <div className="flex items-center gap-4 text-sm">
            <Link href="#" className="text-secondary-foreground/80 transition-colors hover:text-primary">
              {t('help')}
            </Link>
            <span className="text-secondary-foreground/40">|</span>
            <Link href="#" className="text-secondary-foreground/80 transition-colors hover:text-primary">
              {t('support')}
            </Link>
            <span className="text-secondary-foreground/40">|</span>
            <Link href="/contact" className="text-secondary-foreground/80 transition-colors hover:text-primary">
              {t('contact')}
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-secondary-foreground/80">
            <Phone className="h-4 w-4" />
            <span>{t('callUs')}:</span>
            <a href="tel:+351123456789" className="transition-colors hover:text-primary">
              (+351) 123 456 789
            </a>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-2 text-secondary-foreground/80 hover:text-primary">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm">{currentLanguage?.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as Language)}
                    className={language === lang.code ? 'bg-accent' : ''}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 gap-2 text-secondary-foreground/80 hover:text-primary">
                  <User className="h-4 w-4" />
                  <span className="text-sm">{t('myDashboard')}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>{t('login')}</DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wishlist" className="w-full">
                    {t('wishlist')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/cart" className="w-full">
                    {t('cart')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>{t('notifications')}</DropdownMenuItem>
                <DropdownMenuItem>{t('accountSettings')}</DropdownMenuItem>
                <DropdownMenuItem>{t('myAccount')}</DropdownMenuItem>
                <DropdownMenuItem>{t('logout')}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Shop<span className="text-primary">To</span>Shop
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden flex-1 max-w-2xl lg:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t('search')}
                  className="h-12 rounded-full border-2 border-muted pl-6 pr-14 transition-colors focus:border-primary"
                />
                <Button
                  size="sm"
                  className="absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90"
                >
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSearchOpen(!searchOpen)}
              >
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>

              {/* Wishlist */}
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {wishlist.length}
                    </span>
                  )}
                  <span className="sr-only">{t('wishlist')}</span>
                </Button>
              </Link>

              {/* Cart */}
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                  <span className="sr-only">{t('cart')}</span>
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] bg-background p-0">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex h-full flex-col">
                    {/* Mobile Logo */}
                    <div className="flex items-center gap-2 border-b p-4">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <ShoppingCart className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <span className="text-lg font-bold">
                        Shop<span className="text-primary">To</span>Shop
                      </span>
                    </div>

                    {/* Mobile Nav */}
                    <nav className="flex-1 overflow-y-auto p-4">
                      <ul className="space-y-1">
                        {navLinks.map((link) => (
                          <li key={link.key}>
                            <Link
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block rounded-lg px-4 py-3 text-foreground transition-colors hover:bg-accent"
                            >
                              {t(link.key)}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href="/wishlist"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg px-4 py-3 text-foreground transition-colors hover:bg-accent"
                          >
                            {t('wishlist')}
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/cart"
                            onClick={() => setMobileMenuOpen(false)}
                            className="block rounded-lg px-4 py-3 text-foreground transition-colors hover:bg-accent"
                          >
                            {t('cart')}
                          </Link>
                        </li>
                      </ul>

                      {/* Mobile Language Selector */}
                      <div className="mt-6 border-t pt-6">
                        <p className="mb-2 px-4 text-sm font-medium text-muted-foreground">
                          {t('language') || 'Language'}
                        </p>
                        <div className="space-y-1">
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => {
                                setLanguage(lang.code as Language)
                              }}
                              className={`w-full rounded-lg px-4 py-2 text-left transition-colors hover:bg-accent ${
                                language === lang.code ? 'bg-accent text-primary' : ''
                              }`}
                            >
                              {lang.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search - Expandable */}
          {searchOpen && (
            <div className="mt-4 lg:hidden">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t('search')}
                  className="h-12 rounded-full border-2 border-muted pl-6 pr-14"
                  autoFocus
                />
                <Button
                  size="sm"
                  className="absolute right-1.5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-primary"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="hidden bg-primary lg:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-14 gap-2 rounded-none px-6 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Menu className="h-5 w-5" />
                  <span className="font-medium">{t('allCategories')}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/brands?category=iphone">{t('iphoneParts')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/brands?category=samsung">{t('samsungParts')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/brands?category=xiaomi">{t('xiaomiParts')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/brands?category=huawei">{t('huaweiParts')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/accessories">{t('accessories')}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/brands?category=repair-tools">{t('repairTools')}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Main Navigation */}
            <ul className="flex items-center">
              {navLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="flex h-14 items-center px-5 font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/wishlist"
                  className="flex h-14 items-center px-5 font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  {t('wishlist')}
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="flex h-14 items-center px-5 font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  {t('cart')}
                </Link>
              </li>
            </ul>

            {/* Phone Number */}
            <a
              href="tel:+351123456789"
              className="flex h-10 items-center gap-2 rounded-full bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <Phone className="h-4 w-4" />
              (+351) 123 456 789
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
