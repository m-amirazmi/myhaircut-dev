import { useField } from 'formik'

export default function TextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className='mb-3'>
      <div>
        <label className='form-label' htmlFor={props.id || props.name}>{label}</label>
      </div>
      <div>
        <input className='text-input form-control __rounded-8' {...field} {...props} />
      </div>
      {meta.touched && meta.error && <div className='error alert alert-danger my-2 py-1 __rounded-8' role='alert'>{meta.error}</div>}
    </div>
  )
}
