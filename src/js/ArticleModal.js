import { Modal } from './Modal';

export class ArticleModal extends Modal {
    constructor({ id, title, urlToImage, tags, content, date }, classes) {
        super(classes); // inherit Article
        this.id = id;
        this.title = title;
        this.urlToImage = urlToImage;
        this.tags = tags;
        this.content = content;
        this.date = date;
    }

        // ARTICLE MODAL GENERATOR - return html code as string
    generateContent() {
        let template = '';
        let content = document.createElement('div');
        content.className = 'article-modal__content';
        content.setAttribute('data-id', this.id);

        this.urlToImage &&
            (template += `<img class="strategy__image" src=${this.urlToImage} alt="Strategy">`);

        if (this.title || this.tags || this.content || this.bindEventsdate) {
            template += `<div class="strategy__content">`;

             this.date &&
                (template += `<p class="strategy__date">${this.date}</p>`);
            
            this.title &&
                (template += `<h3 class="strategy__name">${this.title}</h3>`);
            
            this.content &&
            (template += `<p class="strategy__text">${this.content}</p>`);

            if (this.tags) {
                template += `<div class="strategy__tags tags">`;

                this.tags.map(tag => {
                    template += `<span class="tag tag_colored">${tag}</span>`;
                });

                template += `</div>`;
            }
            
            template += `</div>`;
        }

        content.innerHTML = template;
        return content;
    }

    renderModal() {
        let content = this.generateContent();
        super.buildModal(content);
    }
}