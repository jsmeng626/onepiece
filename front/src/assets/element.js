import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Table, TableColumn, Form, FormItem, Input, Select, Option, RadioGroup, Radio, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.prototype.$message = Message
