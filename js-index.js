// var _arrTable = [] // quando declarado fora os valores não vão resetar (USADO EM: addModal)


function add()
{
    iniciaModal()

}

function iniciaModal()
{
    const modal = document.getElementById('modal-add')
    const aba = document.getElementById('newcaixa')
    var t = document.getElementById('t')
    aba.style.display = 'inline-block'
    modal.classList.add('mostrar') // vai adicionar a clase mostar no elemento que estiver com  id modal-add
    modal.addEventListener('click',fechar)

    function fechar(evento) // ao colocar este parametro a função traz uma descrição do evento(n precisa ter o nome evento isso não é um objeto)
    {
        console.log(evento.target) //vai exbir o elemento que recebeu o click
        if(evento.target.id == 'fechar' || aba.target.id == 'fechar')
        {
            
            modal.classList.remove('mostrar')
            aba.style.display = 'none'
        }
    }
     
    
    // const modalAdd = document.getElementById('add-tab')
    // modalAdd.addEventListener('click',addModal)
    
    // function fecharAdd()
    // {
    //     $("#modal-add").modal("hide"); 
    // } fechar modal usando o jquerry
}

const tempCaixa = { //usado só para manipular os registros  por código
    exluir: "a ",
    nome: "sssss"

}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db')) ?? [] 
    // verifcia se array está vazia para isso é usado o ??
    // parse tranfora em objeto(necessário pois o retorno de db_cliete é sting). Para que não seja substuido o valor no local storage é usado isso


function setLocalStorage(dbCaixa)
{
    localStorage.setItem("db",JSON.stringify(dbCaixa))//vai inserir os registros no local storage
    //JSON.stringify(reg) - vai transformar objeto que está sendo passado em string 
}

function addDados(reg)
{   
    const dbCaixa = getLocalStorage() 
    dbCaixa.push(reg)
    setLocalStorage(dbCaixa) // vai passa a variavel para informar a função setLocalStorage qual valor dever ser setado  

}

function exibirDados()
{
    return getLocalStorage()
}

function alterarDados(index,reg)
{
    const dbCaixa = getLocalStorage()
    dbCaixa[index] = reg
    setLocalStorage(dbCaixa)   
}

function deleteDados(index)
{
    const dbCaixa = getLocalStorage()
    dbCaixa.splice(index,1)
    setLocalStorage(dbCaixa)

    //splice serve para recortar o registro, o '1' significa que ele vai remover apenas um registro, no caso, o selecionado
}

function limparCampos()
{
    var inputNome = document.querySelector('#txtnome')
    inputNome.value = ' '
}
exbir()
function adicionarTabModal()
{//nesse método o item é adicionado apenas no local storage
    var nome = document.querySelector('#txtnome').value
    const reg = 
    {
        nome:nome
    }
    //pode ser usado um json para passar vários valores ex de JSNON variável tempCaixa
    addDados(reg)
    limparCampos()
    exbir()
}

function criarItem(reg,index)
{// é criado esse parametro index, pois o forEach passa dois parametros o primeiro elemento e em segundo seu index, e com isso é possível diferenciar os botões excluir 
    var newRow = document.createElement('tr')
    var table = document.querySelector('#exibir')
    
    newRow.innerHTML = 
    `
        <th class="th">
                <button type = "button" id = "excluir-${index}" class="fa-solid fa-trash-can"></button>
        </th>
        <th class = "left-text">${reg.nome}</th>
         
     `
     
     table.appendChild(newRow)
     

}//cria o item na tabela

function clearTable()
{
    const rows = document.querySelectorAll('#exibir tr')
    rows.forEach(row => row.parentNode.removeChild(row))

}

function exbir()
{
    const dbCaixa = exibirDados()
    clearTable()
    dbCaixa.forEach(criarItem)// a função for each envia dois parametros o primeiro elemento segundo index 
}//vai trazer todos os items da tabela


function removerDado(evento) // quem passa o evento é addEventListener
{
    
    if(evento.target.type == 'button')
    {
        const [acao, index] = evento.target.id.split('-')
        console.log(index);
        //split divide o nome do id do index
        // e com [acao, index] isso vai salvar separadamente os valores o nome em acao e o index em index 
        //ISSO SE CHAMA DESTRUTURAÇÃO
        
            const dbCaixa = exibirDados()[index]
            console.log(dbCaixa);
            deleteDados(index)
            exbir()
        
        
        
    }
}// irá remover o dado da tabela 

//eventos
document.querySelector('#add-tab').addEventListener('click',adicionarTabModal)//modal

document.querySelector('#exibir').addEventListener('click',removerDado)

var _btnadd = document.getElementById('add')
_btnadd.addEventListener('click',add)//botao de adicionar da modal




//forma que eu estava fazendo
//eventos
// var c = 0

// function addModal()
// {  
    
//     let nome = document.querySelector('#txtnome').value //pega direto o valor do elemento
        
//     _arrTable.push(nome) // vai salvar o nome que foi inserido no input dentro do array
    
//     let item =     
//      `
//     <tr>
//         <th class="th">
//                 <i  class="fa-solid  fa-trash-can btnexcluir${c}" style ="cursor:pointer"></i>
//         </th>
//         <th class="th" id = "nome">${nome}</th>
//     </tr>
//         `
   
//     let imp = document.getElementById('exibir');
//     imp.innerHTML += item

//     //Limpar input
//     let limpar = document.querySelector("#txtnome")
//     limpar.value = ''

//     // const inpnome = document.getElementById('txtnome')
//      // const nome = inpnome.value

//     // const imp = document.getElementById('exibir')
//     // console.log(userIdIncrement)
    
    
    
   
//     var btnexcluir = document.getElementsByClassName('btnexcluir')
//     btnexcluir.addEventListener('click',excluir) 
    
// }

// function excluir(evento)
// {   
//     alert('safas')  
// }





//eventos
