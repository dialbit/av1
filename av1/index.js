let numberOfItemsInCart = 0;

const numberOfCartItems = document.getElementById('numberOfCartItems');
const container = document.getElementById('cardContainer');
const table = document.getElementById('tableContainer');

let logradouro = '';
let numero = '';
let cep = '';
let cidade = '';
let email = '';

let ArrayOfItems = [];
let itemsCoockie = localStorage.getItem('items');
let itemsParsed = JSON.parse(itemsCoockie)
if (itemsParsed) {
    itemsParsed.map(item => {
        ArrayOfItems.push(item)
    })
    numberOfCartItems.innerHTML = itemsParsed.length;
}

function addItem(id) {
    let item = items[id - 1]
    let index = id - 1

    ArrayOfItems.forEach((i, index) => {
        if (i['id'] == item['id']) {
            ArrayOfItems.splice(index, 1)
        }
    })

    ArrayOfItems.push(item)
    let parseToString = JSON.stringify(ArrayOfItems)
    localStorage.setItem("items", parseToString)
    numberOfCartItems.innerHTML = ArrayOfItems.length;

}

function checkAdult(id, idArray) {
    return id == idArray;
}

function removeQnt(id) {
    let item = items[id - 1]
    if (item['quantidade'] > 1) {
        items[id - 1]['quantidade'] -= 1;

        if (container) {
            container.innerHTML = ''
            items.forEach((result, idx) => {
                const content = ` 
                <div class='col-md-4 col-sm-6 col-lg-4 col-xl-3 mb-3'>
                <div class='card' style='width: 18rem;'>
                <img src="${result.image}" class='card-img-top' alt='...'/>
                <div class='card-body'>
                <h5 class='card-title'>${result.title} </h5>
                <p class='card-text'>${result.description}</p>
                <div>
                <h5>${result.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 8 })}</h5>
                </div>
                <div class='text-center mt-3'>
                <div class='mb-3 d-flex'>
                    <p class='card-text'>Quantidade: </p>
                    <button class='btn btn-sm btn-primary' style='margin-right: 10px; margin-left: 10px' onclick='removeQnt(${result.id})'>-</button>
                    <p style='margin: 5px 5px 0px 5px'>${result.quantidade}</p>
                    <button class='btn btn-sm btn-primary' style='margin-right: 10px; margin-left: 10px' onclick='addQnt(${result.id})'>+</button>
                    
                 </div>
                <a href='#' class='btn btn-primary' onclick='addItem(${result.id})'>Adicionar ao carrinho</a>
                </div> 
                `;
                container.innerHTML += content;
            })

        }
    }
}

function addQnt(id) {
    items[id - 1]['quantidade'] += 1;
    if (container) {
        container.innerHTML = ''
        items.forEach((result, idx) => {
            const content = ` 
                <div class='col-md-4 col-sm-6 col-lg-4 col-xl-3 mb-3'>
                <div class='card' style='width: 18rem;'>
                <img src="${result.image}" class='card-img-top' alt='...'/>
                <div class='card-body'>
                <h5 class='card-title'>${result.title} </h5>
                <p class='card-text'>${result.description}</p>
                <div>
                <h5>${result.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 8 })}</h5>
                </div>
                <div class='text-center mt-3'>
                <div class='mb-3 d-flex'>
                    <p class='card-text'>Quantidade: </p>
                    <button class='btn btn-sm btn-primary' style='margin-right: 10px; margin-left: 10px' onclick='removeQnt(${result.id})'>-</button>
                    <p style='margin: 5px 5px 0px 5px'>${result.quantidade}</p>
                    <button class='btn btn-sm btn-primary' style='margin-right: 10px; margin-left: 10px' onclick='addQnt(${result.id})'>+</button>
                    
                 </div>
                <a href='#' class='btn btn-primary' onclick='addItem(${result.id})'>Adicionar ao carrinho</a>
                </div> 
                `;
            container.innerHTML += content;
        })
    }
}

