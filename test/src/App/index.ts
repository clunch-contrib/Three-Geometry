import { Component, ref } from 'nefbl'

import pages from './pages/lazy-load'

import style from './index.scss'
import template from './index.html'

@Component({
    selector: "app-root",
    template,
    styles: [style]
})
export default class {

    currentPage: any

    $setup() {
        return {
            currentPage: ref(null)
        }
    }

    loadPage(event) {
        pages[event.target.innerText.trim()]().then(data => {
            this.currentPage = data.default
        })
    }

}
