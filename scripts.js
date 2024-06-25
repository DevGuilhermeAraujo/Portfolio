// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, {toggle: false});
    
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });
});


//api do gitHub
// script.js
// script.js

// Adiciona um event listener que será executado quando o conteúdo do DOM for carregado
document.addEventListener('DOMContentLoaded', async (event) => {
    // Seleciona o modal pelo seu ID
    const modal = document.getElementById('projectModal');
    // Seleciona o título do modal
    const modalTitle = modal.querySelector('.modal-title');
    // Seleciona o corpo do modal
    const modalBody = modal.querySelector('.modal-body');

    // Função para atualizar o conteúdo do modal
    const updateModalContent = (title, message) => {
        modalTitle.textContent = title; // Atualiza o título do modal
        modalBody.textContent = message; // Atualiza a mensagem (descrição) do modal
    };

    // Função para buscar dados dos repositórios do GitHub
    const fetchGitHubRepos = async (username) => {
        try {
            // Faz uma requisição para a API do GitHub para obter os repositórios de um usuário específico
            const response = await fetch(`https://api.github.com/users/${username}/repos`);
            // Converte a resposta para JSON
            const repos = await response.json();
            // Retorna a lista de repositórios
            return repos;
        } catch (error) {
            // Exibe um erro no console caso a requisição falhe
            console.error('Erro ao buscar repositórios:', error);
            // Retorna uma lista vazia caso ocorra um erro
            return [];
        }
    };

    // Função para criar os cards dos repositórios
    const createRepoCards = (repos) => {
        // Seleciona o container onde os cards serão inseridos
        const container = document.querySelector('.containerProjects .rowProject');
        // Limpa o conteúdo do container antes de adicionar os novos cards
        container.innerHTML = '';

        // Para cada repositório, cria um card
        repos.forEach(repo => {
            // Cria uma div para a coluna
            const col = document.createElement('div');
            col.className = 'col-md-4'; // Adiciona a classe Bootstrap para a coluna

            // Cria uma div para o card
            const card = document.createElement('div');
            card.className = 'card'; // Adiciona a classe Bootstrap para o card
            card.innerHTML = `
                <img src="Informática.png" class="card-img-top" alt="${repo.name}">
                <div class="card-body">
                    <h5 class="card-title">${repo.name}</h5>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary view-more" data-toggle="modal" data-target="#projectModal" data-title="${repo.name}" data-message="${repo.description || 'Sem descrição'}">Ver Mais</button>
                        <a href="${repo.html_url}" target="_blank" class="btn btn-dark">GitHub</a>
                    </div>
                </div>
            `;

            // Adiciona o card à coluna
            col.appendChild(card);
            // Adiciona a coluna ao container
            container.appendChild(col);
        });

        // Adiciona um event listener para todos os botões "Ver Mais"
        const viewMoreButtons = document.querySelectorAll('.view-more');
        viewMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Obtém os atributos de título e mensagem do botão
                const title = button.getAttribute('data-title');
                const message = button.getAttribute('data-message');
                // Atualiza o conteúdo do modal com os dados obtidos
                updateModalContent(title, message);
            });
        });
    };

    // Nome de usuário do GitHub para buscar os repositórios
    const username = 'DevGuilhermeAraujo'; // Substitua pelo seu nome de usuário do GitHub
    // Busca os repositórios do GitHub e cria os cards
    const repos = await fetchGitHubRepos(username);
    createRepoCards(repos);
});

