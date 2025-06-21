import axios from "axios"
import { useEffect, useState } from "react";

function App() {

  const [product,setProduct] = useState([]);
  const [page,setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const responce = await axios.get('https://dummyjson.com/products?limit=100');
      setProduct(responce.data.products);
    } catch (error) {
      console.log("Error in fetchProducts",error.message);
    }
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  return (
    <div className="bg-black text-white h-screen px-20 py-10">
      <div>
        <div className="grid grid-flow-row grid-cols-3 gap-x-10 gap-y-10">
          {product.slice(page*10-10,page*10).map((item)=>(
            <span key={item.id} className="bg-gray-900 flex justify-center items-center p-4">
              {/* <img src={item.images[0]} alt="" /> */}
              <p className="font-bold text-xl">{item.title}</p>
            </span>
          ))}
        </div>
        <div className="bg-red-900 mt-20 flex gap-10 items-center justify-center">
          <span onClick={(()=>setPage((prev)=>(prev==1 ? prev : prev-1 )))} className={`p-3 border-3 ${page==1 ? 'invisible' : ''}`}>⬅️</span>
          {[...Array(product.length/10)].map((_,i)=>(
            <span onClick={(()=>setPage(i+1))} className=" px-6 py-3 border-4">{i+1}</span>
          ))}
          <span onClick={(()=>setPage((prev)=>(prev==10 ? prev : prev+1 )))} className={`p-3 border-3 ${page==10 ? 'invisible' : ''}`}>➡️</span>
        </div>
      </div>
    </div>
  )
}

export default App