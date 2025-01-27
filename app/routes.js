//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Route to capture and save the donor's name
router.post('/save-name', (req, res) => {
  // Save the donor's name and other names in session data
  req.session.data['donorFullName'] = req.body['donorFullName']
  req.session.data['donorOtherNames'] = req.body['donorOtherNames']

  // Redirect to the "Check your answers" page
  res.redirect('/check-answers')
})

// Route to capture and save the donor's date of birth
router.post('/save-dob', (req, res) => {
  const day = parseInt(req.body['dob-day'], 10)
  const month = parseInt(req.body['dob-month'], 10)
  const year = parseInt(req.body['dob-year'], 10)
  const currentYear = new Date().getFullYear()
  const age = currentYear - year

  // Save the date of birth in session data
  req.session.data['dob-day'] = req.body['dob-day']
  req.session.data['dob-month'] = req.body['dob-month']
  req.session.data['dob-year'] = req.body['dob-year']

  // Check eligibility: redirect to "not-eligible" if under 18, otherwise go to name page
  if (age < 18 || (age === 18 && new Date().getMonth() < month - 1) || (age === 18 && new Date().getMonth() === month - 1 && new Date().getDate() < day)) {
    res.redirect('/not-eligible')
  } else {
    res.redirect('/name')
  }
})

// Route to display the "Check answers" page
router.get('/check-answers', (req, res) => {
  res.render('check-answers')
})

// Example: Route for the "not-eligible" page
router.get('/not-eligible', (req, res) => {
  res.render('not-eligible')
})

// Example: Route for the "name" page
router.get('/name', (req, res) => {
  res.render('name')
})

// Example: Route for the "address" page
router.get('/address', (req, res) => {
  res.render('address')
})

// Example: Route for the "task-list" page
router.get('/task-list', (req, res) => {
  res.render('task-list')
})

module.exports = router
