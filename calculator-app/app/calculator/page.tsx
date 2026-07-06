'use client'

import { useState, useEffect } from 'react'

type CourseMap = Record<number, number>

type Shop = {

name:string

extensionUnit:number

extensionPrice:number

courses?:CourseMap

courseTypes?:Record<string,CourseMap>

}

type OptionItem={

name:string

price:number

}

const drivers=[

'成田さん',

'土屋さん',

'稲本さん'

]

const shops:Record<string,Shop>={

pureheart:{

name:'ぴゅあはーと',

extensionUnit:10,

extensionPrice:3000,

courses:{

60:13000,

70:15000,

80:17000,

90:19000,

100:21000,

120:25000,

180:36000,

240:48000,

300:70000,

360:82000

}

},

chichikuri:{

name:'チチくりたい帯広',

extensionUnit:10,

extensionPrice:2000,

courses:{

60:8000,

70:10000,

80:12000,

90:14000,

100:16000,

120:20000,

150:24000,

180:30000

}

},

relax:{

name:'リラックス',

extensionUnit:20,

extensionPrice:4000,

courseTypes:{

'ヘルスコース':{

60:10000,

70:12000,

80:14000,

90:16000,

100:18000,

120:21000,

150:26000,

180:31000

},

'上半身エステコース':{

60:12000,

70:14000,

80:16000,

90:18000,

100:20000,

120:22000,

150:28000,

180:33000

},

'全身エステコース':{

60:14000,

70:16000,

80:18000,

90:20000,

100:22000,

120:24000,

150:30000,

180:35000

}

}

}

}

const hotels1000=[

'森の時間',

'赤坂',

'六本木',

'オプティマ',

'スラタ',

'ココスィート',

'セブンイン',

'リバージュ',

'サンセット・21'

]

const hotels2000=[

'マハル',

'マニスリゾート',

'バンブー',

'ニーナ・モナ'

]

const hotels=[

...hotels1000,

...hotels2000

]

const hotelTraffic:Record<string,number>={

'森の時間':1000,

'赤坂':1000,

'六本木':1000,

'オプティマ':1000,

'スラタ':1000,

'ココスィート':1000,

'セブンイン':1000,

'リバージュ':1000,

'サンセット・21':1000,

'マハル':2000,

'マニスリゾート':2000,

'バンブー':2000,

'ニーナ・モナ':2000

}

const options:OptionItem[]=[

{name:'コスプレ',price:2000},

{name:'即尺',price:3000},

{name:'電マ',price:2000},

{name:'パンスト',price:2000},

{name:'顔射',price:3000},

{name:'ごっくん',price:3000},

{name:'AF',price:8000},

{name:'動画',price:10000},

{name:'写メ',price:5000},

{name:'アナル舐め',price:2000},

{name:'イラマチオ',price:5000},

{name:'前立腺マッサージ',price:4000},

{name:'耳かき',price:1000},

{name:'顔面騎乗',price:1000},

{name:'唾のみ',price:3000},

{name:'唾飲ませ',price:1000},

{name:'足指舐め',price:2000},

{name:'顔舐め',price:2000},

{name:'顔舐められ',price:3000}

]

const amountList=[

0,

1000,

2000,

3000,

4000,

5000,

6000,

7000,

8000,

9000,

10000,

11000,

12000,

13000,

14000,

15000

]

