from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ Middleware CORS biar bisa dipanggil dari Next.js (port 3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # kalau mau lebih aman ganti ke ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Model untuk item
class Item(BaseModel):
    name: str
    price: float

# Simpan data sementara di memory
items = []
item_id_counter = 1


@app.get("/")
async def root():
    return {"message": "Hello from FastAPI im here🚀"}


@app.post("/items/")
async def create_item(item: Item):
    global item_id_counter
    new_item = {"id": item_id_counter, "name": item.name, "price": item.price}
    items.append(new_item)
    item_id_counter += 1
    return new_item


@app.get("/items/")
async def get_items():
    return items
