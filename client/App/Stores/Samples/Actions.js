import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  sampleSent: null,
})

export const SamplesTypes = Types
export default Creators
