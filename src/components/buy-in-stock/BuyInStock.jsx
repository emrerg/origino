import { event } from '@/lib/gtag'

const handlePurchaseClick = () => {
  event({
    action: 'begin_checkout',
    category: 'ecommerce',
    label: 'olive_oil_purchase'
  })
} 