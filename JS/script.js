// ── Global Cart Logic ───────────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCartGlobal(product) {
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.qty += product.qty || 1;
  } else {
    cart.push({ ...product, qty: product.qty || 1 });
  }
  saveCart();
  renderCartDrawer();
  openCartDrawer();
}

function updateCartQty(id, delta) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(p => p.id !== id);
    }
  }
  saveCart();
  renderCartDrawer();
}

function removeFromCart(id) {
  cart = cart.filter(p => p.id !== id);
  saveCart();
  renderCartDrawer();
}

function openCartDrawer() {
  const drawer = document.getElementById('globalCartDrawer');
  const backdrop = document.getElementById('globalCartBackdrop');
  if (drawer) drawer.classList.add('open');
  if (backdrop) backdrop.classList.add('open');
}

function closeCartDrawer() {
  const drawer = document.getElementById('globalCartDrawer');
  const backdrop = document.getElementById('globalCartBackdrop');
  if (drawer) drawer.classList.remove('open');
  if (backdrop) backdrop.classList.remove('open');
}

function renderCartDrawer() {
  let container = document.getElementById('globalCartContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'globalCartContainer';
    document.body.appendChild(container);
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const formatter = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

  const isCartEmpty = cart.length === 0;

  const cartItemsHtml = isCartEmpty 
    ? `<div style="padding: 32px; text-align: center;"><p style="color: #666; font-size: 14px;">Tu carrito está vacío</p><button onclick="closeCartDrawer()" style="margin-top:16px; background:#1ed760; border:none; padding:12px 24px; border-radius:500px; font-weight:bold; cursor:pointer;">Empezar a comprar</button></div>`
    : cart.map(item => `
    <div class="CartItem__Shelf-sc-p24few-0 biSKVY" style="display:flex; gap:16px; margin-bottom:16px; border-bottom: 1px solid #eee; padding-bottom:16px;">
      <img src="${item.img}" style="width:100px; height:100px; object-fit:cover; border-radius:4px;" class="Image-sc-1u215sg-3 fNOaaL CartItem__ProductImage-sc-p24few-15 fEeoub">
      <section class="CartItem__ItemSection-sc-p24few-2 irXtCU" style="flex:1; display:flex; flex-direction:column; justify-content:space-between;">
        <div>
          <p style="font-weight:bold; margin-bottom:4px;" class="CartItem__ProductTitle-sc-p24few-13 iSmdRG">${item.name}</p>
          <p style="color:#666; font-size:14px; margin-bottom:8px;" class="CartItem__Price-sc-p24few-14 gcqTUt">${formatter.format(item.price)}</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="CartItem__QuantityControlsContainer-sc-p24few-4 fGoWcl" style="display:flex; align-items:center; gap:12px; background:#f0f0f0; border-radius:4px; padding:4px 8px;">
            <button onclick="updateCartQty(${item.id}, -1)" style="border:none; background:none; cursor:pointer; font-size:16px;">
              <svg role="img" height="16" width="16" viewBox="0 0 16 16"><path d="M5.25 3v-.917C5.25.933 6.183 0 7.333 0h1.334c1.15 0 2.083.933 2.083 2.083V3h4.75v1.5h-.972l-1.257 9.544A2.25 2.25 0 0 1 11.041 16H4.96a2.25 2.25 0 0 1-2.23-1.956L1.472 4.5H.5V3h4.75zm1.5-.917V3h2.5v-.917a.583.583 0 0 0-.583-.583H7.333a.583.583 0 0 0-.583.583zM2.986 4.5l1.23 9.348a.75.75 0 0 0 .744.652h6.08a.75.75 0 0 0 .744-.652L13.015 4.5H2.985z"></path></svg>
            </button>
            <p style="font-weight:bold;">${item.qty}</p>
            <button onclick="updateCartQty(${item.id}, 1)" style="border:none; background:none; cursor:pointer; font-size:16px;">
              <svg role="img" height="16" width="16" viewBox="0 0 16 16"><path d="M15.25 8a.75.75 0 0 1-.75.75H8.75v5.75a.75.75 0 0 1-1.5 0V8.75H1.5a.75.75 0 0 1 0-1.5h5.75V1.5a.75.75 0 0 1 1.5 0v5.75h5.75a.75.75 0 0 1 .75.75z"></path></svg>
            </button>
          </div>
          <button onclick="removeFromCart(${item.id})" style="border:none; background:none; cursor:pointer; color:#666; font-weight:bold; text-decoration:underline;">eliminar</button>
        </div>
      </section>
    </div>
    `).join('');

  const artistHeader = isCartEmpty ? '' : `
    <div class="CartShelf__StyledArtists-sc-u2kv3u-1 dzapSG" style="display:flex; align-items:center; gap:12px; margin-bottom:24px;">
      <img height="32px" width="32px" src="https://i.scdn.co/image/ab6761610000f178b10c34546a4ca2d7faeb8865" class="Image-sc-1u215sg-3 jLVuoT CartShelf__ArtistAvatar-sc-u2kv3u-2 jCPKMX" style="border-radius:50%;">
      <p style="font-weight:bold;" class="CartShelf__ArtistName-sc-u2kv3u-3 ktXSRI">9louro</p>
    </div>
  `;

  const checkoutFooter = isCartEmpty ? '' : `
    <div class="CartShelf__CheckoutShelf-sc-u2kv3u-4 hnoOBs" style="margin-top:auto; padding-top:24px; border-top:1px solid #eee;">
      <div class="CartShelf__SubtotalContainer-sc-u2kv3u-6 gzsTCm" style="display:flex; justify-content:space-between; margin-bottom:16px;">
        <p style="font-weight:bold;" class="CartShelf__SubtotalTitle-sc-u2kv3u-7 PuQWU">Total parcial</p>
        <p style="font-weight:bold;" class="CartShelf__SubtotalPrice-sc-u2kv3u-5 YLigC">${formatter.format(subtotal)}</p>
      </div>
      <div class="CartShelf__CheckoutWrapper-sc-u2kv3u-8 jnDBgb">
        <button onclick="alert('Redirigiendo al checkout...')" style="width: 100%; cursor: pointer; background:#1ed760; color:#000; border:none; border-radius:500px; padding:16px; font-weight:bold; font-size:16px;">
          Ir al proceso de pago
        </button>
      </div>
    </div>
  `;

  const drawerHtml = `
    <div class="drawer-backdrop global-backdrop" id="globalCartBackdrop" onclick="closeCartDrawer()"></div>
    <div position="right" backgroundcolor="#fff" class="Drawer__DrawerContent-sc-nr63fi-2 bQHGPq global-drawer" id="globalCartDrawer">
      <div class="Cart__ViewCartWrapper-sc-1b34e7m-0 bcqqay" style="display:flex; flex-direction:column; height:100%;">
        <header class="Cart__CartHeader-sc-1b34e7m-1 FBvCZ" style="display:flex; justify-content:space-between; align-items:center; padding:24px; border-bottom:1px solid #eee;">
          <h4 style="font-size:24px; font-weight:bold; margin:0;" class="Cart__CartTitle-sc-1b34e7m-2 hjacKg">Tu carrito</h4>
          <button onclick="closeCartDrawer()" style="background:none; border:none; cursor:pointer;" class="Button-sc-1dqy6lx-0 lgMBRB Cart__CloseCartButton-sc-1b34e7m-3 klhlwE" aria-label="close the cart view">
            <svg role="img" height="24" width="24" viewBox="0 0 24 24"><path d="M3.293 3.293a1 1 0 0 1 1.414 0L12 10.586l7.293-7.293a1 1 0 1 1 1.414 1.414L13.414 12l7.293 7.293a1 1 0 0 1-1.414 1.414L12 13.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L10.586 12 3.293 4.707a1 1 0 0 1 0-1.414z"></path></svg>
          </button>
        </header>
        <section class="CartShelf__Shelves-sc-u2kv3u-0 glIogb" style="padding:24px; flex:1; overflow-y:auto; display:flex; flex-direction:column;">
          ${artistHeader}
          <div style="flex:1;">
            ${cartItemsHtml}
          </div>
          ${checkoutFooter}
        </section>
      </div>
    </div>
  `;

  container.innerHTML = drawerHtml;
  
  // Replace standard openCart / closeCart if they exist
  window.openCart = openCartDrawer;
  window.closeCart = closeCartDrawer;
}

// Add global styles for the new drawer
const style = document.createElement('style');
style.textContent = `
  .global-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.6);
    z-index: 9999;
    display: none;
    opacity: 0;
    transition: opacity .25s;
  }
  .global-backdrop.open {
    display: block;
    opacity: 1;
  }
  .global-drawer {
    position: fixed;
    top: 0;
    right: -400px;
    width: 400px;
    max-width: 100vw;
    height: 100%;
    background: #fff;
    color: #000;
    z-index: 10000;
    transition: right .3s ease;
    box-shadow: -4px 0 15px rgba(0,0,0,0.1);
  }
  .global-drawer.open {
    right: 0;
  }
  .global-drawer * {
    box-sizing: border-box;
  }
`;
document.head.appendChild(style);

// Render on load
document.addEventListener('DOMContentLoaded', () => {
  renderCartDrawer();
  
  // Override global addToCart that may be defined in inline scripts
window.addToCart = function(e) {
  if (e) e.preventDefault();
  const titleEl = document.querySelector('.product-title');
  const priceEl = document.querySelector('.price');
  const imgEl = document.getElementById('mainImg');
  const qtyEl = document.getElementById('qty');
  
  if(titleEl && priceEl && imgEl) {
    const title = titleEl.textContent;
    const priceText = priceEl.textContent.replace('€','').replace(',','.').trim();
    const price = parseFloat(priceText);
    const qty = qtyEl ? parseInt(qtyEl.value, 10) : 1;
    const img = imgEl.src;
    const id = Array.from(title).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    addToCartGlobal({ id, name: title, price, img, qty });
  } else {
     openCartDrawer();
  }
};
});
