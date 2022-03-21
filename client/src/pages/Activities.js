import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import Table from "../components/Table";
import { useState, useEffect } from "react";
import { useFetch } from "../components/useFetch";
const COLUMNS=[
    "id",
    "type",
    "units",
    "value",
    "relation",
    "target_id",
    "name",
    "organism"
] 
export default function Activities () {
    const location = useLocation();
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [values,setValues] = useState({})
    const { data } = useFetch(`http://localhost:8000/activities?molecule_id=${location.state.id}&records_per_page=${perPage}&page_no=${page}`);
    useEffect(() => {
        if (data!=null) {
            setValues(data)
        }
    },[data])
    const NextPage = () => {
        setPage((currentPage) => currentPage+1)
    }
    const PreviousPage = () => {
        setPage((currentPage) => currentPage-1)
    }
    const setParticularPage = (e) => {
        setPage(e.target.value)
    }
    const recordsIndex=[10,15,20,25,30,35,40,45,50]
    const totalPages = (totalRecords) => {
        let retPages=totalRecords/perPage;
        let floatPart=retPages-Math.trunc(retPages)
        if (floatPart>0) retPages=Math.trunc(retPages)+1
        return retPages;
    }
    return (
        <div>
            {(values && values.data && values.data.length>0)
            ? ( 
                <>
                <div style={{"paddingTop":"20px"}}>
                    Molecule Details
                    <Card id={location.state.id} />
                </div>
                <div style={{"paddingTop":"20px"}}>
                    Activities List View
                    <div style={{"paddingTop":"10px"}}>
                        Records Per Page
                        <select onChange={(e) => setPerPage(e.target.value)}>
                            {recordsIndex.map((number,index) => (
                                <option key={index} value={number}>{number}</option>
                            ))}
                        </select>
                        <Table values={values} columns={COLUMNS} currentPage={page} PreviousPage={PreviousPage} NextPage={NextPage} setParticularPage={setParticularPage} TotalPages={totalPages(values.total)} path={""} />
                    </div>
                </div> </> )
            :""}
        </div> 
    )
}

