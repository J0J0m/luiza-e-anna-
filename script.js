const productsData = {
    1: {
        id: 1,
        name: "Bourbon Amarelo",
        price: 45.00,
        image: "imagens/bourbon.jpg",
        description: "Um café clássico, conhecido por sua doçura natural e acidez equilibrada. Cultivado em altitudes elevadas, resulta em uma bebida suave e aromática.",
        details: [
            "Variedade: Bourbon Amarelo",
            "Processo: Cereja Descascado",
            "Torra: Média",
            "Acidez: Média-baixa, cítrica",
            "Corpo: Médio",
            "Origem: Sul de Minas"
        ]
    },
    2: {
        id: 2,
        name: "Catuaí Vermelho",
        price: 38.50,
        image: "imagens/catuai.jpg",
        description: "Um café vibrante e intenso, com notas de frutas vermelhas e chocolate. Ideal para quem busca um sabor marcante e persistente.",
        details: [
            "Variedade: Catuaí Vermelho",
            "Processo: Natural",
            "Torra: Média-escura",
            "Acidez: Média, brilhante",
            "Corpo: Alto",
            "Origem: Cerrado Mineiro"
        ]
    },
    3: {
        id: 3,
        name: "Geisha",
        price: 89.90,
        image: "imagens/geisha.jpg",
        description: "Considerado um dos melhores cafés do mundo. Extremamente floral, com notas de jasmim, bergamota e mel. Uma experiência de degustação única.",
        details: [
            "Variedade: Geisha (Panamá)",
            "Processo: Lavado",
            "Torra: Clara",
            "Acidez: Alta, cítrica e floral",
            "Corpo: Leve",
            "Origem: Edição Limitada"
        ]
    },
    4: {
        id: 4,
        name: "Blend da Casa",
        price: 32.00,
        image: "imagens/blend.jpg",
        description: "Nosso blend exclusivo, perfeito para o dia a dia. Combinação de grãos arábica que resulta em um café equilibrado, com notas de caramelo e nozes.",
        details: [
            "Variedade: Blend Arábica",
            "Processo: Misto",
            "Torra: Média",
            "Acidez: Baixa",
            "Corpo: Médio-alto",
            "Origem: Diversas regiões"
        ]
    },
    5: {
        id: 5,
        name: "Orgânico",
        price: 55.00,
        image: "imagens/organico.jpg",
        description: "Cultivado sem o uso de agrotóxicos, este café oferece um sabor puro e limpo. Notas de chocolate amargo e um final suave.",
        details: [
            "Variedade: Arábica",
            "Processo: Natural",
            "Torra: Média",
            "Acidez: Média",
            "Corpo: Médio",
            "Certificação: Orgânica"
        ]
    },
    6: {
        id: 6,
        name: "Cápsulas Espresso",
        price: 29.90,
        image: "imagens/capsulas.jpg",
        description: "Praticidade e sabor em cápsulas compatíveis com máquinas Nespresso. Espresso intenso e cremoso, pronto em segundos.",
        details: [
            "Formato: Cápsulas (10 unidades)",
            "Intensidade: 10/12",
            "Notas: Cacau e especiarias",
            "Compatibilidade: Nespresso",
            "Torra: Escura",
            "Corpo: Alto"
        ]
    }
};

// Variáveis do Carrinho
let cart = [];
let currentProductId = null;

// Funções do Carrinho (Simplificadas para este exemplo)
function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const cartCounter = document.getElementById('cart-counter');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartList || !cartCounter || !cartTotal) return;

    cartList.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartList.innerHTML = '<li class="empty-message">Nenhum café selecionado...</li>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.style.padding = '15px';
            li.style.borderBottom = '1px solid #f0f0f0';
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            
            li.innerHTML = `
                <div>
                    <strong>${item.name}</strong><br>
                    <span style="color: #a0522d;">R$ ${item.price.toFixed(2).replace('.', ',')}</span>
                </div>
                <button onclick="removeFromCart(${index})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                    Remover
                </button>
            `;
            
            cartList.appendChild(li);
            total += item.price;
        });
    }
    
    cartCounter.textContent = cart.length;
    cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function addToCart(button) {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    
    cart.push({ name, price });
    updateCartDisplay();
    
    // Feedback visual
    button.textContent = '✓ ADICIONADO';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.textContent = 'COMPRAR';
        button.style.background = '';
    }, 1500);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function toggleCart() {
    const cartPanel = document.getElementById('cart-panel');
    if (cartPanel) {
        cartPanel.classList.toggle('active');
    }
}

// ====================================================================
// FUNÇÕES DO MODAL DE DETALHES DO PRODUTO
// ====================================================================

function showProductDetails(productId) {
    const product = productsData[productId];
    if (!product) return;
    
    currentProductId = productId;
    
    // Preencher informações no modal
    document.getElementById('modal-product-image').src = product.image;
    document.getElementById('modal-product-name').textContent = product.name;
    document.getElementById('modal-product-price').textContent = `R$ ${product.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('modal-product-description').textContent = product.description;
    
    // Preencher detalhes
    const detailsList = document.getElementById('modal-product-details');
    detailsList.innerHTML = '';
    product.details.forEach(detail => {
        const li = document.createElement('li');
        li.textContent = detail;
        detailsList.appendChild(li);
    });
    
    // Mostrar modal
    const modal = document.getElementById('product-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductDetails() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProductId = null;
}

// Adicionar ao carrinho a partir do modal
function addToCartFromModal() {
    if (!currentProductId) return;
    
    const product = productsData[currentProductId];
    
    // Adiciona ao carrinho
    cart.push({ name: product.name, price: product.price });
    updateCartDisplay();
    
    closeProductDetails();
    
    // Mostrar feedback visual
    alert(`${product.name} adicionado ao carrinho!`);
}

// Fechar modal ao clicar fora dele
document.addEventListener('click', function(event) {
    const modal = document.getElementById('product-modal');
    if (event.target === modal) {
        closeProductDetails();
    }
});

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProductDetails();
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});