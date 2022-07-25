//remover  o exibir e colocar para atualizar, só para mostrar a função do botão ou colocar no alterar

function limparCampos()
{
    var txtNome = document.querySelector('#txtnome')
    var txtCod = document.querySelector('#txtcod')
    var status = document.querySelector('#ativo-modal')
    txtNome.value = ''
    txtCod.value = ''
    status.removeAttribute('checked','checked')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db')) ?? [] 

const setLocalStorage = (dbCaixa) => localStorage.setItem('db',JSON.stringify(dbCaixa))

exbir()
function addDados(reg)
{   
    const dbCaixa = getLocalStorage()
    dbCaixa.push(reg)
    setLocalStorage(dbCaixa) 
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
}

const camposValidos = () =>
{
    return document.getElementById('form').reportValidity()
}

const ativoModal = (evento) => 
{
    if(evento.target.checked == false)
    {
        var status = document.querySelector('#ativo-modal').dataset.status = 'nativo'
    }else
    {
        var status = document.querySelector('#ativo-modal').dataset.status = 'ativo'
    }
}

function adicionarCaixa()
{   
    if(camposValidos())
    {
        var codigo = document.querySelector('#txtcod').value
        var nome = document.querySelector('#txtnome').value
        var status = document.querySelector('#ativo-modal').dataset.status
        const reg = 
        {
            codigo:codigo.toUpperCase(),
            nome:nome.toUpperCase(),
            status:status
        }
        const index = document.querySelector('#txtcod').dataset.index
        if(index == 'new')
        {
            addDados(reg)
            limparCampos()
        }else
        {
            alterarDados(index,reg)
            exbir()
        }
    }
}

function criarItem(reg,index)
{
    var corpoTable = document.querySelector('#corpotable')
    if(reg.status == 'ativo')
    {
        corpoTable.insertAdjacentHTML('afterbegin',
        `<tr id="linha-${index}">
            <td id ="alterar"class="center-text">
                <button type="button" id="alterar-${index}"class="fa-solid fa-pen-to-square black-icon"></button>
            </td>
            <td id = "exluir"class="center-text">
                <button type="button" id="excluir-${index}" class="fa-solid fa-trash-can"></button>
            </td>
            <td id = "codigo">${reg.codigo}</td>
            <td id = "nome">${reg.nome}</td>
            <td id = "status" class="center-text"><i class="fa-solid fa-check green-icon"></i></td>
            <td id = "id" class="center-text">${index}</td>
        </tr>`)
    }else
    {
    corpoTable.insertAdjacentHTML('afterbegin',
        `<tr id="linha-${index}">
            <td id ="alterar"class="center-text">
                <button type="button" id="alterar-${index}"class="fa-solid fa-pen-to-square black-icon"></button>
            </td>
            <td id = "exluir"class="center-text">
                <button type="button" id="excluir-${index}" class="fa-solid fa-trash-can"></button>
            </td>
            <td id = "codigo">${reg.codigo}</td>
            <td id = "nome">${reg.nome}</td>
            <td id = "status" class="center-text"><i class="fa-solid fa-x red-icon"></i></td>
            <td id = "id" class="center-text">${index}</td>
        </tr>`)
    }
}

function updateTable()
{
    const rows = document.querySelectorAll('#corpotable tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}

function exbir()
{
    const dbCaixa = getLocalStorage()
    updateTable()
    dbCaixa.forEach(criarItem)
}

function preencherCampos(reg)
{
    var txtCod = document.querySelector('#txtcod')
    var txtNome = document.querySelector('#txtnome')
    var checkStatus = document.querySelector("#ativo-modal")
    document.querySelector('#txtcod').dataset.index = reg.index
    txtCod.value = reg.codigo
    txtNome.value = reg.nome
    if(reg.status == 'nativo')
    {
        console.log('aaa ' + reg.index);
        checkStatus.removeAttribute('checked','checked')
    }
    else if (reg.status == 'ativo')
    {
        console.log('aaa ' + reg.index);
        checkStatus.setAttribute('checked','checked')
    }
}

function alterarCaixa(index)
{
    const dbCaixa = getLocalStorage()[index]
    dbCaixa.index = index //ao fazer isso cria o campo index dentro do JSON como um novo campo
    preencherCampos(dbCaixa)
}

function removerAlterar(evento)
{ 
    const [acao, index] = evento.target.id.split('-')
    
    if(acao == 'excluir')
    {
        deleteDados(index)
        exbir()

    }
    else if(acao == 'alterar')
    {
        alterarCaixa(index)
        nomeAba(index)
        iniciaModal()
    }
}

function nomeAba(index)
{
    var aba = document.querySelector('#newcaixa')
    const dbCaixa = getLocalStorage()[index]
    aba.innerHTML = dbCaixa.nome + ' ' + `<button  id="fechar">
    <i class="fa-solid fa-xmark fa-1x white-icon"></i>
    </button>`
}


function iniciaModal()
{
    const modal = document.getElementById('modal-add')
    const aba = document.getElementById('newcaixa')
    aba.style.display = 'inline-block'
    modal.classList.add('mostrar') 
    modal.addEventListener('click',fechar)

    function fechar(evento) 
    {
        if(evento.target.id == 'fechar' || aba.target.id == 'fechar' || evento.target.id == 'gravar')
        {
            modal.classList.remove('mostrar')
            aba.style.display = 'none'
            exbir()
            limparCampos()
            aba.innerHTML = 'Novo Caixa' + ' ' + `<button  id="fechar">
            <i class="fa-solid fa-xmark fa-1x white-icon"></i>
            </button>`
        }
    } 
}




document.querySelector('#gravar').addEventListener('click',adicionarCaixa)//modal

document.querySelector('#corpotable').addEventListener('click',removerAlterar)

document.querySelector('#add').addEventListener('click',iniciaModal)//botao de adicionar da modal

document.querySelector('#atualizar').addEventListener('click',atualizar = () => {
        exbir()
      })

document.querySelector('#ativo-modal').addEventListener('click',ativoModal)