import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  startSample: null,
  sampleSent: null,
  setRoomId: null,
  clearRoomId: ['clear'],
})

export const SamplesTypes = Types
export default Creators
