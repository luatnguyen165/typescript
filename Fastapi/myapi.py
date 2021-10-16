from typing import Optional
from fastapi import FastAPI,Path
from typing import Optional
from pydantic import BaseModel
app = FastAPI()
students ={
    1:{
       "name":"Luat",
       "year":22,
       "email":"nluat134@gmail.com"
    }
}
class TestModelIN(BaseModel):
    secret_id:int
    name :str
    number:str
    description:Optional[str]=None
class TestModel(BaseModel):
    name :str
    number:str
    description:Optional[str]=None
@app.get('/')
def index():
    return {"name":"First Data"}
@app.get('/student/{student_id}')
def get_student(student_id:int =Path(None,description="The id of the student",gt=0,lt=3)):
    return students[student_id]

@app.get('/get-by-name')
def get_by_name(*,name:Optional[str] =None,test:int=None):
    for student_id in students:
        if(students[student_id]['name'] == name):
            return students[student_id]
    return {"DATA":"Data not found"}

@app.post("/pakage/{priority}",response_model=TestModel)
async def make_package(priority:int,pakage:TestModelIN,value:bool):
    return {'priority':priority, 'value':value,**pakage.dict()}


