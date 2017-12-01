var board = {
  name: 'Tablica Kanban',
  createColumn: function(column) {
    this.element.append(column.element);
    initSortable();
  },
  element: $('#board .column-container')
};

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '2535',
  'X-Auth-Token': 'd5df5497dfa53383cca66dc3a9b09ec6'
};

$('.create-column')
    .click(function() {
        var columnName = prompt('Enter a column name');
        $.ajax({
        url: baseUrl + '/column',
        method: 'POST',
        data: {
              name: columnName
        },
        success: function(response){
          var column = new Column(response.id, columnName);
          board.createColumn(column);
            }
        });
});
  
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder'
    }).disableSelection();
  }