import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.component(Message.name, Message)// 用use每次页面刷新都会弹出message
Vue.prototype.$message = Message