export default function CalculatorPage(){

const [driver,setDriver]=
useState('成田さん')

const [castName,setCastName]=
useState('')

const [shopKey,setShopKey]=
useState('pureheart')

const [courseType,setCourseType]=
useState('ヘルスコース')

const [course,setCourse]=
useState(60)

const [extension,setExtension]=
useState(0)

const [nominate,setNominate]=
useState('free')

const [locationType,setLocationType]=
useState('hotel')

const [hotel,setHotel]=
useState('森の時間')

const [room,setRoom]=
useState('')

const [address,setAddress]=
useState('')

const [traffic,setTraffic]=
useState(1000)

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

const selectedShop=

shops[shopKey]

const currentCourses=

selectedShop.courseTypes?.[courseType]

||

selectedShop.courses

||

{}

const courseList=

Object.keys(currentCourses)

.map(Number)

const coursePrice=

currentCourses[course]

||

0

const nominatePrice=

nominate==='free'

?0

:2000

const extensionPrice=

extension===0

?0

:

(

extension

/

selectedShop.extensionUnit

)

*

selectedShop.extensionPrice

const paidOptionTotal=

options

.filter(op=>

paidOptions.includes(op.name)

)

.reduce(

(sum,op)=>

sum+op.price

,0

)

const total=

coursePrice

+

nominatePrice

+

extensionPrice

+

paidOptionTotal

+

extra

+

traffic

-

discount

const nominateText=

nominate==='photo'

?'写指'

:

nominate==='regular'

?'本指'

:

'フリー'

const courseText=

extension>0

?

`${course}＋${extension}`

:

`${course}`

const hotelText=

locationType==='hotel'

?

`${hotel}${room}`

:

address

const trafficText=

shopKey==='pureheart'

?

traffic>1000

?

`交 ${traffic}`

:''

:

`交 ${traffic}`

const freeText=

freeOptions.length

?

`無料OP

${freeOptions.join('\n')}`

:''

const paidText=

paidOptions.length

?

`有料OP

${paidOptions.join('\n')}`

:''

const extraText=

extra

?

`+${extra}`

:''

const discountText=

discount

?

`${discount}オフ`

:''

const lineText=

`${driver}

${castName}
${selectedShop.name}

${nominateText} ${courseText}
${hotelText}
${total.toLocaleString()}円

${freeText}

${paidText}

${extraText}
${discountText}
${trafficText}

${phone}`

useEffect(()=>{

const saved=

localStorage.getItem(

'calculator-history'

)

if(saved){

setHistory(

JSON.parse(saved)

)

}

},[])

function toggleFreeOption(name:string){

if(freeOptions.includes(name)){

setFreeOptions(

freeOptions.filter(

item=>item!==name

)

)

return

}

if(freeOptions.length>=2){

alert('無料オプションは2個までです')

return

}

setFreeOptions([

...freeOptions,

name

])

}

function togglePaidOption(name:string){

if(paidOptions.includes(name)){

setPaidOptions(

paidOptions.filter(

item=>item!==name

)

)

return

}

setPaidOptions([

...paidOptions,

name

])

}

function handleHotelChange(

value:string

){

setHotel(value)

const base=

hotelTraffic[value]

||

1000

if(

shopKey==='pureheart'

){

setTraffic(base)

}

else{

setTraffic(base+1000)

}

}

function handleShopChange(

value:string

){

setShopKey(value)

setExtension(0)

const target=

shops[value]

const nextCourses=

target.courseTypes?.[courseType]

||

target.courseTypes?.['ヘルスコース']

||

target.courses

||

{}

const firstCourse=

Number(

Object.keys(

nextCourses

)[0]

)

setCourse(

firstCourse

)

if(

value==='relax'

){

setCourseType(

'ヘルスコース'

)

}

const base=

hotelTraffic[hotel]

||

1000

if(

value==='pureheart'

){

setTraffic(base)

}

else{

setTraffic(base+1000)

}

}

function handleCourseTypeChange(

value:string

){

setCourseType(value)

const next=

selectedShop

.courseTypes?.[value]

||

{}

const first=

Number(

Object.keys(next)[0]

)

setCourse(first)

setExtension(0)

}

async function copyLine(){

await navigator

.clipboard

.writeText(

lineText

)

saveHistory()

alert(

'コピーしました'

)

}

function saveHistory(){

const newHistory=[

lineText,

...history

]

.slice(0,50)

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

const mapUrl=

address

?

`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

:''
return (

<main style={styles.page}>

<h1>

料金計算ツール

</h1>

<label>

ドライバー

</label>

<select

value={driver}

onChange={(e)=>

setDriver(e.target.value)

}

style={styles.input}

>

{

drivers.map(d=>(

<option

key={d}

value={d}

>

{d}

</option>

))

}

</select>

<label>

キャスト名

</label>

<input

value={castName}

onChange={(e)=>

setCastName(

e.target.value

)

}

style={styles.input}

/>

<label>

店舗

</label>

<select

value={shopKey}

onChange={(e)=>

handleShopChange(

e.target.value

)

}

style={styles.input}

>

<option value='pureheart'>

ぴゅあはーと

</option>

<option value='chichikuri'>

チチくりたい帯広

</option>

<option value='relax'>

リラックス

</option>

</select>

<label>

指名

</label>

<select

value={nominate}

onChange={(e)=>

setNominate(

e.target.value

)

}

style={styles.input}

>

<option value='free'>

フリー

</option>

<option value='photo'>

写指

</option>

<option value='regular'>

本指

</option>

</select>

{

shopKey==='relax'

&&

<>

<label>

コース種別

</label>

<select

value={courseType}

onChange={(e)=>

handleCourseTypeChange(

e.target.value

)

}

style={styles.input}

>

<option>

ヘルスコース

</option>

<option>

上半身エステコース

</option>

<option>

全身エステコース

</option>

</select>

</>

}

<label>

コース

</label>

<select

value={course}

onChange={(e)=>

setCourse(

Number(

e.target.value

)

)

}

style={styles.input}

>

{

courseList.map(c=>(

<option

key={c}

value={c}

>

{c}分

</option>

))

}

</select>

<label>

延長

</label>

<select

value={extension}

onChange={(e)=>

setExtension(

Number(

e.target.value

)

)

}

style={styles.input}

>

{

Array.from(

{length:25},

(_,i)=>

i*

selectedShop

.extensionUnit

)

.map(m=>(

<option

key={m}

value={m}

>

{

m===0

?

'延長なし'

:

`${m}分`

}

</option>

))

}

</select>

<label>

利用場所

</label>

<select

value={locationType}

onChange={(e)=>

setLocationType(

e.target.value

)

}

style={styles.input}

>

<option value='hotel'>

ホテル

</option>

<option value='home'>

自宅

</option>

</select>

{

locationType==='hotel'

?

<>

<label>

ホテル

</label>

<select

value={hotel}

onChange={(e)=>

handleHotelChange(

e.target.value

)

}

style={styles.input}

>

{

hotels.map(h=>(

<option

key={h}

value={h}

>

{h}

</option>

))

}

</select>

<label>

部屋番号

</label>

<input

value={room}

onChange={(e)=>

setRoom(

e.target.value

)

}

style={styles.input}

/>

</>

:

<>

<label>

住所

</label>

<input

value={address}

onChange={(e)=>

setAddress(

e.target.value

)

}

style={styles.input}

/>

{

address

&&

<a

href={mapUrl}

target='_blank'

style={styles.map}

>

GoogleMapで開く

</a>

}

</>

}
<section>

<h3>

無料OP（最大2個）

</h3>

<div style={styles.optionWrap}>

{

options.map(op=>(

<label
key={op.name}
style={styles.checkBox}

>

<input

type='checkbox'

checked={

freeOptions.includes(

op.name

)

}

onChange={()=>

toggleFreeOption(

op.name

)

}

/>

{op.name}

</label>

))

}

</div>

</section>

<section>

<h3>

有料OP

</h3>

<div style={styles.optionWrap}>

{

options.map(op=>(

<label
key={op.name}
style={styles.checkBox}

>

<input

type='checkbox'

checked={

paidOptions.includes(

op.name

)

}

onChange={()=>

togglePaidOption(

op.name

)

}

/>

{op.name}

（{op.price.toLocaleString()}）

</label>

))

}

</div>

</section>

<h2>

総額

</h2>

<div style={styles.total}>

{total.toLocaleString()}円

</div>

<label>

割増

</label>

<select

value={extra}

onChange={(e)=>

setExtra(

Number(

e.target.value

)

)

}

style={styles.input}

>

{

amountList.map(v=>(

<option

key={v}

value={v}

>

{

v===0

?

'なし'

:

`+${v}`

}

</option>

))

}

</select>

<label>

割引

</label>

<select

value={discount}

onChange={(e)=>

setDiscount(

Number(

e.target.value

)

)

}

style={styles.input}

>

{

amountList.map(v=>(

<option

key={v}

value={v}

>

{

v===0

?

'なし'

:

`${v}オフ`

}

</option>

))

}

</select>

<label>

交通費

</label>

<select

value={traffic}

onChange={(e)=>

setTraffic(

Number(

e.target.value

)

)

}

style={styles.input}

>

{

amountList

.filter(v=>v>0)

.map(v=>(

<option

key={v}

value={v}

>

{v}

</option>

))

}

</select>

<label>

電話番号

</label>

<input

value={phone}

onChange={(e)=>

setPhone(

e.target.value

)

}

style={styles.input}

/>

<button

onClick={copyLine}

style={styles.button}

>

LINEコピー

</button>

<h2>

履歴

</h2>

<div style={styles.history}>

{

history.map((item,index)=>(

<pre

key={index}

style={styles.historyItem}

>

{item}

</pre>

))

}

</div>

</main>

)

}

const styles={

page:{

padding:'40px',

background:'#111',

minHeight:'100vh',

color:'white'

},

input:{

display:'block',

width:'420px',

padding:'12px',

marginBottom:'16px',

background:'#1f1f1f',

border:'1px solid #444',

borderRadius:'8px',

color:'white',

fontSize:'15px'

},

optionWrap:{

display:'grid',

gridTemplateColumns:

'repeat(auto-fill,minmax(220px,1fr))',

gap:'10px',

marginBottom:'20px'

},

checkBox:{

background:'#1f1f1f',

padding:'10px',

borderRadius:'8px',

border:'1px solid #333'

},

button:{

padding:'14px',

width:'420px',

background:'#7c3aed',

border:'none',

borderRadius:'8px',

fontSize:'16px',

fontWeight:'bold',

color:'white',

cursor:'pointer',

marginTop:'20px'

},

total:{

fontSize:'36px',

fontWeight:'bold',

marginBottom:'20px'

},

map:{

display:'inline-block',

padding:'12px',

background:'#2563eb',

borderRadius:'8px',

marginBottom:'20px',

color:'white',

textDecoration:'none'

},

history:{

marginTop:'30px'

},

historyItem:{

background:'#1f1f1f',

padding:'15px',

borderRadius:'8px',

marginBottom:'10px',

whiteSpace:'pre-wrap'

}

}