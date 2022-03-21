import { useEffect, useState } from "react";
import Table from "../components/Table";
import { useFetch } from "../components/useFetch";
const COLUMNS=[
    "id",
    "name",
    "max_phase",
    "structure",
    "inchi_key"
] 

export default function Molecules () {
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [values,setValues] = useState({})
    const { data } = useFetch("http://localhost:8000/molecules?records_per_page="+perPage+"&page_no="+page);
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
            ? ( <div>
                    Molecules List View
                    <div style={{"paddingTop":"10px"}}>
                        Records Per Page
                        <select onChange={(e) => setPerPage(e.target.value)}>
                            {recordsIndex.map((number,index) => (
                                <option key={index} value={number}>{number}</option>
                            ))}
                        </select>
                        <Table values={values} columns={COLUMNS} currentPage={page} PreviousPage={PreviousPage} NextPage={NextPage} setParticularPage={setParticularPage} TotalPages={totalPages(values.total)} path={"/activities"} />
                    </div>
                </div>  )
            :""}
        </div> 
    )
    
}

