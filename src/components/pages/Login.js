import * as Yup from 'yup'
import FormAuth from '../ui/FormAuth'

export default function Login() {
  const login = (values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2))
    setSubmitting(true)
  }

  const renderLoginForm = () => {
    const head = {
      page: 'Login',
      text: 'Welcome back! Let\'s get your hair done today.'
    }

    const foot = {
      text: 'Don\'t have an account yet?',
      path: '/register',
      pathname: 'REGISTER HERE'
    }

    const forms = {
      initialValues: {
        email: '',
        password: ''
      },
      lists: [
        { label: 'Email', name: 'email', type: 'email', placeholder: 'janedoe@email.com' },
        { label: 'Password', name: 'password', type: 'password', placeholder: 'Enter your password' }
      ]
    }

    const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required')
    })

    const submit = {
      btnText: 'Login',
      handleSubmit: login
    }

    return <FormAuth head={head} foot={foot} forms={forms} validations={validationSchema} submit={submit} />
  }

  return renderLoginForm()
}
