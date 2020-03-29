import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  startSample: null,
  sampleSent: null,
})

export const SamplesTypes = Types
export default Creators
