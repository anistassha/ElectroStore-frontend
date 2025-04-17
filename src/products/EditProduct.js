import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {

    let navigate = useNavigate()

    const { id } = useParams()

    const [product, setProduct] = useState({
        productName: "",
        productCategory: "",
        manufacturer: "",
        price: "",
        stockQuantity: ""
    })

    const { productName, productCategory, manufacturer, price, stockQuantity } = product

    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:8080/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setProduct({ ...product, image: response.data }); // Сохраняем URL загруженного файла
        } catch (error) {
            console.error("Ошибка загрузки файла", error);
        }
    };

    useEffect(() => {
        const loadProduct = async () => {
            const result = await axios.get(`http://localhost:8080/product/${id}`);
            setProduct(result.data);
        };

        loadProduct();
    }, [id]);


    // useEffect(() => {
    //     loadProduct();
    // }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/product/${id}`, product)
        navigate("/")
    };

    // const loadProduct = async () => {
    //     const result = await axios.get(`http://localhost:8080/product/${id}`);
    //     setProduct(result.data);
    // }

    return <div className='container'>
        <div className='row'>
            <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Изменение товара</h2>

                <form onSubmit={(e) => onSubmit(e)}>

                    <div className='mb-3'>
                        <label htmlFor='image' className='form-label'>Загрузить изображение</label>
                        <input type="file" className='form-control' onChange={onFileChange} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='productName' className='form-label'>
                            Название
                        </label>
                        <input type={'text'} className='form-control' placeholder='Введите название товара' name='productName' value={productName} onChange={(e) => onInputChange(e)} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='productCategory' className='form-label'>
                            Категория
                        </label>
                        <input type={'text'} className='form-control' placeholder='Введите категорию товара' name='productCategory' value={productCategory} onChange={(e) => onInputChange(e)} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='manufacturer' className='form-label'>
                            Производитель
                        </label>
                        <input type={'text'} className='form-control' placeholder='Введите производителя товара' name='manufacturer' value={manufacturer} onChange={(e) => onInputChange(e)} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='price' className='form-label'>
                            Цена
                        </label>
                        <input type={'text'} className='form-control' placeholder='Введите цену товара' name='price' value={price} onChange={(e) => onInputChange(e)} />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='stockQuantity' className='form-label'>
                            Количество
                        </label>
                        <input type={'text'} className='form-control' placeholder='Введите остаток товара на складе' name='stockQuantity' value={stockQuantity} onChange={(e) => onInputChange(e)} />
                    </div>

                    <button type='submit' className="btn btn-outline-primary">Сохранить</button>
                    <Link className="btn btn-outline-danger mx-2" to="/">Назад</Link>

                </form>
            </div>
        </div>
    </div>;

}