function removeItemInCart(id) {
    let item = items[id - 1]

    ArrayOfItems.forEach((i, index) => {

        if (i['id'] == item['id']) {
            ArrayOfItems.splice(index, 1)
        }
    })

    let parseToString = JSON.stringify(ArrayOfItems)
    localStorage.setItem("items", parseToString)
    numberOfCartItems.innerHTML = ArrayOfItems.length;


    if (table) {
        table.innerHTML = ''
        let price = 0;
        let qtd = 0
        ArrayOfItems.map((result) => {
            price += result['price'] * result['quantidade']
            qtd += result['quantidade']
        })
        if(ArrayOfItems.length > 0){
            const content = `
            <h1>Carrinho</h1>
                <div class='row'>
                    <div class='col-md-8'>
                            <table class="table table-sm table-hover table-striped">
                            <thead>
                                <th>Imagem</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th>Excluir</th>
                            </thead>
                            <tbody>
                            ${ArrayOfItems.map((result) => {
                return `
                                                        <tr>
                                                            <td><img src='${result.image}' class='img-thumbnail' style='width: 100px;'/></td>
                                                            <td><p>${result.title} ${result.id} </p></td>
                                                            <td>${result.quantidade}</td>
                                                            <td>${(result.price * result.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 8 })}</td>
                                                            <td><button class='btn btn-sm btn-danger' onclick='removeItemInCart(${result.id})'>Excluir </button></td>
                                                        </tr>
                                                    `
            })
                }   
                            </tbody>
                        </table>
                    </div>
                        <div class='col-md-4  py-4'>
                            <div class='card p-3'>
                                <h5 class='float-left'>Valor Total: ${price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 8 })} </h5>
                                <h5 class='float-left'>Peças Total: ${qtd}</h5>
        
                                <div class='text-center mt-4'>
                                    <h5>Dados da entrega</h5>
                                    
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >logradouro</span>
                                        </div>
                                        <input type="text" onkeyup='setlogradouro(this.value)' value='${logradouro}'  class="form-control"  aria-describedby="basic-addon3">
                                    </div>
        
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Número</span>
                                        </div>
                                        <input type="text" onkeyup='setNumero(this.value)' value='${numero}'  class="form-control"  aria-describedby="basic-addon3">
                                    </div>

                                   
        
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Cep</span>
                                        </div>
                                        <input type="text" onkeyup='setCep(this.value)' value='${cep}'  class="form-control"  aria-describedby="basic-addon3">
                                    </div>
        
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Cidade</span>
                                        </div>
                                        <input type="text" onkeyup='setCidade(this.value)' value='${cidade}'  class="form-control"  aria-describedby="basic-addon3">
                                    </div>
                                </div>
        
                                <div class='text-center mt-4'>
                                    <h5>Dados pessoais</h5>
                                    <span class='mb-5'> Iremos enviar o boleto para o seu email.</span>
                                    <div class="input-group mb-3 mt-3">
                                        
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" >Email</span>
                                        </div>
                                        <input type="text" onkeyup='setEmail(this.value)'  value='${email}' class="form-control"  aria-describedby="basic-addon3">
                                    </div>
                                </div>
                                
                                <div class='text-center mt-4'>
                                    <button class='btn btn-lg btn-primary' onclick='checkout()'>Finalizar pedido </button>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </div>
                `;
            table.innerHTML += content;
        }else{
            const content = `
            <h1>Carrinho</h1>
                <div class='text-center mt-5'>
                    <h5>Seu carrinho está vazio</h5>
                    <a href='/'>
                    <button class='btn btn-sm mt-3 btn-primary'>Ver produtos </button>
                    </a>
                </div>
                `;
            table.innerHTML += content;
        }
    }
}


function search(value) {
    searchId = document.getElementById('searchInput')
    container.innerHTML = ''
    items.forEach((result) => {
        if (result.title.toLowerCase().includes(value.toLowerCase())) {
            {
                const card = document.createElement('div');
                card.classList = 'card-body';
                const content = ` 
                <div class='col-md-4 col-sm-6 col-lg-4 col-xl-3 mb-3'>
                <div class='card' style='width: 18rem;'>
                <img src="${result.image}" class='card-img-top' alt='...'/>
                <div class='card-body'>
                <h5 class='card-title'>${result.title} </h5>
                <p class='card-text'>${result.description}</p>
                <div>
                <h5>${result.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 8 })}</h5>
                </div>
                <div class='text-center mt-3'>
                <div class='mb-3 d-flex'>
                    <p class='card-text'>Quantidade: </p>
                    <button class='btn btn-sm btn-primary' style='margin-right: 10px; margin-left: 10px' onclick='removeQnt(${result.id})'>-</button>
                    <p style='margin: 5px 5px 0px 5px'>${result.quantidade}</p>
                    <button class='btn btn-sm btn-primary' style='margin-right: 10px; margin-left: 10px' onclick='addQnt(${result.id})'>+</button>
                    
                 </div>
                <a href='#' class='btn btn-primary' onclick='addItem(${result.id})'>Adicionar ao carrinho</a>
                </div> 
                `;
                container.innerHTML += content;
            }
        }
    })
}


