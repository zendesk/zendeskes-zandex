$(window).load(function() {
    $('#myModal').modal('show');

    $("div#myModal").on('click', '.btn-group > .btn.active', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $("div#myModal").on('click', '.btn-group > .btn', function(e) {
        $(this).addClass("active").siblings().removeClass("active");
        if ($(this).val() === 'true') {
            $('#restricted_hc_info input').attr('data-validate', 'true');
        } else {
            $('#restricted_hc_info input').attr('data-validate', 'false');
        }
        $('#myModal').validator('update');
    });

    $('#form').validator().on('submit', function(e) {
        if (!e.isDefaultPrevented()) {
            e.preventDefault();
            $('#myModal').modal('hide');
            compileWidget($('#subdomain').val(), $('#zeLocale').val());
        }
    });
});



  function compileWidget(subdomain,locale) {
      var zdSubdomain = subdomain;
      zdSubdomain = zdSubdomain + ".zendesk.com";
      console.log("This is a Web Widget for: " + zdSubdomain + locale);
      $('#inner-message').text("Assuming Web Widget for: " + zdSubdomain);

      if ($('#myModal :button.active').val() === 'true') generateJWTToken();

      /*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var o=this.createElement("script");n&&(this.domain=n),o.id="js-iframe-async",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload="document._l();">'),o.close()}("https://assets.zendesk.com/embeddable_framework/main.js",zdSubdomain);
      /*]]>*/

      zEsinatra(locale);
  }

  function generateJWTToken(){
    payload = {
      name: $('#customerName').val(),
      email: $('#customerEmail').val(),
      iat: Math.floor(Date.now() / 1000),
      jti:  Math.floor(Math.random() * 100000000000000000)
    };
    sharedSecret = $('#sharedSecret').val();
    jwtToken = KJUR.jws.JWS.sign(null, '{"typ":"JWT", "alg":"HS256"}', payload, {"utf8": sharedSecret});

    console.log('Shared Secret: ', sharedSecret);
    console.log('Payload: ', payload);
    console.log('JWT TOKEN: ', jwtToken);

    window.zESettings = {
        authenticate: {
            jwt: jwtToken
        }
    };
  }

  function zEsinatra(locale) {
    locale = locale || "en-US";
    console.log('Locale Set To: ' + locale);
      zE(function() {
          zE.setLocale(locale);
          zE.show();
      });
  }

  function goGoWebWidget() {
      zE.activate();
      zE.identify({
          name: $('#inputName').val(),
          email: $('#inputEmail').val(),
          externalId: $('#inputExternalId').val(),
          organization: $('#inputOrganization').val(),
      });
  }
