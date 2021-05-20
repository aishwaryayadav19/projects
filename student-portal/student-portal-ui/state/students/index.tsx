import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post } from '../../libs/requests'
import { IStudentState } from './interfaces'

const initialState: IStudentState = {
  details: {
    id: 0,
    fullName: '',
    gender: '',
    schoolClass: '',
    dateOfBirth: '',
    street: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    email: '',
    contactNumber: ''
  },
  documentDetails: {
    file: '',
    number: ''
  }
}

export const getStudentDetails = createAsyncThunk(
  'studentsStore/getStudentDetails',
  async (email: string, { rejectWithValue }) => {
    try {
      const { data } = await get(`/api/students/info?email=${email}`)
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

export const uploadDocument = createAsyncThunk(
  'studentsStore/uploadDocument',
  async (documentDetails: any, { rejectWithValue }) => {
    try {
      const { data } = await post(`/api/students/document`, documentDetails)
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

const StudentsStore = createSlice({
  name: 'studentsStore',
  initialState,

  reducers: {
    setDocumentNumber: (state, { payload }) => {
      state.documentDetails.number = payload
    },
    setDocumentFile: (state, { payload }) => {
      state.documentDetails.file = payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getStudentDetails.fulfilled, (state, { payload }) => {
      const { data } = payload
      state.details = data
    })

    builder.addCase(getStudentDetails.rejected, (state, action) => {
      console.error('getStudentDetails ERROR', action)
    })

    builder.addCase(uploadDocument.fulfilled, (state, { payload }) => {
      alert('Document added!')
    })

    builder.addCase(uploadDocument.rejected, (state, action) => {
      console.error('uploadDocument ERROR', action)
    })
  }
})

export const { setDocumentNumber, setDocumentFile } = StudentsStore.actions

export default StudentsStore.reducer
