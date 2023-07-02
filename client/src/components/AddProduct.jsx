import React from 'react';
// import axios from 'axios';
const AddProduct = (props) => {
  // const [data, setData] = useState([]);
   const handleSubmit = (e) => {
        e.preventDefault();
      
        const {brand, name, img, stock, topCategory, subCategory, price} = e.target;
        const product = {brand: brand.value, productName: name.value, productImg: img.value, stock: stock.value, topCategory: topCategory.value, subCategory: subCategory.value, price: price.value};
        props.addItem(product); 
   }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            marka: <input type="text" name="brand"/>
            ürün ismi: <input type="text" name="name"/>
            resim: <input type="text" name="img"/>
            stok: <input type="text" name="stock"/>
            üst kategori: <input type="text" name="topCategory"/>
            alt kategori: <input type="text" name="subCategory"/>
            fiyat: <input type="number" name="price"/>
            <button type="submit">Ekle</button>
        </form>
    </div>
  )
}

export default AddProduct