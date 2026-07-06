import EditCustomerForm from './EditCustomerForm'
import { supabase } from '@/lib/supabase'

export default async function CustomerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: customer } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single()

  if (!customer) {
    return <div>顧客が見つかりません</div>
  }

  return <EditCustomerForm customer={customer} />
}