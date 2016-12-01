$(() => {
  $('#logout').click(function (e) {
    $.post('logout').then(function (response) {
      window.location = '/';
    });
  });
});
