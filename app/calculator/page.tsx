'use client'

import { useEffect, useState } from 'react'

export default function CalculatorPage() {
  const courseList = {
    60: 13000,
    70: 15000,
    80: 17000,
    90: 19000,
    100: 21000,
    120: 25000,
    180: 36000,
    240: 48000,
    300: 70000,
    360: 82000,
  }

  const nominateList = {
    free: 0,
    photo: 2000,
    regular: 2000,
  }

  const [driver, setDriver] = useState('')
  const [cast, setCast] = useState('')
  const [shop, setShop] = useState('')
  const [hotel, setHotel] = useState('')
  const [room, setRoom] = useState('')
  const [phone, setPhone] = useState('')

  const [course, setCourse] = useState(60)
  const [nominate, setNominate] = useState('free')
  const [extra, setExtra] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [traffic, setTraffic] = useState(0)

  const [history, setHistory] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('calculatorHistory')
    if (saved) {
      setHistory(JSON.parse(saved))
    }
  }, [])

  const coursePrice = courseList[course as keyof typeof courseList]
  const nominatePrice = nominateList[nominate as keyof typeof nominateList]

  const total = coursePrice + nominatePrice + extra + traffic - discount

  const nominateText =
    nominate === 'photo'
      ? '写指'
      : nominate === 'regular'
      ? '本指'
      : 'フリー'

  const details = [
    extra > 0 && `+${extra.toLocaleString()}`,
    discount > 0 && `${discount.toLocaleString()}オフ`,
    traffic > 0 && `交通費${traffic.toLocaleString()}`,
  ]
    .filter(Boolean)
    .join('\n')

  const copyText = `${driver}さん

${cast}
${shop}
${nominateText} ${course}
${hotel}${room ? room : ''}
${total.toLocaleString()}円

${details ? `${details}\n\n` : ''}${phone}`

  async function copyToClipboard() {
    await navigator.clipboard.writeText(copyText)

    const now = new Date()
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`

    const updated = [`${time}\n\n${copyText}`, ...history]

    setHistory(updated)
    localStorage.setItem('calculatorHistory', JSON.stringify(updated))

    alert('コピーしました')
  }

  function clearForm() {
    setDriver('')
    setCast('')
    setShop('')
    setHotel('')
    setRoom('')
    setPhone('')
    setCourse(60)
    setNominate('free')
    setExtra(0)
    setDiscount(0)
    setTraffic(0)
  }

  function clearHistory() {
    setHistory([])
    localStorage.removeItem('calculatorHistory')
  }

  return (
    <main style={mainStyle}>
      <h1>料金計算</h1>

      <input placeholder="ドライバー名" value={driver} onChange={(e) => setDriver(e.target.value)} style={inputStyle} />
      <input placeholder="キャスト名" value={cast} onChange={(e) => setCast(e.target.value)} style={inputStyle} />
      <input placeholder="店名" value={shop} onChange={(e) => setShop(e.target.value)} style={inputStyle} />

      <select value={nominate} onChange={(e) => setNominate(e.target.value)} style={inputStyle}>
        <option value="free">フリー</option>
        <option value="photo">写指</option>
        <option value="regular">本指</option>
      </select>

      <select value={course} onChange={(e) => setCourse(Number(e.target.value))} style={inputStyle}>
        {Object.entries(courseList).map(([minute, price]) => (
          <option key={minute} value={minute}>
            {minute}分（{price.toLocaleString()}円）
          </option>
        ))}
      </select>

      <input placeholder="ホテル名・自宅" value={hotel} onChange={(e) => setHotel(e.target.value)} style={inputStyle} />
      <input placeholder="部屋番号" value={room} onChange={(e) => setRoom(e.target.value)} style={inputStyle} />

      <select value={extra} onChange={(e) => setExtra(Number(e.target.value))} style={inputStyle}>
        {[0, 1000, 2000, 3000, 4000].map((v) => (
          <option key={v} value={v}>
            +{v.toLocaleString()}
          </option>
        ))}
      </select>

      <select value={discount} onChange={(e) => setDiscount(Number(e.target.value))} style={inputStyle}>
        {[0, 1000, 2000, 3000, 4000].map((v) => (
          <option key={v} value={v}>
            {v.toLocaleString()}オフ
          </option>
        ))}
      </select>

      <select value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} style={inputStyle}>
        {[0, 1000, 2000, 3000, 4000].map((v) => (
          <option key={v} value={v}>
            交通費{v.toLocaleString()}
          </option>
        ))}
      </select>

      <input placeholder="電話番号" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />

      <div style={resultStyle}>
        <h2>{total.toLocaleString()}円</h2>

        <pre style={previewStyle}>{copyText}</pre>

        <button onClick={copyToClipboard} style={buttonStyle}>
          LINE用にコピー
        </button>

        <button onClick={clearForm} style={subButtonStyle}>
          入力クリア
        </button>
      </div>

      <div style={historyStyle}>
        <div style={historyHeaderStyle}>
          <h2>履歴</h2>
          <button onClick={clearHistory} style={subButtonStyle}>
            履歴クリア
          </button>
        </div>

        {history.map((item, index) => (
          <div key={index} style={historyCard}>
            <pre style={historyTextStyle}>{item}</pre>
          </div>
        ))}
      </div>
    </main>
  )
}

const mainStyle = {
  padding: 40,
  background: '#111',
  color: 'white',
  minHeight: '100vh',
}

const inputStyle = {
  display: 'block',
  width: '420px',
  padding: '12px',
  marginBottom: '12px',
  background: '#1a1a1a',
  border: '1px solid #333',
  borderRadius: '8px',
  color: 'white',
  fontSize: '16px',
}

const resultStyle = {
  padding: '20px',
  background: '#1f1f1f',
  width: '420px',
  borderRadius: '8px',
  marginBottom: '20px',
}

const previewStyle = {
  whiteSpace: 'pre-wrap' as const,
  background: '#111',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #333',
}

const buttonStyle = {
  padding: '12px',
  background: '#7c3aed',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  cursor: 'pointer',
  marginRight: '8px',
}

const subButtonStyle = {
  padding: '12px',
  background: '#333',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  cursor: 'pointer',
}

const historyStyle = {
  width: '420px',
  marginTop: '30px',
}

const historyHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const historyCard = {
  padding: '16px',
  background: '#1f1f1f',
  borderRadius: '8px',
  marginBottom: '12px',
}

const historyTextStyle = {
  whiteSpace: 'pre-wrap' as const,
  margin: 0,
}