export const suggestions = [
  { icon: 'TrendingUp', title: 'Customer performance', prompt: 'Show me the top 10 customers by sales volume this month.' },
  { icon: 'AlertCircle', title: 'Overdue invoices', prompt: 'Which customers have the highest overdue invoices?' },
  { icon: 'Activity', title: 'Customer prioritization', prompt: 'Which customers should our sales team prioritize and why?' },
  { icon: 'ArrowUpRight', title: 'Visit opportunities', prompt: 'Show high-priority customers who have not been visited recently.' },
]

export const initialHistory = [
  { id: 1, title: 'Overdue customer summary', time: 'Today' },
  { id: 2, title: 'Poultry sales performance', time: 'Yesterday' },
  { id: 3, title: 'Customer prioritization', time: 'Yesterday' },
]

export const demoReply = {
  intro: 'Here is a sample overview based on the demo response. The live figures will be provided by the ECV AI Agent once the API is connected.',
  metrics: [
    { label: 'Customers with overdue', value: '128', tone: 'warning' },
    { label: 'Total overdue amount', value: 'IDR 2.45B', tone: 'default' },
    { label: 'Critical accounts', value: '24', tone: 'danger' },
  ],
  rows: [
    { customer: 'PT Sumber Pangan', business: 'Poultry', overdue: 'IDR 245.5M', aging: '76 days', status: 'Critical' },
    { customer: 'CV Mitra Ternak', business: 'Poultry', overdue: 'IDR 182.0M', aging: '48 days', status: 'High' },
    { customer: 'PT Aqua Sejahtera', business: 'Fish', overdue: 'IDR 96.8M', aging: '35 days', status: 'High' },
  ],
}
