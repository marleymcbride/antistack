import React from 'react'
import { Card, CardContent } from './ui/card'

export default function ProofSection() {
  const stats = [
    { number: '100+', label: 'Clients Transformed' },
    { number: '30', label: 'Days to Results' },
    { number: '3X', label: 'Average Energy Increase' }
  ]

  return (
    <section className="py-16 bg-zinc-100">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Proven Results</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-md">
              <CardContent className="pt-6 text-center">
                <p className="text-5xl font-bold text-red-700 mb-2">{stat.number}</p>
                <p className="text-zinc-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
