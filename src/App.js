import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Faculty from './Faculty';
import Home from './Home';
import FacultyDetail from './FacultyDetail';
import FacultyOp from './FacultyOp';
import EditFaculty from './EditFaculty';


export default function App() {
  let api_url = "https://64e4c022c55563802913b710.mockapi.io/fac/";
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout api={api_url}/>} >
              <Route index element={<Home />} />
              <Route path='/faculty' element={<Faculty api={api_url} />} />
              <Route path='/faculty/:facID' element={<FacultyDetail api={api_url}/>} />
              <Route path='/addFaculty' element={<FacultyOp sendMethod={"POST"} api={api_url}/>} />
              <Route path='/edit/:id' element={<EditFaculty api={api_url}/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}