import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { API, getToppings } from '../../config/api';
import convertRupiah from 'rupiah-format';

const DetailPage = () => {
  const { id } = useParams();
  const history = useHistory();

  const { data: detailProduct, isLoading } = useQuery('detailProductCache', async () => {
    const response = await API().get('/product/' + id);
    localStorage.setItem('detailPage', JSON.stringify(response.data.product));
    return response.data.product;
  });
  const getDataUserTransaction = JSON.parse(localStorage.getItem('user_order'));

  const data = JSON.parse(localStorage.getItem('detailPage'));

  const { data: toppings, isLoading: loadingTopping } = useQuery('toppingsCache', getToppings);
  let [total, setTotal] = useState(0);

  useEffect(() => {
    const selectToppings = document.querySelectorAll('.checkbox');
    selectToppings.forEach((check) => {
      check.addEventListener('click', function () {
        if (this.checked === true) {
          setTotal((total += parseInt(this.value)));
        } else {
          setTotal((total -= parseInt(this.value)));
        }
      });
    });
  }, []);

  const handlerAddCart = () => {
    getDataUserTransaction.order.push({
      title: data.title,
      price: data.price,
      image: data.image,
    });
    localStorage.setItem('user_order', JSON.stringify(getDataUserTransaction));
    history.push('/cart-page');
    window.location.reload();
  };

  return (
    <>
      <title>WaysBucks | Detail Coffee</title>
      <section className="detail-page">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              {isLoading && <div>Loading...</div>}
              <img src={data.image} alt="detail-product" />
            </div>
            <div className="col-md-8">
              <h1 className="text-capitalize">{data.title}</h1>
              <p>{convertRupiah.convert(data.price)}</p>
              <form onSubmit="">
                <div className="toppings mt-3">
                  <div className="row">
                    {loadingTopping && <div>Loading...</div>}
                    {toppings?.map((topping) => {
                      return (
                        <div className="col-md-3 d-flex flex-column align-items-center">
                          <div class="box-check d-flex flex-column align-items-center">
                            <input type="hidden" />
                            <input type="checkbox" name={`${topping.title}`} value={`${topping.price}`} className="checkbox d-none" id={`${topping.title}`} />
                            <label for={`${topping.title}`} className="label-topping">
                              <img src={`${topping.image}`} alt={topping.image} />
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
                    <h4 className="text-end">{convertRupiah.convert(detailProduct?.price + total)}</h4>
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
