// 錄音檔 7/13
import { useState } from 'react';
import ProductItem from './ProductItem';
// import { useCart } from '../../../../utils/useCart'
import { confirm } from '../../../../components/Confirm';

function OrderList(props) {
  const { productsInOrder, setProductsInOrder, currentItem, carts, setCarts } =
    props;
  // const { clearCart } = useCart();

  return (
    <>
      <div className="col-md-8 cart">
        <div className="title">
          <div className="col align-self-center text-right text-muted">
            您購物車中共有 <b>{productsInOrder.length}</b> 種商品項目
          </div>
        </div>
        {productsInOrder.map((v, i) => {
          // 這樣寫相當於下面註解中的寫法
          // 注意只有物件屬性名稱都相同才能用解構語法，key值一定要加
          // key值選擇: 有id優先用id
          return (
            <ProductItem
              key={v.sid}
              {...v}
              // count={v.counts} 因為 v 裡已經有 count 屬性
              removeItem={() => {
                confirm('商品已刪除');
                // 錄音檔 7/13 15:35
                // 1.從目前狀態拷貝出新的變數值(陣列/物件)
                // 2.在新的變數值(陣列/物件)上做處理
                const newProductsInOrder = productsInOrder.filter((v2, i2) => {
                  return v.sid !== v2.sid;
                });
                // 3.設定回原來的狀態
                setProductsInOrder(newProductsInOrder);
              }}
              setCount={(newCount) => {
                // 1.從目前狀態拷貝出新的變數值(陣列/物件)
                const newProductsInOrder = productsInOrder.map((v2) => {
                  return { ...v2 };
                });
                // 2.在新的變數值(陣列/物件)上做處理
                newProductsInOrder[i].count = newCount < 1 ? 1 : newCount;
                // 3.設定回原來的狀態
                setProductsInOrder(newProductsInOrder);
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default OrderList;
