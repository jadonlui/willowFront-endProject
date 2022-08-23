// 每個商品的物件
// {
//   "sid": "1",
//   "product_name": "草莓波堤",
//   "category_sid": "1",
//   "product_price": "$35",
//   "product_img": "./images/pon-de-strawberry.jpeg",
//   "product_desc": "草莓甜甜的滋味，配上波堤可愛的風格",
//   "created_at": "2022-05-31 08:28:44"
//   "conut":"1", 紀錄每個商品被買了幾個
// }

import * as React from 'react';

function CurrentOrder(props) {
  const { setCarts, carts } = props;
  const calcTotalNumber = () => {
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      total += carts[i].count;
    }
    return total;
  };

  const calcTotalPrice = () => {
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      total += carts[i].count * carts[i].product_price;
    }
    return total;
  };

  return (
    <>
      <section className="cartBox">
        <div className="container">
          <p className="loveyu-orderTitle">商品明細</p>
          <div className="card ">
            <div className="row ">
              <div className="col-9">
                <table className="table">
                  <thead className="text-center">
                    <tr>
                      <th scope="col">商品圖片</th>
                      <th scope="col">商品名稱</th>
                      <th scope="col">單價</th>
                      <th scope="col">數量</th>
                      <th scope="col">小計</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {carts.map((v, i) => {
                      const subtotal = v.count * v.product_price;
                      return (
                        <tr key={'a' + v.sid}>
                          <td>
                            <img src={v.product_img} alt="" />
                          </td>
                          <td>{v.product_name}</td>
                          <td>{v.product_price}</td>
                          <td>{v.count}</td>
                          <td>{subtotal}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div class=" bg-light mb-3 col ">
                <div class="card-header text-center">
                  <b>總計</b>
                </div>
                <div class="card-body row">
                  <div className="col-7">
                    <p class="card-title">總數量</p>
                    <p class="card-title">總金額</p>
                  </div>
                  <div className="col-5">
                    <p class="card-text text-end">{calcTotalNumber()}</p>
                    <p class="card-text text-end">${calcTotalPrice()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CurrentOrder;
