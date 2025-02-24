const testScenarios = [
  {
    component: 'Stories',
    tests: [
      'Tab to open button',
      'Navigate stories with arrows',
      'Check VoiceOver announcements',
      'Test Esc to close',
      'Verify focus management'
    ]
  },
  {
    component: 'OliveStats',
    tests: [
      'Tab through sections',
      'Expand/collapse with Enter',
      'Check ARIA attributes',
      'Verify data announcements'
    ]
  },
  {
    component: 'PDF Viewer',
    tests: [
      'Open modal with keyboard',
      'Check focus trap',
      'Test Esc to close',
      'Verify PDF navigation'
    ]
  }
]

console.log('Accessibility Test Checklist:')

testScenarios.forEach(({ component, tests }) => {
  console.log(`\n${component}:`)
  tests.forEach((test, index) => {
    console.log(`${index + 1}. [ ] ${test}`)
  })
}) 