export default () => {
    if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
        (function(w, d, s, o, f, js, fjs) {            
            w[o] = w[o] || function () {
                (w[o].q = w[o].q || []).push(arguments)
            };
            js = d.createElement(s), fjs = d.getElementsByTagName(s)[0];
            js.id = o;
            js.src = f;
            js.async = 1;
            fjs.parentNode.insertBefore(js, fjs);
        } (window, document, 'script', 'plausible', 'https://'+PLAUSIBLE_DOMAIN+'/js/plausible.js'))
    }
}
