import React, { useState } from 'react';
import '../../css/style.css';
import clip from '../../../../assets/img/clip.svg';
import { useMutation, useQuery } from 'react-query';
import { API } from '../../../../config/api';
import { useHistory, useParams } from 'react-router';
import swal from 'sweetalert';

const UpdateProduct = () => {
  const history = useHistory();
  const { id } = useParams();

  const [message, setMessage] = useState('');

  const { data: detailProduct } = useQuery('detailProductCache', async () => {
    const response = await API().get('/product/' + id);
    return response.data.product;
  });

  const [form, setForm] = useState({
    title: detailProduct?.title,
    price: detailProduct?.price,
    image: detailProduct?.image,
    status: 'available',
  });

  console.log(detailProduct?.price);

  const [fileUpload, setFileUpload] = useState(detailProduct?.image);

  const { title, price, image, status } = form;

  const handlerInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value,
    });

    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setFileUpload(url);
    }
  };

  const handlerChecked = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked === true ? 'not available' : 'available' });
  };

  const handlerSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set('title', title);
      formData.set('price', price);
      formData.set('image', image);
      formData.set('status', status);

      console.log(status);

      const config = {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + localStorage.token,
        },
        body: formData,
      };

      const response = await API().put('/product/' + id, config);
      console.log(response);

      swal({
        title: 'Success Update Product',
        text: 'product updated!',
        icon: 'success',
        button: 'oke',
      });

      history.push('/admin/product');
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <section className="add-product">
        <div class="container">
          <div class="row">
            <div class="col-md-7">
              <h1>Update Product</h1>
              {message && (
                <div class="alert alert-danger" role="alert">
                  {message}
                </div>
              )}
              <form className="d-flex flex-column" onSubmit={(e) => handlerSubmit.mutate(e)}>
                <input type="text" defaultValue={detailProduct?.title} name="title" id="name" placeHolder="Name Product" onChange={handlerInput} />
                <input type="number" defaultValue={detailProduct?.price} name="price" id="price" placeHolder="Price" className="mt-4 mb-4" onChange={handlerInput} />
                <input type="file" name="image" id="image" className="d-none" onChange={handlerInput} />
                <label for="image" className="label-upload mb-4 d-flex justify-content-between">
                  Photo Product
                  <img src={clip} alt="clip" width="15px" />
                </label>
                <div class="check">
                  <input class="form-check-input" type="checkbox" value="not available" name="status" id="defaultCheck1" onChange={handlerChecked} />
                  <label class="form-check-label" for="defaultCheck1">
                    <p class="m-0">Not Available</p>
                  </label>
                </div>
                <button class="btn-add-product" type="submit">
                  Add Product
                </button>
              </form>
            </div>
            <div class="col-md-5 d-flex justify-content-center align-items-center">
              <img src={fileUpload} alt="coffee" className="img-upload" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UpdateProduct;
