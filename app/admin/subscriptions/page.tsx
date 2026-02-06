"use client"

import { useLanguage } from '@/components/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, MoreVertical, Eye, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Mock data - replace with actual API calls
const subscriptions = [
  {
    id: 1,
    user: 'John Doe',
    email: 'john@example.com',
    plan: 'Premium',
    amount: 29.99,
    status: 'Active',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    paymentMethod: 'Credit Card',
  },
  {
    id: 2,
    user: 'Jane Smith',
    email: 'jane@example.com',
    plan: 'Basic',
    amount: 9.99,
    status: 'Active',
    startDate: '2024-01-14',
    endDate: '2024-02-14',
    paymentMethod: 'PayPal',
  },
  {
    id: 3,
    user: 'Bob Johnson',
    email: 'bob@example.com',
    plan: 'Premium',
    amount: 29.99,
    status: 'Cancelled',
    startDate: '2024-01-01',
    endDate: '2024-01-13',
    paymentMethod: 'Credit Card',
  },
  {
    id: 4,
    user: 'Alice Williams',
    email: 'alice@example.com',
    plan: 'Premium',
    amount: 29.99,
    status: 'Active',
    startDate: '2024-01-12',
    endDate: '2024-02-12',
    paymentMethod: 'Credit Card',
  },
  {
    id: 5,
    user: 'Charlie Brown',
    email: 'charlie@example.com',
    plan: 'Basic',
    amount: 9.99,
    status: 'Active',
    startDate: '2024-01-11',
    endDate: '2024-02-11',
    paymentMethod: 'Bank Transfer',
  },
]

export default function SubscriptionsPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Subscriptions</h1>
        <p className="mt-2 text-gray-600">Manage all user subscriptions on the platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptions.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {subscriptions.filter((s) => s.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${subscriptions.filter((s) => s.status === 'Active').reduce((sum, s) => sum + s.amount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">From active subscriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">
              {subscriptions.filter((s) => s.status === 'Cancelled').length}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search subscriptions by user, email, or plan..."
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Subscriptions</CardTitle>
          <CardDescription>A list of all subscriptions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{sub.user}</div>
                      <div className="text-sm text-muted-foreground">{sub.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{sub.plan}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">${sub.amount}</TableCell>
                  <TableCell>
                    <Badge
                      variant={sub.status === 'Active' ? 'default' : 'secondary'}
                      className={
                        sub.status === 'Active'
                          ? 'bg-black text-white hover:bg-gray-800'
                          : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                      }
                    >
                      {sub.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{sub.startDate}</TableCell>
                  <TableCell>{sub.endDate}</TableCell>
                  <TableCell>{sub.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-700">
                          <X className="mr-2 h-4 w-4" />
                          Cancel Subscription
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
