import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Form, Formik } from 'formik'
import TextInput from './TextInput'

export default function FormAuth({ head, foot, forms, validations, submit, color = '' }) {

  const renderHeader = () => (
    <>
      <div className='d-flex align-items-center __card-header'>
        <p className='__card-title'>My Haircut</p>
        <p className='ms-auto __card-subtitle'>{head.page}</p>
      </div>
      <div className='my-4'>
        <p className='text-center __text-small'>{head.text}</p>
      </div>
    </>
  )

  const renderFooter = () => (
    <>
      <div className='mt-4 d-flex'>
        <p className='ms-auto'>{foot.text} <Link to={foot.path} className={`fw-bolder ${color}`}>{foot.pathname}</Link></p>
      </div>
    </>
  )


  const renderForm = () => {
    const inputs = forms.lists.map((input) => <TextInput key={input.label} label={input.label} name={input.name} type={input.type} placeholder={input.placeholder} />)

    return (
      <Formik initialValues={forms.initialValues} validationSchema={validations} onSubmit={submit.handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            {inputs}
            <button disabled={isSubmitting} type='submit' className={`btn __rounded-8 __btn-primary ${color} w-100`}>{submit.btnText}</button>
          </Form>
        )}
      </Formik>
    )
  }

  return (
    <div className='d-flex container justify-content-center align-items-center vh-100'>
      <div className='card card-body border-0 shadow-sm __mw-500 __rounded-16'>
        {renderHeader()}
        {renderForm()}
        {renderFooter()}
      </div>
    </div>
  )
}

FormAuth.propTypes = {
  head: PropTypes.object.isRequired,
  foot: PropTypes.object.isRequired,
  forms: PropTypes.object.isRequired,
  validations: PropTypes.object.isRequired,
  submit: PropTypes.object.isRequired
}
