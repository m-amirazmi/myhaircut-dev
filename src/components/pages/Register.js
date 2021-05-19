import * as Yup from 'yup'
import FormAuth from '../ui/FormAuth'

export default function Register() {

  const register = (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2))
    setSubmitting(true)
  }

  const renderRegisterForm = () => {
    const head = {
      page: 'Register',
      text: 'Join us and set an appointment with our barber to get your hair cut.'
    }

    const foot = {
      text: 'Already have an account?',
      path: '/login',
      pathname: 'LOGIN HERE'
    }

    const forms = {
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      lists: [
        { label: 'First Name', name: 'firstName', type: 'text', placeholder: 'Jane' },
        { label: 'Last Name', name: 'lastName', type: 'text', placeholder: 'Doe' },
        { label: 'Email', name: 'email', type: 'email', placeholder: 'janedoe@email.com' },
        { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' },
        { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Re enter same password' },
      ]
    }

    const validationSchema = Yup.object({
      firstName: Yup.string().max(15, 'Must be 15 characters or less').required('First name is required'),
      lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
    })

    const submit = {
      btnText: 'Register',
      handleSubmit: register
    }

    return <FormAuth head={head} foot={foot} forms={forms} validations={validationSchema} submit={submit} />
  }

  return renderRegisterForm()
}
