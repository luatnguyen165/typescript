from fastapi import FastAPI,HTTPException,Form
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title='Todo App') 

class Todo(BaseModel):
    name: str
    due_date:str 
    description: str


store_todo = []
# create delete update
@app.get('/')
async def Home(): 
    return {"Home"}

@app.post("/todo/")
async def create_todo(todo:Todo):
    store_todo.append(todo)
    return todo
@app.get('/todo/',response_model=List[Todo])
async def get_todo():
    return store_todo
@app.get('/todo/{id}')
async def get_todo_by_id(id:int):
    try:
        return store_todo[id]
    except:
        raise HTTPException(status=404, description="Todo not found")
@app.put('/todo/{id}')
async def update_todo(id:int,todo:Todo):
    try:
        store_todo[id]=todo
        return store_todo[id]
    except:
        raise HTTPException(status=404, description="update not found")
@app.delete('/todo/{id}')
async def delete_todo(id:int):
    try:
        return store_todo.pop(id)
    except:
         raise HTTPException(status=404, description="delete todo not found")

@app.post('/languages/')
async def languages(name:str =Form(...),type:str =Form(...)):
    return {'name':name, 'type':type}

