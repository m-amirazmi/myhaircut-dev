import * as Yup from 'yup'
import { useHistory } from 'react-router'
import FormAuth from '../ui/FormAuth'
import { useAuth } from '../../contexts/AuthContext'
import { useDBUser } from '../../contexts/DBUserContext'

export default function Auth() {

  const { location, push } = useHistory()
  const { register, login } = useAuth()
  const { saveUser } = useDBUser()

  const userRegister = async (values, { setSubmitting }) => {
    setSubmitting(true)

    const userType = location.pathname.split('/')[1]
    const users = { ...values }
    delete users.confirmPassword
    delete users.password
    users.timestampCreated = new Date().getTime()
    users.timestampUpdated = new Date().getTime()

    let redirect
    if (userType === 'customer') {
      users.role = 'customer'
      redirect = '/customer/home'
    }
    if (userType === 'barber') {
      users.role = 'barber'
      redirect = '/barber/dashboard'
    }

    try {
      const { user } = await register(values.email, values.password)
      users.uid = user.uid
      await saveUser('set', 'users', users)
    } catch (error) {
      console.log('DB Customer Register', error)
    }
    push(redirect)
    setSubmitting(false)
  }

  const userLogin = async (values, { setSubmitting }) => {
    setSubmitting(true)

    const userType = location.pathname.split('/')[1]
    let redirect
    if (userType === 'customer') redirect = '/customer/home'
    if (userType === 'barber') redirect = '/barber/dashboard'
    if (userType === 'admin') redirect = '/admin/dashboard'

    try {
      await login(values.email, values.password)
    } catch (error) {
      console.log(error)
    }
    push(redirect)
    setSubmitting(false)
  }

  const renderForm = () => {
    const userType = location.pathname.split('/')[1]
    const authType = location.pathname.split('/')[2]

    // LOGIN
    if (authType === 'login' && (userType === 'customer' || userType === 'barber' || userType === 'admin')) {
      const head = {}
      const foot = {}
      const submit = {}
      const forms = {
        initialValues: { email: '', password: '' },
        lists: [
          { label: 'Email', name: 'email', type: 'email', placeholder: 'janedoe@email.com' },
          { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' }
        ]
      }

      const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
      })

      const login = {
        customer: {
          headPage: 'Login',
          headText: 'Welcome back! Let\'s get your hair done today.',
          footText: 'Don\'t have an account yet?',
          footPath: '/customer/register',
          footPathname: 'REGISTER HERE',
          submitBtnText: 'Login',
          submitHandleSubmit: userLogin,
        },
        barber: {
          headPage: 'Barber Login',
          headText: 'Welcome back! Let\'s make money by cutting people\'s hair now.',
          footText: 'Don\'t have an account yet?',
          footPath: '/barber/register',
          footPathname: 'REGISTER HERE',
          submitBtnText: 'Login',
          submitHandleSubmit: userLogin,
          color: '__secondary'
        },
        admin: {
          headPage: 'Admin Login',
          headText: 'Welcome back!',
          footText: '',
          footPath: '',
          footPathname: '',
          submitBtnText: 'Login',
          submitHandleSubmit: userLogin,
        }
      }

      head.page = login[userType].headPage
      head.text = login[userType].headText
      foot.text = login[userType].footText
      foot.path = login[userType].footPath
      foot.pathname = login[userType].footPathname
      submit.btnText = login[userType].submitBtnText
      submit.handleSubmit = login[userType].submitHandleSubmit

      return <FormAuth head={head} foot={foot} forms={forms} validations={validationSchema} submit={submit} color={login[userType].color} />
    }

    if (authType === 'register' && (userType === 'customer' || userType === 'barber')) {
      const head = {}
      const foot = {}
      const submit = {
        btnText: 'Register',
        handleSubmit: userRegister,
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

      const register = {
        customer: {
          headPage: 'Register',
          headText: 'Join us and set an appointment with our barber to get your hair cut.',
          footText: 'Already have an account?',
          footPath: '/customer/login',
          footPathname: 'LOGIN HERE',
        },
        barber: {
          headPage: 'Barber Register',
          headText: 'Register as a barber and make money by cutting people\'s hair.',
          footText: 'Already have an account?',
          footPath: '/barber/login',
          footPathname: 'LOGIN HERE',
          color: '__secondary'
        },
      }

      head.page = register[userType].headPage
      head.text = register[userType].headText
      foot.text = register[userType].footText
      foot.path = register[userType].footPath
      foot.pathname = register[userType].footPathname

      return <FormAuth head={head} foot={foot} forms={forms} validations={validationSchema} submit={submit} color={register[userType].color} />
    }
  }
  return renderForm()
}
