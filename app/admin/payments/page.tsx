"use client"

import { useState } from 'react'
import { useLanguage } from '@/components/language-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Filter, Check, X, MoreVertical, Eye } from 'lucide-react'
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
const payments = [
  {
    id: 1,
    user: 'Alice Williams',
    email: 'alice@example.com',
    amount: 29.99,
    plan: 'Premium',
    paymentMethod: 'Credit Card',
    status: 'Pending',
    date: '2024-01-16',
    transactionId: 'TXN-001',
  },
  {
    id: 2,
    user: 'Charlie Brown',
    email: 'charlie@example.com',
    amount: 9.99,
    plan: 'Basic',
    paymentMethod: 'PayPal',
    status: 'Pending',
    date: '2024-01-16',
    transactionId: 'TXN-002',
  },
  {
    id: 3,
    user: 'David Lee',
    email: 'david@example.com',
    amount: 29.99,
    plan: 'Premium',
    paymentMethod: 'Bank Transfer',
    status: 'Approved',
    date: '2024-01-15',
    transactionId: 'TXN-003',
  },
  {
    id: 4,
    user: 'Emma Wilson',
    email: 'emma@example.com',
    amount: 9.99,
    plan: 'Basic',
    paymentMethod: 'Credit Card',
    status: 'Rejected',
    date: '2024-01-14',
    transactionId: 'TXN-004',
  },
]

export default function PaymentsPage() {
  const { t } = useLanguage()
  const [paymentsList, setPaymentsList] = useState(payments)

  const handleApprove = (id: number) => {
    setPaymentsList(
      paymentsList.map((payment) =>
        payment.id === id ? { ...payment, status: 'Approved' } : payment
      )
    )
  }

  const handleReject = (id: number) => {
    setPaymentsList(
      paymentsList.map((payment) =>
        payment.id === id ? { ...payment, status: 'Rejected' } : payment
      )
    )
  }

  const pendingPayments = paymentsList.filter((p) => p.status === 'Pending')
  const approvedPayments = paymentsList.filter((p) => p.status === 'Approved')
  const rejectedPayments = paymentsList.filter((p) => p.status === 'Rejected')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-black">Payment Approvals</h1>
        <p className="mt-2 text-gray-600">Review and approve payment transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{pendingPayments.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">{approvedPayments.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-600">{rejectedPayments.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${paymentsList.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">All transactions</p>
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
                placeholder="Search payments by user, email, or transaction ID..."
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

      {/* Pending Payments */}
      {pendingPayments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
            <CardDescription>Payments requiring your approval</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.user}</div>
                        <div className="text-sm text-muted-foreground">{payment.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{payment.plan}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">${payment.amount}</TableCell>
                    <TableCell>{payment.paymentMethod}</TableCell>
                    <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-400 text-gray-700 hover:bg-gray-100"
                          onClick={() => handleReject(payment.id)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          className="bg-black text-white hover:bg-gray-800"
                          onClick={() => handleApprove(payment.id)}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* All Payments */}
      <Card>
        <CardHeader>
          <CardTitle>All Payments</CardTitle>
          <CardDescription>Complete payment history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentsList.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payment.user}</div>
                      <div className="text-sm text-muted-foreground">{payment.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{payment.plan}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">${payment.amount}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === 'Approved'
                          ? 'default'
                          : payment.status === 'Rejected'
                          ? 'secondary'
                          : 'secondary'
                      }
                      className={
                        payment.status === 'Approved'
                          ? 'bg-black text-white hover:bg-gray-800'
                          : payment.status === 'Rejected'
                          ? 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                  <TableCell>{payment.date}</TableCell>
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
