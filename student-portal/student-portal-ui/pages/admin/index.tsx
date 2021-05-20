import React from 'react'
import { NextPage } from 'next'
import { IContext } from '../../state/interfaces'
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import MaterialTable, { Icons } from 'material-table'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { addStudent, editStudent, getStudentList } from '../../state/admin'
import { IStudentDetails } from '../../state/students/interfaces'
import {
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Search
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    height: '100%'
  },
  gridItem: {
    [theme.breakpoints.down('xs')]: {
      padding: '1rem'
    },
    textAlign: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

const TableIcons = {
  Add: React.forwardRef<any, any>((props, ref) => <AddBox {...props} ref={ref} />),
  Check: React.forwardRef<any, any>((props, ref) => <Check {...props} ref={ref} />),
  Clear: React.forwardRef<any, any>((props, ref) => <Clear {...props} ref={ref} />),
  Edit: React.forwardRef<any, any>((props, ref) => <Edit {...props} ref={ref} />),
  Filter: React.forwardRef<any, any>((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: React.forwardRef<any, any>((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: React.forwardRef<any, any>((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: React.forwardRef<any, any>((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: React.forwardRef<any, any>((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: React.forwardRef<any, any>((props, ref) => (
    <>
      <Typography variant='srOnly'>Reset search</Typography>
      <Clear {...props} ref={ref} />
    </>
  )),
  Search: React.forwardRef<any, any>((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: React.forwardRef<any, any>((props, ref) => <ArrowUpward {...props} ref={ref} />)
}

const Admin: NextPage = (props: any) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const {
    admin: { studentsList, classesList }
  } = useSelector<RootState, RootState>((state) => state)
  const [schoolClass, setSchoolClass] = React.useState()
  const studentsData = studentsList ? studentsList.map((row: IStudentDetails, index: number) => ({ ...row })) : null

  return (
    <>
      <Grid container justify='space-around' alignItems='center' style={{ height: '90vh' }}>
        <Grid item xs={11} sm={11} className={classes.gridItem}>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='demo-simple-select-outlined-label'>Class</InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              value={schoolClass}
              onChange={(e: any) => {
                console.log(e)
                setSchoolClass(e?.target?.value)
                dispatch(getStudentList(e?.target?.value))
              }}
              label='Class'
            >
              {classesList.map((schoolClass: number) => (
                <MenuItem key={schoolClass} value={schoolClass}>
                  {schoolClass}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={11} sm={11} className={classes.gridItem}>
          <MaterialTable
            data={studentsData}
            columns={[
              {
                title: 'ID',
                field: 'id',
                hidden: true
              },
              {
                title: 'Full Name',
                field: 'fullName'
              },
              { title: 'Gender', field: 'gender', lookup: { Male: 'Male', Female: 'Female' } },
              {
                title: 'Date of Birth',
                field: 'dateOfBirth'
              },
              {
                title: 'Email',
                field: 'email'
              },
              { title: 'Contact Number', field: 'contactNumber' },
              { title: 'Street', field: 'street' },
              { title: 'City', field: 'city' },
              { title: 'State', field: 'state' },
              { title: 'Country', field: 'country' },
              { title: 'Postal Code', field: 'postalCode' }
            ]}
            options={{
              draggable: false,
              search: true,
              sorting: true,
              headerStyle: {
                whiteSpace: 'nowrap'
              }
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    dispatch(addStudent({ ...newData, schoolClass }))
                    resolve(newData)
                  }, 1000)
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    dispatch(editStudent(newData))
                    resolve(newData)
                  }, 1000)
                })
            }}
            icons={TableIcons as Icons}
            title={'Students List'}
          />
        </Grid>
      </Grid>
    </>
  )
}

Admin.getInitialProps = async (ctx: IContext) => {
  const { store } = ctx
  return {}
}

export default Admin
