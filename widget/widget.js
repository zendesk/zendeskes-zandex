$(window).load(function() {
    $('#configModal').modal('show');

    $("div#configModal").on('click', '.btn-group > .btn.active', function(e) {
        e.preventDefault();
        e.stopPropagation();
    });

    $("div#configModal").on('click', '.btn-group > .btn', function(e) {
        $(this).addClass("active").siblings().removeClass("active");
        if ($(this).val() === 'true') {
            $('#restricted_hc_info input').attr('data-validate', 'true');
        } else {
            $('#restricted_hc_info input').attr('data-validate', 'false');
        }
        $('#configModal').validator('update');
    });

    $('#form').validator().on('submit', function(e) {
        if (!e.isDefaultPrevented()) {
            e.preventDefault();
            $('#configModal').modal('hide');
            zE_compile($('#subdomain').val().trim(), $('#locale').val().trim());
        }
    });
});



function zE_compile(subdomain, locale) {
    var hostname = subdomain + ".zendesk.com";
    console.log("%cAssuming Web Widget for: " + hostname, "color: red;");
    $('#inner-message').text("Assuming Web Widget for: " + hostname);

    zE_authenticate();

    zE_embedWidget(hostname);

    zE_setup(locale);
}

function zE_authenticate(argument) {
    if ($('#configModal :button.active').val() === 'true') {
        var jwtToken = generateJWTToken();
        window.zESettings = {
            authenticate: {
                jwt: jwtToken
            }
        };
    }
    return;
}

function generateJWTToken() {
    payload = {
        name: $('#customerName').val().trim(),
        email: $('#customerEmail').val().trim(),
        iat: Math.floor(Date.now() / 1000),
        jti: Math.floor(Math.random() * 100000000000000000)
    };
    sharedSecret = $('#sharedSecret').val().trim();
    jwtToken = KJUR.jws.JWS.sign(null, '{"typ":"JWT", "alg":"HS256"}', payload, { "utf8": sharedSecret });

    console.log('Shared Secret:', sharedSecret);
    console.log('Payload:', payload);
    console.log('JWT TOKEN:', jwtToken);

    return jwtToken;
}

function zE_setup(locale) {
    locale = locale || "en-US";
    console.log('Locale Set To:', locale);
    zE(function() {
        zE.setLocale(locale);
        zE.show();
    });
    $('#inner-message').slideToggle(1200, 'linear');
    var URL = window.location.href;
    console.log('%cIf you are looking at logs, the submission url will be from: ' + URL + '. The logs will look as follows:\nProcessing by Requests::EmbeddedController#create as */\*\nParameters: {"set_tags"=>"web_widget", "via_id"=>48, "locale_id"=>1, "submitted_from"=>"' + URL + '", "name"=>"Testing", "email"=>"test@example.com", "description"=>"Help Me!"}', "color: blue;");
}

function zE_identify() {
    zE.activate();
    zE.identify({
        name: $('#inputName').val().trim(),
        email: $('#inputEmail').val().trim(),
        organization: $('#inputOrganization').val().trim(),
    });
}
