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

// Add these events to your existing gtag.js file
export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventData);
  }
};

export const events = {
  landed: () => trackEvent('landed'),
  pickedAccordionExpanded: () => trackEvent('picked_accordion_expanded'),
  pickedAccordionClosed: () => trackEvent('picked_accordion_closed'),
  pickedLocationClicked: () => trackEvent('picked_location_clicked'),
  pickedStoriesClicked: () => trackEvent('picked_stories_clicked'),
  pickedStoriesClosed: () => trackEvent('picked_stories_closed'),
  pressedAccordionExpanded: () => trackEvent('pressed_accordion_expanded'),
  pressedAccordionClosed: () => trackEvent('pressed_accordion_closed'),
  pressedLocationClicked: () => trackEvent('pressed_location_clicked'),
  pressedStoriesClicked: () => trackEvent('pressed_stories_clicked'),
  pressedStoriesClosed: () => trackEvent('pressed_stories_closed'),
  packedAccordionExpanded: () => trackEvent('packed_accordion_expanded'),
  packedAccordionClosed: () => trackEvent('packed_accordion_closed'),
  packedLocationClicked: () => trackEvent('packed_location_clicked'),
  testingQualitySectionSeen: () => trackEvent('testing_quality_section_seen'),
  testResultsClicked: () => trackEvent('test_results_clicked'),
  testResultsClosed: () => trackEvent('test_results_closed'),
  freeAcidityAccordionExpanded: () => trackEvent('free_acidity_accordion_expanded'),
  freeAcidityAccordionClosed: () => trackEvent('free_acidity_accordion_closed'),
  polyphenolsAccordionExpanded: () => trackEvent('polyphenols_accordion_expanded'),
  polyphenolsAccordionClosed: () => trackEvent('polyphenols_accordion_closed'),
  storageTipsClicked: () => trackEvent('storage_tips_clicked'),
  storageTipsClosed: () => trackEvent('storage_tips_closed'),
  reserveClicked: () => trackEvent('reserve_clicked'),
  buyClicked: () => trackEvent('buy_clicked')
}; 