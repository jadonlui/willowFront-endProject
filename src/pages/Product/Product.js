import { useState } from 'react';
import './Product.css';
import { ProductsData } from './data/products';
import { Link } from 'react-router-dom';
import H2 from '../../components/H2';
// import { useCart } from '../../utils/useCart';
import { confirm } from '../../components/Confirm';


function Product(props) {
  // 測試購物車------------------
  const { setCarts, carts } = props;

  const [productData, setProductData] = useState(ProductsData);
  // "sid": "1",
  // "product_name": "草莓波堤",
  // "category_sid": "1",
  // "product_price":"35",
  // "product_img": "./images/pon-de-strawberry.jpeg",
  // "product_desc": "草莓甜甜的滋味，配上波堤可愛的風格",
  // "created_at": "2022-05-31 08:28:44"

  // 購物車----------------------
  // const handleAddToCarts = (e) => setCarts({ ...carts, sid: e.sid });
  const handleAddToCarts = (
    sid,
    product_name,
    category_sid,
    product_price,
    product_img,
    product_desc,
    created_at
  ) =>
    setCarts(
      carts.concat({
        sid,
        product_name,
        category_sid,
        product_price,
        product_img,
        product_desc,
        created_at,
      }),
      confirm('成功加入購物車') // 書豪改
    );

  // Filter功能-----------------
  const UnFilter = () => {
    setProductData(ProductsData);
  };
  const PondeFilter = () => {
    if (
      // 如果filter過到剩下圓形甜甜圈，productData[0].category_sid 會是 2 （其他 if 條件以此類推）
      // 而預設狀態的話是全部，第一項是波堤，productData[0].category_sid 會是 1
      productData[0].category_sid === '2' ||
      productData[0].category_sid === '3'
    ) {
      // 淺層複製一次，reset ProductsData，讓setProductData可以重新抓到原始的ProductsData值
      const productDataZA = [...ProductsData];
      const PondeDataZ = productDataZA.filter((v) => v.category_sid === '1');
      setProductData(PondeDataZ);
    } else {
      const newPondeData = productData.filter((v) => v.category_sid === '1');
      setProductData(newPondeData);
    }
  };
  const DonutFilter = () => {
    if (
      productData[0].category_sid === '3' ||
      productData[2].category_sid === '1'
    ) {
      // 歐菲香沒有 productData[2]，productData[2].category_sid === '1' 寫在前面的話會出錯
      const productDataZB = [...ProductsData];
      const DonutDataZ = productDataZB.filter((v) => v.category_sid === '2');
      setProductData(DonutDataZ);
    } else {
      const newDonutData = productData.filter((v) => v.category_sid === '2');
      setProductData(newDonutData);
    }
  };
  const OldFashionFilter = () => {
    if (
      productData[2].category_sid === '1' ||
      productData[0].category_sid === '2'
    ) {
      const productDataZC = [...ProductsData];
      const OFDataZ = productDataZC.filter((v) => v.category_sid === '3');
      setProductData(OFDataZ);
    } else {
      const newOFData = productData.filter((v) => v.category_sid === '3');
      setProductData(newOFData);
    }
  };

  // 主頁面render
  return (
    <>
      <div className="Mars-container">
        <H2 title="商品列表" Entitle="Products" />
        <div className="Mars-img-wrap">
          <img src="./images/mv_donut.jpg" className="Mars-visual" alt="" />
        </div>
        <div className="Mars-prod-filter-area">
          <div
            className="Mars-prod-filter"
            onClick={() => {
              UnFilter();
            }}
          >
            全部
          </div>
          <div
            className="Mars-prod-filter"
            onClick={() => {
              PondeFilter();
            }}
          >
            波堤
          </div>
          <div
            className="Mars-prod-filter d-none d-lg-block"
            onClick={() => {
              DonutFilter();
            }}
          >
            圓形甜甜圈
          </div>
          <div
            className="Mars-prod-filter d-block d-lg-none"
            onClick={() => {
              DonutFilter();
            }}
          >
            圓形
          </div>
          <div
            className="Mars-prod-filter"
            onClick={() => {
              OldFashionFilter();
            }}
          >
            歐菲香
          </div>
        </div>
        <div className="Mars-product-slide">
          {productData.map((v, i) => {
            return (
              <div className="Mars-prod-wrap" key={'b' + v.sid}>
                <div className="Mars-prod-imgwr">
                  <Link to={`./${v.sid}#Mars-cnt-main`}>
                    {/* eslint-disable-next-line prettier/prettier */}
                    <img
                      src={v.product_img}
                      className="Mars-prod-img"
                      alt=""
                    ></img>
                  </Link>
                </div>
                <p className="Mars-prod-name">{v.product_name}</p>
                <p className="Mars-prod-price">NT$ {v.product_price}</p>
                <button
                  className="ProjectButton"
                  onClick={() => {
                    handleAddToCarts(
                      v.sid,
                      v.product_name,
                      v.category_sid,
                      v.product_price,
                      v.product_img,
                      v.product_desc,
                      v.created_at
                    );
                  }}
                >
                  <i className="fa-solid fa-circle-plus"></i> 加入購物車
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Product;

// 傳給購物車：使用 localStorage
