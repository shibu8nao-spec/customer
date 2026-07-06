'use client'

import { useEffect, useState } from 'react'

type CourseMap = Record<number, number>

type Shop = {
  name: string
  extensionUnit: number
  extensionPrice: number
  courses?: CourseMap
  courseTypes?: Record<string, CourseMap>
}

type OptionItem = {
  name: string
  price: number
}

const drivers = ['成田さん', '土屋さん', '稲本さん']

const shops: Record<string, Shop> = {
  pureheart: {
    name: 'ぴゅあはーと',
    extensionUnit: 10,
    extensionPrice: 3000,
    courses: {
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
    },
  },

  chichikuri: {
    name: 'チチくりたい帯広',
    extensionUnit: 10,
    extensionPrice: 2000,
    courses: {
      60: 8000,
      70: 10000,
      80: 12000,
      90: 14000,
      100: 16000,
      120: 20000,
      150: 24000,
      180: 30000,
    },
  },

  relax: {
    name: 'リラックス',
    extensionUnit: 20,
    extensionPrice: 4000,
    courseTypes: {
      ヘルスコース: {
        60: 10000,
        70: 12000,
        80: 14000,
        90: 16000,
        100: 18000,
        120: 21000,
        150: 26000,
        180: 31000,
      },
      上半身エステコース: {
        60: 12000,
        70: 14000,
        80: 16000,
        90: 18000,
        100: 20000,
        120: 22000,
        150: 28000,
        180: 33000,
      },
      全身エステコース: {
        60: 14000,
        70: 16000,
        80: 18000,
        90: 20000,
        100: 22000,
        120: 24000,
        150: 30000,
        180: 35000,
      },
    },
  },
}

const hotels1000 = [
  '森の時間',
  '赤坂',
  '六本木',
  'オプティマ',
  'スラタ',
  'ココスィート',
  'セブンイン',
  'リバージュ',
  'サンセット・21',
]

const hotels2000 = [
  'マハル',
  'マニスリゾート',
  'バンブー',
  'ニーナ・モナ',
]

const hotels = [...hotels1000, ...hotels2000]

const hotelTraffic: Record<string, number> = {
  森の時間: 1000,
  赤坂: 1000,
  六本木: 1000,
  オプティマ: 1000,
  スラタ: 1000,
  ココスィート: 1000,
  セブンイン: 1000,
  リバージュ: 1000,
  'サンセット・21': 1000,

  マハル: 2000,
  マニスリゾート: 2000,
  バンブー: 2000,
  'ニーナ・モナ': 2000,
}

const options: OptionItem[] = [
  { name: 'ピンクローター', price: 2000 },
  { name: 'バイブ', price: 3000 },
  { name: '電マプレイ', price: 2000 },
  { name: 'パンスト', price: 2000 },
  { name: '顔射', price: 3000 },
  { name: 'ごっくん', price: 3000 },
  { name: 'コスプレ', price: 2000 },
  { name: '即尺', price: 3000 },
  { name: 'AF', price: 8000 },
  { name: '動画', price: 10000 },
  { name: '写メ', price: 5000 },
  { name: 'アナル舐め', price: 2000 },
  { name: 'イラマチオ', price: 5000 },
  { name: '前立腺マッサージ', price: 4000 },
  { name: '耳かき', price: 1000 },
  { name: '顔面騎乗', price: 1000 },
  { name: '唾のみ', price: 3000 },
  { name: '唾飲ませ', price: 1000 },
  { name: '足指舐め', price: 2000 },
  { name: '顔舐め', price: 2000 },
  { name: '顔舐められ', price: 3000 },
]

const amountList = [
  0, 1000, 2000, 3000, 4000, 5000,
  6000, 7000, 8000, 9000, 10000,
  11000, 12000, 13000, 14000, 15000,
]

