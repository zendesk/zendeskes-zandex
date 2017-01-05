
function compileWidget() {

	var zpAccountKey = document.cookie.replace(/(?:(?:^|.*;\s*)zopimAccount\s*\=\s*([^;]*).*$)|^.*$/, "$1");

	// if (zpAccountKey === "") zpAccountKey = '3pFpRyGMx2DvIQDECuNVa2TFWCkn9WuJ';

	zpAccountKey = '//v2.zopim.com/?' + zpAccountKey;
	console.log("This is a Web Widget for: " + zpAccountKey);
	$('#inner-message').text("Assuming Web Widget for: " + zpAccountKey);

	window.$zopim||(function(d,s){var z=$zopim=function(c){
	z._.push(c)},$=z.s=
	d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
	_.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');
	$.src=zpAccountKey;z.t=+new Date;$.
	type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');

}