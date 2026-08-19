const turma = [];
const btnCadastrar = document.querySelector('#btnCadastrar');
const filtro = document.querySelector('#sltFiltro');
const tblAlunos = document.querySelector('#tblAlunos');

const calcularMedia = function(n1,n2){
    return (n1 + n2)/2;
}

const definirSituacao = function(media){
    if(media > 7){
        return 'Aprovado'
    }else if(media > 5 && media < 7){
        return 'Recuperação'
    }else {
        return 'Reprovado'
    }
}


const cadastrarAluno = () => {
    const nome = document.querySelector('#iptNome').value; 
    const nota1 = Number(document.querySelector('#iptNota1').value); 
    const nota2 = Number(document.querySelector('#iptNota2').value); 

    if(!nome || !nota1 || !nota2){
        return window.alert("Campo(s) vazios");
    }else if(nota1 > 10 || nota1 < 0 || nota2 > 10 || nota2 < 0){
        return window.alert("Valores incorretos no campo nota");
    }else{
        const media = calcularMedia(nota1,nota2);
        const situacao = definirSituacao(media);
        const aluno = {
            nome,
            nota1,
            nota2,
            media,
            situacao
        }

        turma.push(aluno);
        document.querySelector('#iptNome').value = '';
        document.querySelector('#iptNota1').value = '';
        document.querySelector('#iptNota2').value = '';
        
        renderizarTabela(String(filtro.value));
        console.log(turma);
    }
}

const renderizarTabela = (filtro) => {
    console.log(filtro);
    tblAlunos.innerHTML = '';
    turma.filter((value) => filtro !== 'todos' ? value.situacao === filtro : value).map((aluno) => {
        const tr = document.createElement('tr');
        const tdNome = document.createElement('td');
        const tdNota1 = document.createElement('td');
        const tdNota2 = document.createElement('td');
        const tdMedia = document.createElement('td');
        const tdSituacao = document.createElement('td');
        tdNome.textContent = String(aluno.nome);
        tdNota1.textContent = String(aluno.nota1);
        tdNota2.textContent = String(aluno.nota2);
        tdMedia.textContent = String(aluno.media);
        tdSituacao.textContent = String(aluno.situacao);
        tr.appendChild(tdNome);
        tr.appendChild(tdNota1);
        tr.appendChild(tdNota2);
        tr.appendChild(tdMedia);
        tr.appendChild(tdSituacao);
        tblAlunos.appendChild(tr);
    });
}


btnCadastrar.addEventListener('click', cadastrarAluno);
filtro.addEventListener('change', () => renderizarTabela(filtro.value));