function checkout() {

    if (logradouro == '') {
        alert('INFORME O LOGRADOURO')
        return;
    }
    if (numero == '') {
        alert('INFORME O NÚMERO')

        return
    }
    if (cep == '') {
        alert('INFORME O CEP')

        return
    }
    if (cidade == '') {
        alert('INFORME A CIDADE');
        return
    }

    if (email == '') {
        alert('INFORME O EMAIL')
        return
    }
    console.log('cheguei aqui')

    if (table) {
        console.log('cheguei aqui 2')
        table.innerHTML = ''
        let price = 0;
        let qtd = 0
        ArrayOfItems.map((result) => {
            price += result['price'] * result['quantidade']
            qtd += result['quantidade']
        })
        const content = `
            <div class='text-center'>
                <h1>Pedido finalizado</h1> 
                <img src='data:image/png;base64,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' style='width: 60px' />
                <p class='mt-4'>Enviaremos os detalhes no email: ${email}</p>
                </div>
            
            <div class='row text-center justify-content-center mt-5'>

                <div class='col-md-8'>
                    <h5 class="mt-4 mb-4">Seus produtos</h5>
                        <table class="table table-sm table-hover table-striped table-bordered">
                        <thead>
                            <th>Imagem</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Preço</th> 
                        </thead>
                        <tbody>
                        ${ArrayOfItems.map((result) => {
            return `
                                                    <tr>
                                                        <td><img src='${result.image}' class='img-thumbnail' style='width: 100px;'/></td>
                                                        <td><p>${result.title} ${result.id} </p></td>
                                                        <td>${result.quantidade}</td>
                                                        <td>${(result.price * result.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 8 })}</td>
                                                        
                                                    </tr>
                                                `
        })
            }   
                        </tbody>
                    </table>

                <div>
                    <h5 class="mt-4 mb-4">Dados da entrega </h5>

                    <table class="table table-sm table-hover table-striped table-bordered">
                        <thead>
                            <th>logradouro</th>
                            <th>Número</th>
                            <th>Cep</th>
                            <th>Cidade</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td><p>${logradouro}</p></td>
                            <td><p>${numero}</p></td>
                            <td><p>${cep} </p></td>
                            <td><p>${cidade} </p></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <a href="/">
                    <button class="btn btn-lg btn-primary" >Voltar para home</button>
                </a>
                </div>
                </div>
            </div>
        
            `;
        table.innerHTML += content;
    }

    localStorage.removeItem("items")
    ArrayOfItems = []
    numberOfCartItems.innerHTML = ArrayOfItems.length;

}

function setlogradouro(value) {
    logradouro = value
}
function setCep(value) {
    cep = value
}
function setNumero(value) {
    numero = value
}
function setCidade(value) {
    cidade = value
}
function setCidade(value) {
    cidade = value
}
function setEmail(value) {
    email = value
}

const items = [{
    image: "https://cdn.pichau.com.br/wysiwyg/Descricao/Logitech/910-005793/910-005793.png",
    title: "Pichau Mouse Gamer Logitech G203 RGB",
    description: "Mouse Gamer Logitech 203 RGB 8000DPi perfeito para uma jogatina",
    price: 230.00,
    id: 1,
    quantidade: 1
}, {
    image: "https://images-americanas.b2w.io/produtos/01/00/img/44478/8/44478870_1GG.jpg",
    title: "Relógio masculino",
    description: "Relógio masculino. Lorem ipsum dolor sit amet, consectetur",
    price: 400.00,
    id: 2,
    quantidade: 1
}, {
    image: "https://img.irroba.com.br/fit-in/600x600/filters:fill(fff):quality(95)/dhaffyco/catalog/bolsa-feminina-preto.20200221160112.jpg",
    title: "Bolsa Feminina Grande",
    description: "Bolsa Dhaffy Grande Com Carteira, Alça de Mão e Tiracolo.",
    price: 610.00,
    id: 3,
    quantidade: 1
}, {
    image: "https://a-static.mlcdn.com.br/618x463/celular-a31-128gb-pr-samsung/imperialeletromoveis/52f8c2b4d04911eab95c4201ac18501e/0854bc349430cfb4ede6fc813d0c1fcf.jpg",
    title: "Celular A31 128GB PR",
    description: "Celular samsung perfeito para fotos, vídeos e jogos.",
    price: 1200.00,
    id: 4,
    quantidade: 1
}
];

