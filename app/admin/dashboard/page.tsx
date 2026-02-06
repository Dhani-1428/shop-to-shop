"use client"

import { useLanguage } from '@/components/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, CreditCard, FileCheck, TrendingUp, DollarSign, Settings } from 'lucide-react'
import Link from 'next/link'

// Mock data - replace with actual API calls
const stats = {
  totalUsers: 1248,
  activeSubscriptions: 342,
  pendingPayments: 18,
  totalRevenue: 125430,
  newUsersThisMonth: 89,
  subscriptionRevenue: 45620,
}

const recentUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', joined: '2024-01-15', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', joined: '2024-01-14', status: 'Active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', joined: '2024-01-13', status: 'Inactive' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', joined: '2024-01-12', status: 'Active' },
]

const recentSubscriptions = [
  { id: 1, user: 'John Doe', plan: 'Premium', amount: 29.99, status: 'Active', date: '2024-01-15' },
  { id: 2, user: 'Jane Smith', plan: 'Basic', amount: 9.99, status: 'Active', date: '2024-01-14' },
  { id: 3, user: 'Bob Johnson', plan: 'Premium', amount: 29.99, status: 'Cancelled', date: '2024-01-13' },
]

const pendingPayments = [
  { id: 1, user: 'Alice Williams', amount: 29.99, plan: 'Premium', date: '2024-01-16' },
  { id: 2, user: 'Charlie Brown', amount: 9.99, plan: 'Basic', date: '2024-01-16' },
]

export default function AdminDashboard() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-black">Welcome back, Super Admin!</h1>
        <p className="mt-2 text-gray-600">Here's what's happening with your platform today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <FileCheck className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingPayments}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-black" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest registered users</CardDescription>
              </div>
              <Link href="/admin/users">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Joined: {user.joined}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      user.status === 'Active'
                        ? 'bg-black text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Subscriptions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Subscriptions</CardTitle>
                <CardDescription>Latest subscription activity</CardDescription>
              </div>
              <Link href="/admin/subscriptions">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSubscriptions.map((sub) => (
                <div key={sub.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{sub.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {sub.plan} - ${sub.amount}/month
                    </p>
                    <p className="text-xs text-muted-foreground">Date: {sub.date}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      sub.status === 'Active'
                        ? 'bg-black text-white'
                        : 'bg-gray-300 text-gray-800'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Payments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Pending Payment Approvals</CardTitle>
              <CardDescription>Payments awaiting your approval</CardDescription>
            </div>
            <Link href="/admin/payments">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingPayments.length > 0 ? (
              pendingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">{payment.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {payment.plan} - ${payment.amount}
                    </p>
                    <p className="text-xs text-muted-foreground">Date: {payment.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100">
                      Reject
                    </Button>
                    <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                      Approve
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No pending payments</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Account Credentials Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Account Credentials</CardTitle>
              <CardDescription>These details are used on your receipts and invoices</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Edit Credentials
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Company Name</label>
                <p className="mt-1 text-sm">Your Company Name</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="mt-1 text-sm">admin@example.com</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone</label>
                <p className="mt-1 text-sm">+1 (555) 123-4567</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <p className="mt-1 text-sm">123 Main St, City, State 12345</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
