import { supabase } from '@/lib/supabase'

export default async function TimelinePage() {
  const { data: reservations } = await supabase
    .from('reservations')
    .select('*')
    .order('start_time', { ascending: true })

  const hours = ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']

  return (
    <main style={mainStyle}>
      <h1>稼働状況タイムチャート</h1>

      <div style={timelineStyle}>
        <div style={headerStyle}>
          <div style={castHeaderStyle}>キャスト</div>
          {hours.map((hour) => (
            <div key={hour} style={hourStyle}>{hour}</div>
          ))}
        </div>

        {reservations?.map((r) => (
          <div key={r.id} style={rowStyle}>
            <div style={castNameStyle}>{r.cast_name}</div>

            <div style={barAreaStyle}>
              <div style={{
                ...barStyle,
                background: getStatusColor(r.status),
                width: '220px',
              }}>
                <strong>{r.cast_name}</strong><br />
                {r.course_minutes}分 / {r.hotel_name || '-'}<br />
                {r.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

function getStatusColor(status: string) {
  if (status === '接客中') return '#ef4444'
  if (status === '終了') return '#6b7280'
  if (status === 'キャンセル') return '#111827'
  return '#22c55e'
}

const mainStyle = {
  padding: 40,
  background: '#111',
  color: 'white',
  minHeight: '100vh',
}

const timelineStyle = {
  width: '100%',
  overflowX: 'auto' as const,
  background: '#1a1a1a',
  borderRadius: 8,
  padding: 16,
}

const headerStyle = {
  display: 'flex',
  borderBottom: '1px solid #333',
  paddingBottom: 8,
  marginBottom: 8,
}

const castHeaderStyle = {
  width: 160,
  fontWeight: 'bold',
}

const hourStyle = {
  width: 120,
  textAlign: 'center' as const,
  color: '#aaa',
}

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  minHeight: 70,
  borderBottom: '1px solid #333',
}

const castNameStyle = {
  width: 160,
  fontWeight: 'bold',
}

const barAreaStyle = {
  flex: 1,
  position: 'relative' as const,
}

const barStyle = {
  padding: 10,
  borderRadius: 8,
  color: 'white',
  fontSize: 14,
}