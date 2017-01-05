  $(window).load(function() {
      var zpAccountKey = document.cookie.replace(/(?:(?:^|.*;\s*)zopimAccount\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      if (zpAccountKey === '') {
          $('#myModal').modal('show');
      } else {
          compileWidget();
      }
  });

  function setCookie(accountKey) {
      // body...
      var zopimAccountKey = accountKey || '3pFpRyGMx2DvIQDECuNVa2TFWCkn9WuJ';
      document.cookie = 'zopimAccount=' + zopimAccountKey;
      compileWidget();
  }
