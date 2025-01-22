// JavaScript - Menu sanduiche
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', function(event) {
            if (!event.target.classList.contains('learn-more')) {
                return;
            }
            
            const isExpanded = this.classList.contains('expanded');

            if (!isExpanded) {
                cards.forEach(c => {
                    c.classList.remove('expanded');
                });
                this.classList.add('expanded');
                this.style.backgroundColor = 'black';
                this.style.color = 'white';
                const h3 = this.querySelector('h3');
                h3.style.color = 'green';
                h3.style.textTransform = 'uppercase';
                const paragraphs = this.querySelectorAll('p');
                paragraphs.forEach(p => {
                    p.style.textAlign = 'justify';
                });
            } else {
                this.classList.remove('expanded');
                this.style.backgroundColor = '';
                this.style.color = '';
                const h3 = this.querySelector('h3');
                h3.style.color = '';
                h3.style.textTransform = '';
                const paragraphs = this.querySelectorAll('p');
                paragraphs.forEach(p => {
                    p.style.textAlign = '';
                });
            }
        });
    });
});


/*TIME LINE ESTRUTURA E FUNÇÕES */
document.addEventListener('DOMContentLoaded', () => {
    const botoes = document.querySelectorAll('.time-line-container button');
    const conteudos = document.querySelectorAll('.conteudo');

    if (botoes.length === 0 || conteudos.length === 0) {
        console.error("Elementos da linha do tempo não encontrados. Verifique o HTML.");
        return; 
    }

    function mostrarConteudo(alvo) {
        conteudos.forEach(conteudo => conteudo.classList.remove('ativo'));
        document.getElementById(alvo).classList.add('ativo');
    }

    function ativarBotao(botao) {
        botoes.forEach(b => b.classList.remove('active'));
        botao.classList.add('active');
    }


    botoes.forEach(botao => {
        botao.addEventListener('click', () => {
            const alvo = botao.dataset.target;

            if (!alvo) {
                console.error("Botão sem atributo data-target.");
                return; 
            }

            mostrarConteudo(alvo);
            ativarBotao(botao);
        });
    });

    if (conteudos.length > 0 && botoes.length > 0) {
        mostrarConteudo(botoes[0].dataset.target);
        ativarBotao(botoes[0]);
    }

});


/*BACK-END - MYSQL - NODE.JS e MONGODB*/

