/**
 * Created by zain on 21/11/2016.
 */

document.drawCanvas = function () {
    var svg = window.opener.document.svg;
    console.log(svg);
    var container = document.getElementById('svgContainer');
    container.innerHTML = '';
    container.appendChild(svg);
};

window.addEventListener('load', function(){
    console.log('Pop up loaded');
    console.log(document);
    console.log(document.drawCanvas);
});
