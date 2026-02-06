"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileCheck,
  LogOut,
  Settings,
  Menu,
  X,
  Shield,
  ChevronDown,
  Globe,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, labelKey: 'dashboard' },
  { href: '/admin/users', icon: Users, labelKey: 'usersInformation' },
  { href: '/admin/subscriptions', icon: CreditCard, labelKey: 'subscriptions' },
  { href: '/admin/payments', icon: FileCheck, labelKey: 'paymentApprovals' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { t, language, setLanguage, languages } = useLanguage()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentLanguage = languages.find((l) => l.code === language)

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden w-64 flex-col bg-black lg:flex">
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-white">
              <Shield className="h-5 w-5 text-black" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">System Administration</p>
              <p className="text-xs text-gray-400">Super Admin</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 px-4 py-4">
          <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            • SUPER ADMIN
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                )}
              >
                <Icon className="h-5 w-5" />
                {t(item.labelKey) || item.labelKey}
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-black p-0">
                <div className="flex h-16 items-center border-b border-gray-800 px-6">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-white">
                      <Shield className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">System Administration</p>
                      <p className="text-xs text-gray-400">Super Admin</p>
                    </div>
                  </div>
                </div>
                <nav className="space-y-1 px-4 py-4">
                  <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                    • SUPER ADMIN
                  </div>
                  {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-white text-black'
                            : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {t(item.labelKey) || item.labelKey}
                      </Link>
                    )
                  })}
                </nav>
              </SheetContent>
            </Sheet>

            {/* Logo - Desktop */}
            <div className="hidden items-center gap-2 lg:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-black">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-black">System Administration</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentLanguage?.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={language === lang.code ? 'bg-gray-100' : ''}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Info */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                S
              </div>
              <span className="hidden text-sm font-medium text-black sm:inline">Super Admin Client</span>
            </div>

            {/* Logout */}
            <Button variant="ghost" size="sm" className="gap-2">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">{t('logout')}</span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