if (container) {
    items.forEach((result, idx) => {
        const card = document.createElement('div');
        card.classList = 'card-body';
        const content = ` 
        <div class='col-md-4 col-sm-6 col-lg-4 col-xl-3 mb-3'>
        <div class='card' style='width: 18rem;'>
        <img src="${result.image}" class='card-img-top' alt='...'/>
        <div class='card-body'>
        <h5 class='card-title'>${result.title} </h5>
        <p class='card-text'>${result.description}</p>
        <div>
        <h5>${result.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 8 })}</h5>
        </div>
        <div class='text-center mt-3'>
        <div class='mb-3 d-flex'>
            <p class='card-text'>Quantidade: </p>
            <button class='btn btn-sm btn-primary' style='margin-right: 10px; margin-left: 10px' onclick='removeQnt(${result.id})'>-</button>
            <p style='margin: 5px 5px 0px 5px'>${result.quantidade}</p>
            <button class='btn btn-sm btn-primary' style='margin-right: 10px; margin-left: 10px' onclick='addQnt(${result.id})'>+</button>
            
         </div>
        <a href='#' class='btn btn-primary' onclick='addItem(${result.id})'>Adicionar ao carrinho</a>
        </div> 
        `;
        container.innerHTML += content;
    })
}


if (table) {
    let price = 0;
    let qtd = 0
    ArrayOfItems.map((result) => {
        price += result['price'] * result['quantidade']
        qtd += result['quantidade']
    })
    if(ArrayOfItems.length > 0){
        const content = `
        <h1>Carrinho</h1>
            <div class='row'>
                <div class='col-md-8'>
                        <table class="table table-sm table-hover table-striped">
                        <thead>
                            <th>Imagem</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                            <th>Excluir</th>
                        </thead>
                        <tbody>
                        ${ArrayOfItems.map((result) => {
            return `
                                                    <tr>
                                                        <td><img src='${result.image}' class='img-thumbnail' style='width: 100px;'/></td>
                                                        <td><p>${result.title} ${result.id} </p></td>
                                                        <td>${result.quantidade}</td>
                                                        <td>${(result.price * result.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 8 })}</td>
                                                        <td><button class='btn btn-sm btn-danger' onclick='removeItemInCart(${result.id})'>Excluir </button></td>
                                                    </tr>
                                                `
        })
            }   
                        </tbody>
                    </table>
                </div>
                    <div class='col-md-4  py-4'>
                        <div class='card p-3'>
                            <h5 class='float-left'>Valor Total: ${price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 8 })} </h5>
                            <h5 class='float-left'>Peças Total: ${qtd}</h5>
    
                            <div class='text-center mt-4'>
                                <h5>Dados da entrega</h5>
                                
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" >logradouro</span>
                                    </div>
                                    <input type="text" onkeyup='setlogradouro(this.value)'  class="form-control"  aria-describedby="basic-addon3">
                                </div>
    
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" >Número</span>
                                    </div>
                                    <input type="text" onkeyup='setNumero(this.value)'  class="form-control"  aria-describedby="basic-addon3">
                                </div>
    
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" >Cep</span>
                                    </div>
                                    <input type="text" onkeyup='setCep(this.value)'  class="form-control"  aria-describedby="basic-addon3">
                                </div>
    
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" >Cidade</span>
                                    </div>
                                    <input type="text" onkeyup='setCidade(this.value)'  class="form-control"  aria-describedby="basic-addon3">
                                </div>
                            </div>
    
                            <div class='text-center mt-4'>
                                <h5>Dados pessoais</h5>
                                <span class='mb-5'> Iremos enviar o boleto para o seu email.</span>
                                <div class="input-group mb-3 mt-3">
                                    
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" >Email</span>
                                    </div>
                                    <input type="text" onkeyup='setEmail(this.value)'  class="form-control"  aria-describedby="basic-addon3">
                                </div>
                            </div>
                            
                            <div class='text-center mt-4'>
                                <button class='btn btn-lg btn-primary' onclick='checkout()'>Finalizar pedido </button>
                            </div>
                        </div>
                    </div>
                
                </div>
            </div>
            `;
        table.innerHTML += content;
    }else{
        const content = `
        <h1>Carrinho</h1>
            <div class='text-center mt-5'>
                <h5>Seu carrinho está vazio</h5>
                <a href='/'>
                <button class='btn btn-sm mt-3 btn-primary'>Ver produtos </button>
                </a>
            </div>
            `;
        table.innerHTML += content;
    }
}