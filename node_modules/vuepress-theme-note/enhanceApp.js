import './styles/index.scss';

import store from './store'

export default ({
    Vue,
    options,
    router,
    siteData,
}) => {
    Vue.mixin({ store })
}