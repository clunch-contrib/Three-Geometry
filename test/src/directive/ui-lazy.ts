import { Directive, mountComponent } from 'nefbl'

let interval = null

@Directive({
    selector: "ui-lazy"
})
export default class {

    _module: any

    $update(el, binding) {
        if (binding.value) {
            if (interval) clearInterval(interval)
            el.innerHTML = ""
            interval = mountComponent(el, binding.value, this._module).interval
            el.children[0].setAttribute('class', 'doc-view')
        }
    }
}
