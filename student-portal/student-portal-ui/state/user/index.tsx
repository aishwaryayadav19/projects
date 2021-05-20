import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get } from '../../libs/requests'
import { IUserState } from './interfaces'

const initialState: IUserState = {
  email: '',
  isAdmin: true
}

export const getUserDetails = createAsyncThunk(
  'userStore/getUserDetails',
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await get(`/api/user/details?email=${email}`)
      return data
    } catch (err) {
      const { response } = err
      if (!response) {
        throw err
      }
      return rejectWithValue(response.data)
    }
  }
)

const UserStore = createSlice({
  name: 'userStore',
  initialState,

  reducers: {
    setEmail: (state, { payload }) => {
      state.email = payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
      const {
        data: { isAdmin }
      } = payload
      state.isAdmin = Boolean(isAdmin)
    })

    builder.addCase(getUserDetails.rejected, (state, action) => {
      console.error('getUserDetails ERROR', action)
    })
  }
})

export const { setEmail } = UserStore.actions
export default UserStore.reducer
