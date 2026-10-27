'use client'
import { useState } from 'react'
import { ArrowDownLeft, ArrowUpRight, Plus, Trash2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { fmtDate, inr, type ExpenseCategory } from '@/lib/farm-data'
import { useFarm } from '../store'
import { Card, ScreenHeader, SectionTitle, Segmented } from '../../ui'

const CATEGORIES: ExpenseCategory[] = ['Seeds', 'Fertilizer', 'Pesticide', 'Labour', 'Irrigation', 'Machinery', 'Other']

export function LedgerScreen() {
  const { ledger, addEntry, removeEntry, activeCrop } = useFarm()
  const [adding, setAdding] = useState(false)
  const [kind, setKind] = useState<'expense' | 'income'>('expense')
  const [category, setCategory] = useState<ExpenseCategory>('Labour')
  const [label, setLabel] = useState('')
  const [amount, setAmount] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount) return
    addEntry({ kind, category, label: label || category, amount: Number(amount), date: new Date().toISOString() })
    setAdding(false); setLabel(''); setAmount('')
  }

  return (
    <div className="pb-8">
      <ScreenHeader title="Profit & loss" subtitle={`${activeCrop.name} season ledger`} action={<button onClick={() => setAdding(true)} className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground"><Plus className="size-5" /></button>} />
      <div className="flex flex-col gap-4 px-5">
        <div>
          <SectionTitle>Transactions</SectionTitle>
          <ul className="flex flex-col divide-y rounded-2xl border bg-card">
            {ledger.slice().sort((a, b) => +new Date(b.date) - +new Date(a.date)).map((e) => (
                <li key={e.id} className="flex items-center gap-3 p-3.5">
                  <span className={cn('flex size-10 shrink-0 items-center justify-center rounded-xl', e.kind === 'income' ? 'bg-success/15 text-success' : 'bg-muted text-muted-foreground')}>
                    {e.kind === 'income' ? <ArrowDownLeft className="size-4" /> : <ArrowUpRight className="size-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{e.label}</p>
                    <p className="text-xs text-muted-foreground">{e.category} · {fmtDate(e.date)}</p>
                  </div>
                  <span className={cn('text-sm font-bold tabular-nums', e.kind === 'income' && 'text-success')}>
                    {e.kind === 'income' ? '+' : '−'}{inr(e.amount)}
                  </span>
                  <button type="button" onClick={() => removeEntry(e.id)} className="text-muted-foreground"><Trash2 className="size-4" /></button>
                </li>
              ))}
          </ul>
        </div>
      </div>
      {adding && (
        <div className="absolute inset-0 z-20 flex items-end bg-foreground/40">
          <form onSubmit={submit} className="flex w-full flex-col gap-4 rounded-t-3xl bg-card p-5 pb-8">
            <h2 className="font-serif text-xl font-semibold">New entry</h2>
            <Segmented label="Type" value={kind} onChange={setKind} options={[{ value: 'expense', label: 'Expense' }, { value: 'income', label: 'Sale' }]} />
            <input placeholder="Description" value={label} onChange={(e) => setLabel(e.target.value)} className="rounded-xl border bg-background px-3.5 py-3" />
            <input placeholder="Amount ₹" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="rounded-xl border bg-background px-3.5 py-3" required />
            <button type="submit" className="rounded-2xl bg-primary py-3.5 font-semibold text-primary-foreground">Save entry</button>
          </form>
        </div>
      )}
    </div>
  )
}