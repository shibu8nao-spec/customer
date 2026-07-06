'use client'

import Link from "next/link"
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [customers, setCustomers] = useState<any[]>([])
  const [search, setSearch] = useState('')

  const [phone, setPhone] = useState('')
  const [name, setName] = useState('')
  const [nickname, setNickname] = useState('')
  const [area, setArea] = useState('')
  const [memo, setMemo] = useState('')

  useEffect(() => {
    fetchCustomers()
  }, [])

  async function fetchCustomers() {
    const { data } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) setCustomers(data)
  }

  async function addCustomer() {
    if (!phone) {
      alert('電話番号を入力してください')
      return
    }

    const { error } = await supabase.from('customers').insert([
      {
        phone,
        name,
        nickname,
        area,
        memo,
        warning_level: '通常',
        is_banned: false,
        visit_count: 0,
      },
    ])

    if (error) {
      alert('登録に失敗しました')
      console.log(error)
      return
    }

    setPhone('')
    setName('')
    setNickname('')
    setArea('')
    setMemo('')

    fetchCustomers()
  }

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase()

    return (
      customer.phone?.includes(keyword) ||
      customer.name?.toLowerCase().includes(keyword) ||
      customer.nickname?.toLowerCase().includes(keyword) ||
      customer.area?.toLowerCase().includes(keyword)
    )
  })

  return (
    <main style={{ padding: 40, color: 'white', background: '#0f0f0f', minHeight: '100vh' }}>
      <h1>Customer CRM</h1>

      <section style={{ marginBottom: 32 }}>
        <h2>顧客追加</h2>

        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="電話番号" style={inputStyle} />
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="名前" style={inputStyle} />
        <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="呼び名" style={inputStyle} />
        <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="エリア" style={inputStyle} />
        <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="メモ" style={textareaStyle} />

        <br />

        <button onClick={addCustomer} style={buttonStyle}>
          ＋ 顧客追加
        </button>
      </section>

      <section>
        <h2>顧客検索</h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="電話番号・名前・エリアで検索"
          style={inputStyle}
        />

        <p>件数：{filteredCustomers.length}</p>

        {filteredCustomers.map((customer) => (
          <div key={customer.id} style={cardStyle}>
            <h3>{<Link
  href={`/customers/${customer.id}`}
  style={{
    color: '#60a5fa',
    textDecoration: 'none'
  }}
>
  <h3>{customer.name || '名前未登録'}</h3>
</Link>}</h3>
            <p>電話番号：{customer.phone}</p>
            <p>呼び名：{customer.nickname || '-'}</p>
            <p>エリア：{customer.area || '-'}</p>
            <p>メモ：{customer.memo || '-'}</p>
          </div>
        ))}
      </section>
    </main>
  )
}

const inputStyle = {
  display: 'block',
  width: '100%',
  maxWidth: 500,
  padding: 12,
  marginBottom: 10,
  borderRadius: 8,
  border: '1px solid #444',
  background: '#1a1a1a',
  color: 'white',
  fontSize: 16,
}

const textareaStyle = {
  ...inputStyle,
  height: 90,
}

const buttonStyle = {
  padding: '12px 20px',
  borderRadius: 8,
  border: 'none',
  background: '#7c3aed',
  color: 'white',
  fontSize: 16,
  cursor: 'pointer',
}

const cardStyle = {
  border: '1px solid #333',
  padding: 16,
  marginBottom: 12,
  borderRadius: 8,
  background: '#181818',
}