export default function CalculatorPage(){

const [driver,setDriver]=useState(drivers[0])

const [castName,setCastName]=useState('')

const [shop,setShop]=useState('pureheart')

const [courseType,setCourseType]=
useState('ヘルスコース')

const [nominate,setNominate]=
useState('フリー')

const [course,setCourse]=
useState(60)

const [extension,setExtension]=
useState(0)

const [hotel,setHotel]=
useState(hotels[0])

const [room,setRoom]=
useState('')

const [freeOptions,setFreeOptions]=
useState<string[]>([])

const [paidOptions,setPaidOptions]=
useState<string[]>([])

const [extra,setExtra]=
useState(0)

const [discount,setDiscount]=
useState(0)

const [phone,setPhone]=
useState('')

const [history,setHistory]=
useState<string[]>([])

const targetShop = shops[shop]

const currentCourses =

targetShop.courseTypes

?

targetShop.courseTypes[courseType]

:

targetShop.courses!

const basePrice =
currentCourses[course]

const extensionPrice =

extension *

targetShop.extensionPrice

const nominatePrice =

nominate==='写指'

?

2000

:

0

const paidOptionPrice =

options

.filter(op=>

paidOptions.includes(op.name)

)

.reduce(

(sum,op)=>

sum+op.price,

0

)

let traffic =

hotelTraffic[hotel]

||

0

if(

shop==='chichikuri'

||

shop==='relax'

){

traffic +=1000

}

const total=

basePrice

+

extensionPrice

+

nominatePrice

+

paidOptionPrice

+

extra

-

discount

+

traffic

const extraText =

extra>0

?

`+${extra}`

:

''

const discountText =

discount>0

?

`${discount}オフ`

:

''

const trafficText =

traffic>0

?

`交 ${traffic}`

:

''

const hotelText =

room

?

`${hotel}${room}`

:

hotel

const nominateText =

nominate==='写指'

?

'写指'

:

'フリー'

const courseTypeShortText =
  shop === 'relax' && courseType === '上半身エステコース'
    ? '上半身'
    : shop === 'relax' && courseType === '全身エステコース'
    ? '全身'
    : ''

const courseText =
  courseTypeShortText
    ? `${courseTypeShortText} ${course}分`
    : `${course}分`

const sections = [

driver,

`${castName}
${targetShop.name}
${nominateText} ${courseText}
${hotelText}
${total.toLocaleString()}円`,

freeOptions.length

?

`無料OP
${freeOptions.join('\n')}`

:

'',

paidOptions.length

?

`有料OP
${paidOptions.join('\n')}`

:

'',

[

extraText,

discountText,

trafficText

]

.filter(Boolean)

.join('\n'),

phone

]

const lineText =

sections

.filter(Boolean)

.join('\n\n')

useEffect(()=>{

const saved=

localStorage.getItem(

'calculator-history'

)

if(!saved){

setHistory([])

return

}

try{

const parsed=

JSON.parse(saved)

if(

Array.isArray(parsed)

){

setHistory(parsed)

}

else{

setHistory([])

localStorage.removeItem(

'calculator-history'

)

}

}

catch{

setHistory([])

localStorage.removeItem(

'calculator-history'

)

}

},[])

const saveHistory=()=>{

const newHistory=[

lineText,

...history

]

.slice(0,30)

setHistory(

newHistory

)

localStorage.setItem(

'calculator-history',

JSON.stringify(

newHistory

)

)

}

const copyLine=()=>{

navigator.clipboard.writeText(

lineText

)

saveHistory()

alert(

'LINEコピーしました'

)

}

const toggleFreeOption=(name:string)=>{

if(freeOptions.includes(name)){

setFreeOptions(
freeOptions.filter(op=>op!==name)
)

return

}

if(freeOptions.length>=2){

alert('無料OPは2個までです')

return

}

setFreeOptions([
...freeOptions,
name
])

}

const togglePaidOption=(name:string)=>{

if(paidOptions.includes(name)){

setPaidOptions(
paidOptions.filter(op=>op!==name)
)

return

}

setPaidOptions([
...paidOptions,
name
])

}

const handleShopChange=(value:string)=>{

setShop(value)
setExtension(0)

const nextShop=shops[value]

const nextCourses=

nextShop.courseTypes

?

nextShop.courseTypes['ヘルスコース']

:

nextShop.courses!

setCourseType('ヘルスコース')

setCourse(
Number(Object.keys(nextCourses)[0])
)

}

const handleCourseTypeChange=(value:string)=>{

setCourseType(value)

const nextCourses=
shops.relax.courseTypes![value]

setCourse(
Number(Object.keys(nextCourses)[0])
)

setExtension(0)

}

const extensionOptions=

Array.from(
{length:25},
(_,i)=>i
)

return (

<main style={styles.page}>

<h1>料金計算ツール</h1>

<label style={styles.label}>ドライバー</label>

<select
value={driver}
onChange={(e)=>setDriver(e.target.value)}
style={styles.input}
>

{drivers.map(d=>(

<option
key={d}
value={d}
>
{d}
</option>

))}

</select>

<label style={styles.label}>キャスト名</label>

<input
value={castName}
onChange={(e)=>setCastName(e.target.value)}
placeholder="例：PLなこ"
style={styles.input}
/>

<label style={styles.label}>店舗</label>

<select
value={shop}
onChange={(e)=>handleShopChange(e.target.value)}
style={styles.input}
>

<option value="pureheart">ぴゅあはーと</option>
<option value="chichikuri">チチくりたい帯広</option>
<option value="relax">リラックス</option>

</select>

<label style={styles.label}>指名</label>

<select
value={nominate}
onChange={(e)=>setNominate(e.target.value)}
style={styles.input}
>

<option>フリー</option>
<option>写指</option>
<option>本指</option>

</select>

{shop==='relax' && (

<>

<label style={styles.label}>コース種別</label>

<select
value={courseType}
onChange={(e)=>handleCourseTypeChange(e.target.value)}
style={styles.input}
>

<option>ヘルスコース</option>
<option>上半身エステコース</option>
<option>全身エステコース</option>

</select>

</>

)}

<label style={styles.label}>コース</label>

<select
value={course}
onChange={(e)=>setCourse(Number(e.target.value))}
style={styles.input}
>

{Object.keys(currentCourses).map(c=>(

<option
key={c}
value={c}
>
{c}分（{currentCourses[Number(c)].toLocaleString()}円）
</option>

))}

</select>

<label style={styles.label}>延長</label>

<select
value={extension}
onChange={(e)=>setExtension(Number(e.target.value))}
style={styles.input}
>

{extensionOptions.map(count=>{

const minutes=count*targetShop.extensionUnit

const price=count*targetShop.extensionPrice

return (

<option
key={count}
value={count}
>

{count===0
?'延長なし'
:`${minutes}分（+${price.toLocaleString()}円）`
}

</option>

)

})}

</select>

<label style={styles.label}>ホテル</label>

<select
value={hotel}
onChange={(e)=>setHotel(e.target.value)}
style={styles.input}
>

{hotels.map(h=>(

<option
key={h}
value={h}
>
{h}
</option>

))}

</select>

<label style={styles.label}>部屋番号</label>

<input
value={room}
onChange={(e)=>setRoom(e.target.value)}
placeholder="例：207"
style={styles.input}
/>

<section style={styles.section}>
  <h2>無料OP（最大2個）</h2>

  <div style={styles.optionGrid}>
    {options.map(op => (
      <label key={op.name} style={styles.checkBox}>
        <input
          type="checkbox"
          checked={freeOptions.includes(op.name)}
          onChange={() => toggleFreeOption(op.name)}
        />
        {op.name}
      </label>
    ))}
  </div>
</section>

<section style={styles.section}>
  <h2>有料OP</h2>

  <div style={styles.optionGrid}>
    {options.map(op => (
      <label key={op.name} style={styles.checkBox}>
        <input
          type="checkbox"
          checked={paidOptions.includes(op.name)}
          onChange={() => togglePaidOption(op.name)}
        />
        {op.name}（{op.price.toLocaleString()}円）
      </label>
    ))}
  </div>
</section>

<h2>総額</h2>
<div style={styles.total}>
  {total.toLocaleString()}円
</div>

<label style={styles.label}>割増</label>
<select
  value={extra}
  onChange={(e)=>setExtra(Number(e.target.value))}
  style={styles.input}
>
  {amountList.map(v => (
    <option key={v} value={v}>
      {v === 0 ? 'なし' : `+${v.toLocaleString()}`}
    </option>
  ))}
</select>

<label style={styles.label}>割引</label>
<select
  value={discount}
  onChange={(e)=>setDiscount(Number(e.target.value))}
  style={styles.input}
>
  {amountList.map(v => (
    <option key={v} value={v}>
      {v === 0 ? 'なし' : `${v.toLocaleString()}オフ`}
    </option>
  ))}
</select>

<label style={styles.label}>電話番号</label>
<input
  value={phone}
  onChange={(e)=>setPhone(e.target.value)}
  placeholder="例：08012345678"
  style={styles.input}
/>

<button onClick={copyLine} style={styles.button}>
  LINEコピー
</button>

<h2>送信内容</h2>
<pre style={styles.preview}>
  {lineText}
</pre>

<h2>履歴</h2>
<div>
  {history.map((item,index)=>(
    <pre key={index} style={styles.historyItem}>
      {item}
    </pre>
  ))}
</div>

</main>

)

}

const styles = {
  page: {
    padding: '40px',
    background: '#111',
    minHeight: '100vh',
    color: 'white',
  },

  label: {
    display: 'block',
    marginBottom: '6px',
    fontWeight: 'bold',
  },

  input: {
    display: 'block',
    width: '420px',
    padding: '12px',
    marginBottom: '16px',
    background: '#1f1f1f',
    border: '1px solid #444',
    borderRadius: '8px',
    color: 'white',
    fontSize: '15px',
  },

  section: {
    marginTop: '24px',
    marginBottom: '24px',
    maxWidth: '760px',
  },

  optionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))',
    gap: '10px',
    marginBottom: '20px',
  },

  checkBox: {
    background: '#1f1f1f',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #333',
  },

  total: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },

  button: {
    padding: '14px',
    width: '420px',
    background: '#7c3aed',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    marginTop: '20px',
    marginBottom: '20px',
  },

  preview: {
    background: '#1f1f1f',
    padding: '15px',
    borderRadius: '8px',
    whiteSpace: 'pre-wrap' as const,
    width: '420px',
  },

  historyItem: {
    background: '#1f1f1f',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '10px',
    whiteSpace: 'pre-wrap' as const,
    width: '420px',
  },
}