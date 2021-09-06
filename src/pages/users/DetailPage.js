import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router';
import { API, getToppings } from '../../config/api';
import convertRupiah from 'rupiah-format';
import { useHistory } from 'react-router';

const DetailPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const { data: detailProduct, isLoading } = useQuery('detailProductCache', async () => {
    const response = await API().get('/product/' + id);
    return response.data.product;
  });

  const { data: toppings, isLoading: loadingTopping } = useQuery('toppingsCache', getToppings);
  let [total, setTotal] = useState(0);
  const convertTotal = convertRupiah.convert(detailProduct?.price + total);

  let [idTopping] = useState([]);

  const handlerCheckBox = (e) => {
    if (e.target.checked === true) {
      setTotal((total += parseInt(e.target.value)));
      idTopping.push(e.target.name);
    } else {
      setTotal((total -= parseInt(e.target.value)));
      idTopping.splice(idTopping.indexOf(e.target.name), 1);
    }
  };

  const [quantity] = useState(1);

  const handlerAddCart = async (e) => {
    try {
      e.preventDefault();
      const body = JSON.stringify({ quantity, idTopping });

      const config = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.token,
        },
        body,
      };
      const response = await API().post('/cart/' + id, config);
      history.push('/cart-page');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <title>WaysBucks | Detail Coffee</title>
      <section className="detail-page">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {isLoading && <div>Loading...</div>}
              <img src={detailProduct?.image} alt="detail-product" />
            </div>
            <div className="col-md-8">
              <h1 className="text-capitalize">{detailProduct?.title}</h1>
              <p>{convertRupiah.convert(detailProduct?.price)}</p>
              <form onSubmit="">
                <div className="toppings mt-3">
                  <div className="row">
                    {loadingTopping && <div>Loading...</div>}
                    {toppings?.map((topping) => {
                      return (
                        <div className="col-md-3 d-flex flex-column align-items-center">
                          <div class="box-check d-flex flex-column align-items-center">
                            <input type="checkbox" name={topping.id} value={topping.price} className="checkbox d-none" id={topping.title} onChange={handlerCheckBox} />
                            <label for={topping.title} className="label-topping">
                              <img src={topping.image} alt={topping.image} />
                            </label>
                            <label className="click-topping">{topping.title}</label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="total d-flex justify-content-lg-between mt-2">
                  <h3>Total</h3>
                  <p className="price-total">
                    <h4 className="text-end">{detailProduct?.price ? <>{convertTotal}</> : <></>}</h4>
                  </p>
                </div>
                <button className="btn-total" onClick={handlerAddCart}>
                  Add Cart
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DetailPage;
