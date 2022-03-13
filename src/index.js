import { Article } from './js/Article';
import { ArticleModal } from './js/ArticleModal';
import { Modal } from './js/Modal';

const data = [
    {
        id: 1,
        title: 'Increasing Prosperity With Positive Thinking',
        urlToImage: './src/assets/1.png',
        tags: ['Art', 'Design'],
        content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
        date: '01.01.2022'
    },
    {
        id: 2,
        title: 'Increasing Prosperity With Positive Thinking',
        urlToImage: './src/assets/2.png',
        tags: ['Culture'],
        content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
        date: '01.01.2022'
    },
    {
        id: 3,
        title: 'Increasing Prosperity With Positive Thinking',
        urlToImage: './src/assets/3.png',
        tags: ['Culture', 'Design', 'Art'],
        content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
        date: '01.01.2022'
    },
    // {
    //     id: 4,
    //     title: 'Increasing Prosperity With Positive Thinking',
    //     urlToImage: './src/assets/4.png',
    //     tags: ['Culture', 'Design', 'Art'],
    //     content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
    //     date: '01.01.2022'
    // },
    // {
    //     id: 5,
    //     title: 'Increasing Prosperity With Positive Thinking',
    //     urlToImage: './src/assets/5.png',
    //     tags: ['Design'],
    //     content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don’t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What’s my passion? What kind of career fits my personality?',
    //     date: '01.01.2022'
    // },
];

window.onload = function () {

    // RENDER ARTICLES
    if (data) {
        renderArticlesToDom();
    }

    // TAGS
    addTagsClickHandler();

    // GENERATE BASE MODAL FROM MODAL CLASS
    addToolsClickHandler();
};

const addTagsClickHandler = () => {
    document.querySelector('.strategies__tags').addEventListener('click', (e) => {
        if (e.target.classList.contains('tag')) {
            let clickedTag = e.target;
            removeSelectedTags();
            selectClickedTag(clickedTag);

            if (clickedTag.textContent === 'All') {
                showAllStrategies();
            } else {
                filterStrategyBySelectedTag(clickedTag.textContent);
            }
        }
    });
};

const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.strategies__tags .tag');
    tags.forEach(tag => {
        tag.classList.remove('tag_selected');
        tag.classList.add('tag_bordered');
        // tag.classList.replace('tag_selected', 'tag_bordered');
    });
};

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.remove('tag_bordered');
    clickedTag.classList.add('tag_selected');
};

const showAllStrategies = () => {
    let strategies = document.querySelectorAll('.strategy-wrapper .strategy');
    strategies.forEach(strategy => {
        strategy.classList.remove('strategy_hidden');
    });
};

const filterStrategyBySelectedTag = (selectedTag) => {
    let strategies = document.querySelectorAll('.strategy-wrapper .strategy');
    strategies.forEach(strategy => {
        strategy.classList.add('strategy_hidden');
        strategy.querySelectorAll('.tag').forEach(tag => {
            if (tag.textContent === selectedTag) {
                strategy.classList.remove('strategy_hidden');
            }
        });
    });
};

const renderArticlesToDom = () => {
    let strategiesWrapper = getStrategiesWrapper();
    generateArticles(data).forEach(article => {
        strategiesWrapper.append(article.generateArticle());
    });

    addStrategyClickHandler();
};

const getStrategiesWrapper = () => {
    const strategiesContainer = document.querySelector('.strategy-wrapper');
    strategiesContainer.innerHTML = '';
    return strategiesContainer;
};

const generateArticles = (data) => {
    let articles = [];
    data.forEach(article => {
        articles.push(new Article(article));
    });
    return articles;
};

// MODAL WINDOW

const addToolsClickHandler = () => {
    document.querySelector('.tools__button .button').addEventListener('click', () => {
        generateToolsModal();
    });
};

const generateToolsModal = () => {
    renderModalWindow('Test content for Tools Modal');
};

const renderModalWindow = (content) => {
    let modal = new Modal('modal', 'tools-modal');
    modal.buildModal(content);
};

const addStrategyClickHandler = () => {
    document.querySelector('.strategy-wrapper').addEventListener('click', (e) => {
        if (e.target.closest('.strategy')) {
            let clickedStrategyId = e.target.closest('.strategy').getAttribute('data-id');
            let clickedStrategyData = getClickedData(clickedStrategyId);

            renderArticleModalWindow(clickedStrategyData);
        }
    });
};

const getClickedData = (id) => {
    return data.find(article => article.id == id); // number and string are compared!!!
};

const renderArticleModalWindow = (content) => {
    let modal = new ArticleModal(content, 'modal', 'article-modal');
    modal.renderModal();
};