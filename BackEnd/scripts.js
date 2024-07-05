// Função para obter a cor da linguagem
const getLanguageColor = (language) => {
    // Mapeia as cores das linguagens
    const languageColors = {
        'JavaScript': '#f0db4f',
        'Python': '#306998',
        'Java': '#b07219',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'C++': '#00599C',
        'C#': '#178600',
        'TypeScript': '#3178C6',
        'Swift': '#FFAC45',
        'HTML': '#E34F26', // Cor para HTML
        // Adicione mais linguagens e suas cores conforme necessário
    };

    // Retorna a cor da linguagem ou a cor padrão
    return languageColors[language] || 'transparent';
};


const languageIcons = {
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    'Ruby': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    'Go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    'C++': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    'C#': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'Swift': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg',
    'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    // Adicione mais ícones conforme necessário
};
 

const generateLanguageFilter = (repos) => {
    const languages = new Set();
    repos.forEach(repo => {
        if (repo.language) {
            languages.add(repo.language);
        }
    });

    const languageFilter = document.getElementById('languageFilter');
    languages.forEach(language => {
        const option = document.createElement('option');
        option.value = language;
        option.textContent = language;
        languageFilter.appendChild(option);
    });

    languageFilter.addEventListener('change', () => {
        const selectedLanguage = languageFilter.value;
        filterReposByLanguage(selectedLanguage, repos);
    });
};

const filterReposByLanguage = (language, repos) => {
    const filteredRepos = language ? repos.filter(repo => repo.language === language) : repos;
    createRepoCards(filteredRepos);
};

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

const updateModalContent = (title, message) => {
    const modal = document.getElementById('projectModal');
    const modalTitle = modal.querySelector('.modal-title');
    const modalBody = modal.querySelector('.modal-body');

    modalTitle.textContent = title; // Atualiza o título do modal
    modalBody.textContent = message; // Atualiza a mensagem (descrição) do modal
};

const fetchGitHubRepos = async (username) => {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const repos = await response.json();
        generateLanguageFilter(repos); // Gera o filtro de linguagens
        createRepoCards(repos); // Chama a função para criar os cards dos repositórios
    } catch (error) {
        console.error('Erro ao buscar repositórios:', error);
        // Trate o erro adequadamente, por exemplo, mostrando uma mensagem ao usuário
    }
};

const createRepoCards = (repos) => {
    const container = document.querySelector('.containerProjects .rowProject');
    container.innerHTML = ''; // Limpa o conteúdo do container antes de adicionar os novos cards

    repos.forEach(repo => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        const card = document.createElement('div');
        card.className = 'card';
        const languageIcon = repo.language && languageIcons[repo.language] ? languageIcons[repo.language] : 'https://via.placeholder.com/20';
        const languageColor = getLanguageColor(repo.language);

        card.innerHTML = `
            <img src="caminho/para/sua/imagem.jpg" class="card-img-top img-fluid" alt="Imagem do card" onerror="this.src='https://via.placeholder.com/300x200.png?text=Imagem+Indisponível'; this.alt='Imagem Indisponível';">
            <div class="card-body">
                <h5 class="card-title">${repo.name}</h5>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-primary view-more" data-toggle="modal" data-target="#projectModal" data-title="${repo.name}" data-message="${repo.description || 'Sem descrição'}">Ver Mais</button>
                    <a href="${repo.html_url}" target="_blank" class="btn btn-dark">GitHub</a>
                </div>
                ${repo.language ? `
                    <div class="mt-2">
                        <img src="${languageIcon}" alt="${repo.language} icon" width="40" class="language-icon" style="--language-color: ${languageColor}; border-color: ${languageColor};">
                        <span class="language-name" style="--language-color: ${languageColor};">${repo.language}</span>
                    </div>
                ` : ''}
            </div>
        `;

        col.appendChild(card);
        container.appendChild(col);
    });

    addModalEventListeners(); // Adiciona os event listeners para os botões "Ver Mais"
};

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

document.addEventListener('DOMContentLoaded', init);
