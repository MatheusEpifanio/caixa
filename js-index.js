
var _btnadd = document.getElementById('add')
_btnadd.addEventListener('click',add)



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
let _arrTable = [] 
function addModal()
    {  

          let nome = document.querySelector('#txtnome').value
        
          _arrTable.push(nome)
         
        let item = 
        
        `<tr>
        <td></td>
        <td>${nome}</td>
        </tr>
        `
        
      
        let imp = document.getElementById('exibir');
        imp.innerHTML += `${item}`;

        //Limpar input
        let limpar = document.querySelector("#txtnome")
        limpar.value = ''
        
        // const inpnome = document.getElementById('txtnome')
        // const nome = inpnome.value

        // const imp = document.getElementById('exibir')
    
    }