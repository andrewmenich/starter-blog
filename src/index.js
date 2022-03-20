/**
 * This file kicks off Webpack's tasks to minify and compile CSS and JS.
 */
import './scripts/bootstrap-carousel';

if(module.hot){
    module.hot.accept();
}
/**
 * Bootstrap carousel standalone from https://codepen.io/derekjp/pen/QjmxdK
 */
$('.carousel').carousel({
    interval: 0
});