/* eslint-disable react-hooks/exhaustive-deps */
import './Product.css';
import ProductRecommandCard from './components/Product-recommand';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductsData } from './data/products';
import { confirm } from '../../components/Confirm';
import { Link } from 'react-router-dom';

function Content(props) {
  const { setCarts, carts } = props;

  const [clicked, setClicked] = useState(false);
  const clickedBool = () => setClicked(!clicked);

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
      confirm('成功加入購物車')
    );

  const [product, setProduct] = useState({
    sid: '',
    product_name: '',
    category_sid: '',
    product_price: '',
    product_img: '',
    product_desc: '',
    created_at: '',
  });

  const { productId } = useParams();

  useEffect(() => {
    //getProduct
    const p = ProductsData.find((v, i) => v.sid === productId);

    if (p) {
      setProduct(p);
    }
  }, []);

  const RandomSidMinus1 = Math.floor(Math.random() * 11);
  const RandomProduct = ProductsData[RandomSidMinus1];

  const DonutsEnglishNames = [
    0,
    'Pon-de Strawberry',
    'Pon-de Uji Matcha',
    'Old Fashion',
    'Choco Old Fashion',
    'Donuts with Sprinkles',
    'Pon-de with Sprinkles',
    'Pon-de Plain',
    'Plain Donut',
    'Sugar Donut',
    'Chocolate Donut',
    'Pon-de Chocolate',
    'Pon-de Yogurt',
    'Strawberry Donut',
  ];
  const SidToInt = Number(product.sid);

  return (
    <>
      <div className="Mars-cnt-container">
        <div className="Mars-breadcrumb"></div>
        <div id="Mars-cnt-main" className="Mars-cnt-main d-flex">
          <div
            className="Mars-cnt-imgwr"
            onClick={clickedBool}
            style={
              clicked
                ? { boxShadow: '0 5px 25px 0 rgb(0 0 0 / 10%)' }
                : { boxShadow: 'none' }
            }
          >
            {/* eslint-disable-next-line prettier/prettier */}
            <img
              src={`../${product.product_img}`}
              alt=""
              className="Mars-cnt-img"
            />
            {/* <img src="../images/uji-matcha.jpg" alt="" className="Mars-cnt-img" /> */}
          </div>
          <div className="Mars-cnt-info">
            <p className="Mars-prod-name">{product.product_name}</p>
            <p className="Mars-cnt-engnum">{DonutsEnglishNames[SidToInt]}</p>
            {/* {RandomProduct.category_sid === '1'
            ? '波堤'
            : RandomProduct.category_sid === '3'
            ? '歐菲香'
            : '圓型甜甜圈'} */}
            <p className="Mars-cnt-engnum">NT$ {product.product_price}</p>
            <p className="Mars-cnt-desc">{product.product_desc}</p>
            <button
              className="ProjectButton Mars-button"
              onClick={() =>
                handleAddToCarts(
                  product.sid,
                  product.product_name,
                  product.category_sid,
                  product.product_price,
                  product.product_img,
                  product.product_desc,
                  product.created_at
                )
              }
            >
              <i className="fa-solid fa-circle-plus"></i> 加入購物車
            </button>
          </div>
        </div>
        <div className="Mars-cnt-nutriwr">
          <div className="Mars-cnt-nutrition">
            <p className="Mars-nutri-p">營養成分</p>
            <div className="Mars-nutri-flex d-flex">
              <p className="Mars-nutri-p">熱量：217 kCal</p>
              <p className="Mars-nutri-p">蛋白質：1.8 g</p>
              <p className="Mars-nutri-p">脂質：12 g</p>
              <p className="Mars-nutri-p">碳水化合物：26.5 g</p>
              <p className="Mars-nutri-p">鈉：240 mg</p>
            </div>
            <p className="Mars-nutri-p">過敏原資訊</p>
            <div className="Mars-allergy-flex d-flex">
              <p className="Mars-nutri-p">小麥：〇</p>
              <p className="Mars-nutri-p">乳類：〇</p>
              <p className="Mars-nutri-p">蛋：〇</p>
              <p className="Mars-nutri-p">花生：Ｘ</p>
            </div>
          </div>
        </div>
        <Link className="text-decoration-none" to="/Product">
          {/* eslint-disable-next-line prettier/prettier */}
          <button className="ProjectButton Mars-Button-Linkback">→ 回到商品列表</button>
        </Link>
        <p className="Mars-prod-name Mars-RecBig">産品推薦</p>
        <ProductRecommandCard
          RandomProduct={RandomProduct}
          DonutsEnglishNames={DonutsEnglishNames}
        />
      </div>
    </>
  );
}

export default Content;
