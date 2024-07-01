// scripts.js

// Função para lidar com a inicialização do documento
const init = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.getElementById('navbarNav');
    const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            if (menuToggle.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });

    const username = 'DevGuilhermeAraujo'; // Substitua pelo seu nome de usuário do GitHub
    fetchGitHubRepos(username);
};

// Função para atualizar o conteúdo do modal
const updateModalContent = (title, message) => {
    const modal = document.getElementById('projectModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');

    modalTitle.textContent = title; // Atualiza o título do modal
    modalBody.textContent = message; // Atualiza a mensagem (descrição) do modal
};

// Função para buscar dados dos repositórios do GitHub
const fetchGitHubRepos = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
        createRepoCards(repos); // Chama a função para criar os cards dos repositórios
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        // Trate o erro adequadamente, por exemplo, mostrando uma mensagem ao usuário
    }
};

// Função para criar os cards dos repositórios
const createRepoCards = (repos) => {
    const container = document.querySelector('.containerProjects .rowProject');
    container.innerHTML = ''; // Limpa o conteúdo do container antes de adicionar os novos cards

    repos.forEach(repo => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="caminho/para/sua/imagem.jpg" class="card-img-top img-fluid" alt="Imagem do card" onerror="this.src='https://via.placeholder.com/300x200.png?text=Imagem+Indisponível'; this.alt='Imagem Indisponível';">
            <div class="card-body">
                <h5 class="card-title">${repo.name}</h5>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-primary view-more" data-toggle="modal" data-target="#projectModal" data-title="${repo.name}" data-message="${repo.description || 'Sem descrição'}">Ver Mais</button>
                    <a href="${repo.html_url}" target="_blank" class="btn btn-dark">GitHub</a>
                </div>
            </div>
        `;

        col.appendChild(card);
        container.appendChild(col);
    });

    addModalEventListeners(); // Adiciona os event listeners para os botões "Ver Mais"
};

// Função para adicionar event listeners aos botões "Ver Mais" nos cards
const addModalEventListeners = () => {
    const viewMoreButtons = document.querySelectorAll('.view-more');
    viewMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const title = button.getAttribute('data-title');
            const message = button.getAttribute('data-message');
            updateModalContent(title, message); // Atualiza o conteúdo do modal com os dados obtidos
        });
    });
};

// Event listener para carregar o conteúdo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', init);
