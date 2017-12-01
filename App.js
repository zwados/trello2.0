// OGÓLNA FUNKCJA
function randomString() {
  var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
  var str = '', i;
  for (i = 0; i < 10; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}

var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '2535',
  'X-Auth-Token': 'd5df5497dfa53383cca66dc3a9b09ec6'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
    url: baseUrl + '/board',
    method: 'GET',
    success: function(response) {
      setupColumns(response.columns);
    }
});

function setupColumns(columns) {
    columns.forEach(function (column) {
    	var col = new Column(column.id, column.name);
        board.createColumn(col);
        setupCards(col, column.cards);
    });

function setupCards(col, cards) {
	cards.forEach(function (card) {
        var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
    	col.createCard(card);
  	})
};