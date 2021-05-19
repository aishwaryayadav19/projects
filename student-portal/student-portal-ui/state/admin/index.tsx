import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit'
import { get, post, put } from '../../libs/requests'
import { IStudentState } from './interfaces'

const initialState: IStudentState = {
  studentsList: [],
  classesList: []
}

export const getClassList = createAsyncThunk('adminStore/getClassList', async (_, { rejectWithValue }) => {
  try {
    const { data } = await get('/api/students/classList')
    return data
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response.data)
  }
})

export const getStudentList = createAsyncThunk(
  'adminStore/getStudentList',
  async (schoolClass: number, { rejectWithValue }) => {
    try {
      const { data } = await get(`/api/students/list?schoolClass=${schoolClass}`)
      console.log('data=', data)
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

export const addStudent = createAsyncThunk('adminStore/addStudent', async (newData: any, { rejectWithValue }) => {
  try {
    const { data } = await post('/api/students/add', newData)
    return { ...newData, id: data.data.id }
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response.data)
  }
})

export const editStudent = createAsyncThunk('adminStore/editStudent', async (newData: any, { rejectWithValue }) => {
  try {
    const { data } = await put('/api/students/edit', newData)
    return newData
  } catch (err) {
    const { response } = err
    if (!response) {
      throw err
    }
    return rejectWithValue(response.data)
  }
})

const AdminStore = createSlice({
  name: 'adminStore',
  initialState,

  reducers: {
    testAction: (state, { payload }) => {}
  },

  extraReducers: (builder) => {
    builder.addCase(getClassList.fulfilled, (state, { payload }) => {
      const { data } = payload
      state.classesList = data
    })

    builder.addCase(getClassList.rejected, (state, action) => {
      console.error('getClassList ERROR', action)
    })

    builder.addCase(getStudentList.fulfilled, (state, { payload }) => {
      const { data } = payload
      state.studentsList = data
    })

    builder.addCase(getStudentList.rejected, (state, action) => {
      console.error('getStudentList ERROR', action)
    })

    builder.addCase(addStudent.fulfilled, (state, { payload }) => {
      state.studentsList = [...state.studentsList, payload]
    })

    builder.addCase(addStudent.rejected, (state, action) => {
      console.error('addStudent ERROR', action)
    })

    builder.addCase(editStudent.fulfilled, (state, { payload }) => {
      state.studentsList = current(state).studentsList.map((row, index) => {
        if (row.id === payload.id) {
          return payload
        } else {
          return row
        }
      })
    })

    builder.addCase(editStudent.rejected, (state, action) => {
      console.error('editStudent ERROR', action)
    })
  }
})

export const { testAction } = AdminStore.actions

export default AdminStore.reducer
