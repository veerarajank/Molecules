import "./Card.css"
import { useState, useEffect } from "react";
import { useFetch } from "../components/useFetch";
export default function Card ({id}) {
    const [values,setValues] = useState({})
    const { data } = useFetch(`http://localhost:8000/molecules/${id}`)
    useEffect(() => {
        if (data!=null) {
            setValues(data)
        }
    },[data])
    return (
        <div className="Card">
            {values.length>0 
            ? (
                <>
                    <div>
                        <div>Molecule Id : {values[0]["id"]}</div>
                        <div>Molecule Name : {values[0]["name"]}</div>
                    </div>
                    <div>
                        <div>Max Phase : {values[0]["max_phase"]}</div>
                        <div>Structure : {values[0]["structure"]}</div>
                    </div>
                    <div>Inchi Key : {values[0]["inchi_key"]}</div>
                </>
            ) :""}
        </div>
    )
}