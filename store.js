if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}
function ready () {
    removeCartItem();
    let removeBtn=document.querySelectorAll('.btn-danger');
    removeBtn.forEach(btn => {
        btn.addEventListener("click",(e)=>{
            e.target.parentElement.parentElement.remove();
            updateCartTotal();
        });
    });
    let quantityInputs=document.getElementsByClassName('cart-quantity-input');
    for(let i=0;i<quantityInputs.length;i++)
    {
        let inputs=quantityInputs[i];
        inputs.addEventListener("change",quantityChange)
    }
    let addToCart=document.getElementsByClassName('shop-item-button');
    for(let i=0;i<addToCart.length;i++){
        let button=addToCart[i];
        button.addEventListener("click",addToCartClicked)
    }
    document.getElementsByClassName('btn-purchase')[0].addEventListener("click",purchaseClicked);
  }
  function purchaseClicked()
  {
      alert('Thank you for your purchase');
      let cartItems=document.getElementsByClassName('cart-items')[0];
      while(cartItems.hasChildNodes()){
          cartItems.removeChild(cartItems.firstChild);
      }
      updateCartTotal();
  }
  function addToCartClicked(e){
      let button=e.target;
      let shopItem=button.parentElement.parentElement;
      let title=shopItem.getElementsByClassName("shop-item-title")[0].innerHTML;
      //console.log(title);
      let price=shopItem.getElementsByClassName("shop-item-price")[0].innerHTML;
      console.log(price);
      let imgSrc=shopItem.getElementsByClassName("shop-item-image")[0].src;
      //console.log(imgSrc);
      addItemToCart(title,price,imgSrc);
      updateCartTotal();
  }
  function addItemToCart (title,price,imgSrc) {
      let cartRow=document.createElement('div');
      cartRow.className='cart-row';
      let cartItems=document.getElementsByClassName('cart-items')[0];
      let cartItemName=cartItems.getElementsByClassName("cart-item-title");

      for(let i=0;i<cartItemName.length;i++){
          if(cartItemName[i].innerText==title){
              alert('This item is aready added to the cart');
              return
          }
      }
      let cartRowContent=
        `<div class="cart-item cart-column">
            <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
            <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`;
        cartRow.innerHTML=cartRowContent;
        cartItems.appendChild(cartRow);
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener("click",removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener("change",quantityChange);
    }
  function quantityChange(e)
  {
      let input=e.target;
      if(isNaN(input.value) || input.value<=0){
          input.value=1;
      }
      updateCartTotal();
  }
  function removeCartItem()
  {
    let removeBtn=document.querySelectorAll('.btn-danger');
    removeBtn.forEach(btn => {
        btn.addEventListener("click",(e)=>{
            e.target.parentElement.parentElement.remove();
            updateCartTotal();
        });
    });
  }
function updateCartTotal()
{
    let cartItemContainer =document.getElementsByClassName('cart-items')[0];
    let cartRows =cartItemContainer.getElementsByClassName('cart-row');
    let total=0;
    for(let i=0;i<cartRows.length;i++)
    {
        let cartRow=cartRows[i];
        let priceElement=cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement=cartRow.getElementsByClassName('cart-quantity-input')[0];
        //console.log(priceElement,quantityElement);

        let price=parseFloat(priceElement.innerHTML.replace('$',''));

        let quantity=quantityElement.value;
        total=total+price*quantity;
    }
    let cartTotal=document.getElementsByClassName('cart-total-price')[0];
   // console.log(cartTotal);
    total=Math.round(total*100)/100;
    cartTotal.innerHTML='$'+total;
}
