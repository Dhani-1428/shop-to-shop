"use client"

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useLanguage } from '@/components/language-provider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <div className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-2 text-3xl font-bold text-secondary-foreground lg:text-4xl">
              {t('contact')}
            </h1>
            <div className="flex items-center gap-2 text-sm text-secondary-foreground/70">
              <Link href="/" className="hover:text-primary">
                {t('home')}
              </Link>
              <span>/</span>
              <span>{t('contact')}</span>
            </div>
          </div>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-6xl">
            {/* Intro */}
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">{t('getInTouch')}</h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Have a question or need assistance? We&apos;re here to help! Fill out the form below
                or use our contact information to reach us.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4 rounded-xl border bg-card p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-card-foreground">{t('address')}</h3>
                      <p className="text-sm text-muted-foreground">
                        123 Tech Street
                        <br />
                        Mobile City, MC 12345
                        <br />
                        Portugal
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 rounded-xl border bg-card p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-card-foreground">{t('phone')}</h3>
                      <p className="text-sm text-muted-foreground">
                        <a href="tel:+351123456789" className="hover:text-primary">
                          (+351) 123 456 789
                        </a>
                        <br />
                        <a href="tel:+351987654321" className="hover:text-primary">
                          (+351) 987 654 321
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4 rounded-xl border bg-card p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-card-foreground">{t('email')}</h3>
                      <p className="text-sm text-muted-foreground">
                        <a href="mailto:info@shoptoshop.com" className="hover:text-primary">
                          info@shoptoshop.com
                        </a>
                        <br />
                        <a href="mailto:support@shoptoshop.com" className="hover:text-primary">
                          support@shoptoshop.com
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4 rounded-xl border bg-card p-6">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-card-foreground">Business Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Mon - Fri: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border bg-card p-6 lg:p-8">
                  <h3 className="mb-6 text-xl font-bold text-card-foreground">{t('sendMessage')}</h3>

                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h4 className="mb-2 text-xl font-semibold text-card-foreground">
                        Message Sent!
                      </h4>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We&apos;ll get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="name">{t('yourName')}</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{t('yourEmail')}</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t('yourPhone')}</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+351 123 456 789"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">{t('subject')}</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="How can we help?"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{t('message')}</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Write your message here..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {t('sendMessage')}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-12 overflow-hidden rounded-2xl border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
