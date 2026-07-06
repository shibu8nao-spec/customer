'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function EditCustomerForm({ customer }: { customer: any }) {
  const [name, setName] = useState(customer.name || '')
  const [phone, setPhone] = useState(customer.phone || '')
  const [nickname, setNickname] = useState(customer.nickname || '')
  const [area, setArea] = useState(customer.area || '')
  const [memo, setMemo] = useState(customer.memo || '')

  const [casts, setCasts] = useState<any[]>([])
  const [reservations, setReservations] = useState<any[]>([])

  const [startTime, setStartTime] = useState('')
  const [castName, setCastName] = useState('')
  const [courseMinutes, setCourseMinutes] = useState(60)
  const [reservationType, setReservationType] = useState('free')
  const [hotelName, setHotelName] = useState('')
  const [customerAmount, setCustomerAmount] = useState(0)
  const [reservationMemo, setReservationMemo] = useState('')

  useEffect(() => {
    fetchCasts()
    fetchReservations()
  }, [])

  async function fetchCasts() {
    const { data } = await supabase.from('casts').select('*').order('name', { ascending: true })
    if (data) setCasts(data)
  }

  async function fetchReservations() {
    const { data } = await supabase
      .from('reservations')
      .select('*')
      .eq('customer_id', customer.id)
      .order('created_at', { ascending: false })

    if (data) setReservations(data)
  }

  const selectedCast = casts.find((cast) => cast.name === castName)

  const extraPay =
    reservationType === 'free'
      ? Number(selectedCast?.free_tokuten || 0)
      : reservationType === 'photo'
      ? Number(selectedCast?.photo_tokuten || 0)
      : Number(selectedCast?.regular_tokuten || 0)

  const castPay = courseMinutes * 100 + extraPay * 1000
  const shopProfit = Number(customerAmount || 0) - castPay

  async function updateCustomer() {
    const { error } = await supabase
      .from('customers')
      .update({
        name,
        phone,
        nickname,
        area,
        memo,
        updated_at: new Date().toISOString(),
      })
      .eq('id', customer.id)

    if (error) {
      console.log(error)
      alert('顧客情報の保存に失敗しました')
      return
    }

    alert('顧客情報を保存しました')
  }

  async function addReservation() {
    if (!startTime) {
      alert('ご利用開始時間を入力してください')
      return
    }

    if (!castName) {
      alert('キャストを選択してください')
      return
    }

    if (!customerAmount) {
      alert('金額を入力してください')
      return
    }

    const endTime = new Date(
      new Date(startTime).getTime() + courseMinutes * 60000
    ).toISOString()

    const { error } = await supabase
      .from('reservations')
      .insert([
        {
          customer_id: customer.id,
          cast_name: castName,
          course_minutes: courseMinutes,
          reservation_type: reservationType,
          customer_amount: Number(customerAmount),
          cast_pay: castPay,
          shop_profit: shopProfit,
          hotel_name: hotelName,
          area,
          status: '予約中',
          start_time: startTime,
          end_time: endTime,
          memo: reservationMemo,
        },
      ])
      .select()

    if (error) {
      console.log(error)
      alert('予約登録に失敗しました')
      return
    }

    await fetchReservations()

    alert('予約登録しました')

    setStartTime('')
    setCastName('')
    setCourseMinutes(60)
    setReservationType('free')
    setHotelName('')
    setCustomerAmount(0)
    setReservationMemo('')
  }

  return (
    <main style={mainStyle}>
      <h1>顧客詳細・編集</h1>

      <section style={sectionStyle}>
        <h2>顧客情報</h2>

        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="名前" style={inputStyle} />
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="電話番号" style={inputStyle} />
        <input value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder="呼び名" style={inputStyle} />
        <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="エリア" style={inputStyle} />
        <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="顧客メモ" style={textareaStyle} />

        <button onClick={updateCustomer} style={buttonStyle}>
          顧客情報を保存
        </button>
      </section>

      <section style={sectionStyle}>
        <h2>予約登録</h2>

        <label style={labelStyle}>ご利用開始時間</label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          style={inputStyle}
        />

        <label style={labelStyle}>キャスト選択</label>
        <select value={castName} onChange={(e) => setCastName(e.target.value)} style={inputStyle}>
          <option value="">キャストを選択</option>
          {casts.map((cast) => (
            <option key={cast.id} value={cast.name}>
              {cast.name}
            </option>
          ))}
        </select>

        <select value={courseMinutes} onChange={(e) => setCourseMinutes(Number(e.target.value))} style={inputStyle}>
          <option value={60}>60分</option>
          <option value={70}>70分</option>
          <option value={80}>80分</option>
          <option value={90}>90分</option>
          <option value={100}>100分</option>
          <option value={120}>120分</option>
          <option value={150}>150分</option>
          <option value={180}>180分</option>
        </select>

        <select value={reservationType} onChange={(e) => setReservationType(e.target.value)} style={inputStyle}>
          <option value="free">フリー</option>
          <option value="photo">写真指名</option>
          <option value="regular">本指名</option>
        </select>

        <label style={labelStyle}>ご利用場所</label>
        <input value={hotelName} onChange={(e) => setHotelName(e.target.value)} placeholder="ホテル名・自宅など" style={inputStyle} />

        <label style={labelStyle}>金額</label>
        <input
          value={customerAmount === 0 ? '' : customerAmount}
          onChange={(e) => setCustomerAmount(Number(e.target.value.replace(/\D/g, '')) || 0)}
          placeholder="お客さん支払い金額"
          type="text"
          style={inputStyle}
        />

        <div style={calcBoxStyle}>
          <p>客支払い：<strong>{customerAmount.toLocaleString()}円</strong></p>
          <p>キャスト給料：<strong>{castPay.toLocaleString()}円</strong></p>
          <p>店舗利益：<strong>{shopProfit.toLocaleString()}円</strong></p>
        </div>

        <label style={labelStyle}>メモ</label>
        <textarea
          value={reservationMemo}
          onChange={(e) => setReservationMemo(e.target.value)}
          placeholder="予約メモ"
          style={textareaStyle}
        />

        <button onClick={addReservation} style={buttonStyle}>
          予約登録
        </button>
      </section>

      <section style={sectionStyle}>
        <h2>利用履歴</h2>

        {reservations.length === 0 && <p>利用履歴はありません</p>}

        {reservations.map((r) => (
          <div key={r.id} style={historyCardStyle}>
            <p>キャスト：{r.cast_name}</p>
            <p>コース：{r.course_minutes}分</p>
            <p>種別：{typeLabel(r.reservation_type)}</p>
            <p>ホテル：{r.hotel_name || '-'}</p>
            <p>客支払い：{Number(r.customer_amount || 0).toLocaleString()}円</p>
            <p>キャスト給料：{Number(r.cast_pay || 0).toLocaleString()}円</p>
            <p>店舗利益：{Number(r.shop_profit || 0).toLocaleString()}円</p>
            <p>メモ：{r.memo || '-'}</p>
          </div>
        ))}
      </section>
    </main>
  )
}

