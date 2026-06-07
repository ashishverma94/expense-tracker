import { useState, ChangeEvent } from 'react'

export function useFormField(initial = '') {
  const [value, setValue] = useState(initial)
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  const reset = () => setValue(initial)
  return { value, onChange, reset }
}
