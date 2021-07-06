document.addEventListener('DOMContentLoaded', function() {
    var select = document.querySelectorAll('select');
    M.FormSelect.init(select);

    //initialize Modal Trigger
    var modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
    
  });
