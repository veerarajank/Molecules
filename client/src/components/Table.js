import "./Table.css"
import  { useNavigate }  from "react-router-dom"
export default function Table ({columns,values,currentPage,PreviousPage,NextPage,setParticularPage,TotalPages,path}) {
    const navigate=useNavigate();
    return (
        <div className="display">
            <table>  
                <thead style={{"backgroundColor":"grey"}}>  
                    <tr> 
                        {columns.map((columnName,index) => (
                            <th key={index}>{columnName}</th>
                        ))}
                    </tr>  
                </thead>  
                <tbody> 
                    {values.data.map((row,index) => (
                        (path.includes("/"))
                        ? (<tr key={index} onClick={()=>navigate(path, {state:{id:row["id"]}})}> 
                            {Object.keys(row).map((value,index1) => (
                                <td key={index1}>{row[value]}</td>
                            ))} 
                        </tr>)
                        : (<tr key={index}> 
                            {Object.keys(row).map((value,index1) => (
                                <td key={index1}>{row[value]}</td>
                            ))} 
                        </tr>) 
                    ))}            
                </tbody> 
            </table>  
            <div className="prevNext">
                <button disabled={(currentPage===1)?true:false} onClick={PreviousPage}>Prev</button>
                <span>Current Page # : {currentPage} </span>
                <div>
                    Go To Page : <input type="text" onBlur={setParticularPage} />
                </div>
                <button disabled={(currentPage===TotalPages)?true:false} onClick={NextPage}>Next</button>
            </div>
            
        </div>
    )
}