function typeLabel(type: string) {
  if (type === 'photo') return '写真指名'
  if (type === 'regular') return '本指名'
  return 'フリー'
}

const mainStyle = {
  padding: 40,
  background: '#111',
  color: 'white',
  minHeight: '100vh',
}

const sectionStyle = {
  marginBottom: 40,
}

const labelStyle = {
  display: 'block',
  marginBottom: 6,
  fontWeight: 'bold',
}

const inputStyle = {
  display: 'block',
  width: '100%',
  maxWidth: 620,
  padding: 12,
  marginBottom: 14,
  borderRadius: 8,
  border: '1px solid #444',
  background: '#1a1a1a',
  color: 'white',
  fontSize: 16,
}

const textareaStyle = {
  ...inputStyle,
  height: 100,
}

const buttonStyle = {
  padding: '12px 20px',
  borderRadius: 8,
  border: 'none',
  background: '#7c3aed',
  color: 'white',
  fontSize: 16,
  cursor: 'pointer',
  marginTop: 8,
}

const calcBoxStyle = {
  maxWidth: 620,
  padding: 16,
  marginBottom: 14,
  borderRadius: 8,
  background: '#222',
}

const historyCardStyle = {
  maxWidth: 620,
  padding: 16,
  marginBottom: 12,
  borderRadius: 8,
  background: '#1f1f1f',
  border: '1px solid #333',
}