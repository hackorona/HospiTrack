import { createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
  startSample: null,
  stopSample: null,
  sampleSent: null,
  setRoomId: ['id'],
  clearRoomId: null,
})

export const SamplesTypes = Types
export default Creators
