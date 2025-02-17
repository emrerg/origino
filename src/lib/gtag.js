export const GA_MEASUREMENT_ID = 'G-P37CMSXQY6' // Replace with your actual Measurement ID from GA4

// Log the page view
export const pageview = (url) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  })
}

// Log specific events
export const event = ({ action, category, label, value }) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
} 