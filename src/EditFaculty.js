import { useParams } from "react-router-dom";
import FacultyOp from "./FacultyOp";
export default function EditFaculty({api}){
    const param = useParams();
    return <FacultyOp  sendMethod="PUT" param={param.id} api={api}/>
}