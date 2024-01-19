//Coletar os valores do forms quando apertar o botão adicionar
//Adicionar os valores ao artigo e inserí-lo no container principal
//Printar na tela os novos valores


const addBtn = document.getElementById("code_add");



addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    //Buscando os preenchimentos do formulário
    const codeName = document.getElementById('code_name');
    const codeContent = document.getElementById('code_content');
    const codeDesc = document.getElementById('code_info');
    //Buscando o texto dentro dos preenchimentos
    const name = codeName.value
    const content = codeContent.value
    const desc = codeDesc.value
    //Verificando se os dados foram preenchidos
    if (name == '' || content == '' || desc == '') {
        window.alert('Não deixe nada em branco')
    } else {
        //Chamando a função de adicionar código caso todos os valores estejam preenchidos
        addCode(name, content, desc)
    }
});

//Selecionando o local onde serão adicionados os códigos
const contentContainer = document.querySelector(".content_container");

function addCode(name, content, desc) {
    //Definindo o valor que será adicionado conforme os dados name, content e desc
    let codeBody = 
    `<article class="code">
    <h1>${name}</h1>
    <p>
        <code class="code_text">
${content}
        </code>
    </p>
    <p class="code_desc">
        ${desc}
    </p>
    <div class="code_buttons">
        <button class="code_button" id="copy_code" onclick="editCode(event)">
            <i class="fa-solid fa-pen"></i>
        </button>
        <button class="code_button" id="del_code" onclick="deleteCode(event)">
            <i class="fa-solid fa-trash"></i>
        </button>
        <button class="code_button" id="edit_code" onclick="copyCode(event)">
            <i class="fa-solid fa-copy"></i>
        </button>
    </div>
    </article>`
    //Adicionando o código ao container de códigos sem excluir os que já existem
    contentContainer.innerHTML += codeBody
}

function deleteCode(event) {
    const loc = event.target; //Localiza onde a função foi chamada (em qual dos botões)

    const closestArticle = findClosestArticle(loc); //Aciona a função para encontrar o article mais próximo (contém o nosso código)

    if (closestArticle) { //Se houver um closest article, será removido
        closestArticle.remove();
    }
}

function findClosestArticle(element) {
    // Percorrerá por todos os elementos pais do target (de onde foi localizada)
    while (element && !element.classList.contains('code')) { //Enquanto houver um elemento, e a classe dele for diferente de "code", que é a classe do article, irá estar em loop até encontrar
        element = element.parentNode; //Buscará o elemento e subirá um grau de parentesco (se isso estiver correto de se dizer)
    }

    // Return no article encontrado com a classe "code"
    return element; 
}

//Função para copiar o código
function copyCode(event) {
    const loc = event.target; //Localiza onde foi acionada a função
    
    const closestArticle = findClosestArticle(loc); //Localiza o article mais próximo dela

    if (closestArticle) { //Se houver um closest article
        const codes = document.querySelectorAll('.code_text') //Busca todos os códigos da página
        

        codes.forEach((code) => { //Para cada código
            if (closestArticle.contains(code)){ //Se o article mais próximo conter o código
                codetxt = code.innerHTML //Buscar o valor dentro dele (o próprio código)
                navigator.clipboard.writeText(codetxt); //Copiar para a área de transferência
            }
        }) 

    }

}

//Edição de código
//Buscar o popup de edição e a área de texto dele

const popupContainer = document.querySelector('#popupContainer')
const popupContent = document.querySelector('#editCodeTxt')

function editCode(event) {
    //Abre o popup
    popupContainer.style.display = 'block';

    const loc = event.target; //Localiza onde foi acionada a função
    
    const closestArticle = findClosestArticle(loc); //Localiza o article mais próximo dela

    if (closestArticle) { //Se houver um closest article
        const codes = document.querySelectorAll('.code_text') //Busca todos os códigos da página

        codes.forEach((code) => { //Para cada código
            if (closestArticle.contains(code)){ //Se o article mais próximo conter o código
                codetxt = code.innerHTML //Buscar o valor dentro dele (o próprio código)
                popupContent.value = codetxt

                const editDoneBtn = document.querySelector('#editDone')
                editDoneBtn.addEventListener('click', () => {
                    edit(codetxt, updateCode)
                })

                function updateCode(newCode) {
                    code.innerHTML = newCode
                }
            }
        })
        


        
    }
}

function closeEdit(event) {
    //Fecha o popup
    popupContainer.style.display = 'none';
    popupContent.value = '';
}

function edit(oldTxt, updateFunction , newTxt) {
    newTxt = popupContent.value
    oldTxt = newTxt
    updateFunction(oldTxt)
    console.log(oldTxt)
}