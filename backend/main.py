import string
from fastapi import FastAPI
import sqlite3
from fastapi.middleware.cors import CORSMiddleware
app=FastAPI()
db_string="/code/database.db"
origins = [
    "http://localhost:8000",
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def access_data(sql_query):
    conn_db = sqlite3.connect(db_string)
    cursor_obj=conn_db.execute(sql_query)
    headers=([member[0] for member in cursor_obj.description])
    ret_arr=[]
    for row in cursor_obj:
        json_row={}
        for idx_val in range(len(headers)):
            json_row[headers[idx_val]]=row[idx_val]
        ret_arr.append(json_row)
    conn_db.close()
    return ret_arr
def access_count(sql_query):
    conn_db = sqlite3.connect(db_string)
    cursor_obj=conn_db.execute(sql_query)
    row = cursor_obj.fetchone()
    conn_db.close()
    return row[0]

# Retrieve a single molecule (using molecule id)
@app.get("/molecules/{molecule_id}")
async def molecule_by_id(molecule_id:int=0):
    return access_data("SELECT * FROM molecule WHERE id="+str(molecule_id))

# Retrieve all the molecules, paginated
@app.get("/molecules")
async def all_molecules(records_per_page:int=0,page_no:int=0):
    offset=(records_per_page*page_no)-records_per_page
    return {
        "data":access_data("SELECT * FROM molecule LIMIT "+str(offset)+","+str(records_per_page)),
        "total":access_count("SELECT count(*) As count FROM molecule")
    }

# Retrieve all the activities for a molecule, paginated
@app.get("/activities")
async def all_molecules(molecule_id:int,records_per_page:int=0,page_no:int=0):
    offset=(records_per_page*page_no)-records_per_page
    return {
        "data":access_data("SELECT A.id,A.type,A.units,A.value,A.relation,A.target_id,B.name,B.organism FROM activity A, target B WHERE A.target_id=B.id AND A.molecule_id="+str(molecule_id)+" LIMIT "+str(offset)+","+str(records_per_page)),
        "total":access_count("SELECT count(*) As count FROM activity WHERE molecule_id="+str(molecule_id))
    }