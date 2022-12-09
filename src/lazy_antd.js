import Vue from 'vue';
import 'ant-design-vue/dist/antd.css';
import {
    Button,
    Layout,
    Tag,
    // Form,
    Input,
    FormModel,
    Upload,
    Icon,
    Divider,
    Spin,
    Row,
    Col,
    Message,
    Empty,
    Result,
    Table,
    PageHeader,
    Popover,
    Checkbox,
} from 'ant-design-vue';



Vue.use(Button);
Vue.use(Layout);
Vue.use(Tag);
// Vue.use(Form);
Vue.use(Input);
Vue.use(FormModel);
Vue.use(Upload);
Vue.use(Icon);
Vue.use(Divider);
Vue.use(Spin);
Vue.use(Row);
Vue.use(Col);
Vue.use(Empty);
Vue.use(Result);
Vue.use(Table);
Vue.use(PageHeader);
Vue.use(Popover);
Vue.use(Checkbox);

Vue.prototype.$message = Message;