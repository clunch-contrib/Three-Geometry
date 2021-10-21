import { Module } from 'nefbl'

// 组件
import AppComponent from './App/index'

// 指令
import uiBind from './directive/ui-bind'
import uiModel from './directive/ui-model'
import uiOn from './directive/ui-on'
import uiLazy from './directive/ui-lazy'

@Module({
    declarations: [
        AppComponent,
        uiBind, uiModel, uiOn, uiLazy
    ],
    imports: [],
    exports: [],
    bootstrap: AppComponent
})
export default class {

}
