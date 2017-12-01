// KLASA KANBAN CARD
function Card(id, name) {
  var self = this;
  
  this.id = id;
  this.name = name || 'No name given';
  this.element = createCard();

  function createCard() {
    var card = $('<li class="card"></li>');
    var cardDeleteBtn = $('<button class="btn-delete">x</button>');
    var cardDescription = $('<p class="card-description"></p>');
    
    cardDeleteBtn.click(function(){
      self.removeCard();
    });
    
    card.append(cardDeleteBtn);
    cardDescription.text(self.name);
    card.append(cardDescription)
    return card;
  }
}
Card.prototype = {
  removeCard: function() {
    var self = this;
    $.ajax({
      url: baseUrl + '/card/' + self.id,
      method: 'DELETE',
      success: function(){
        self.element.remove();
      }
    });
  }
}

  $('.create-column')
  .click(function(){
    board.createColumn(new Column(prompt('Wpisz nazwę kolumny')));
  });

  // KLASA KANBAN COLUMN
  function Column(id, name) {
    var self = this;

    this.id = id;
    this.name = name;
    this.element = createColumn();

    function createColumn() {
      // TWORZENIE NOWYCH WĘZŁÓW
      var column = $('<div class="column"></div>');
      var columnTitle = $('<h2 class="column-title">' + self.name + '</h2>');
      var columnCardList = $('<ul class="card-list"></ul>');
      var columnDelete = $('<button class="btn-delete">x</button>');
      var columnAddCard = $('<button class="column-add-card">Dodaj kartę</button>');

      // PODPINANIE ODPOWIEDNICH ZDARZEŃ POD WĘZŁY
      columnDelete.click(function() {
        self.deleteColumn();
      });
      columnAddCard.click(function(event) {
        event.preventDefault();
        self.createCard(new Card(prompt("Wpisz nazwę karty")));
      });

      // KONSTRUOWANIE ELEMENTU KOLUMNY
      column.append(columnTitle)
      .append(columnDelete)
      .append(columnAddCard)
      .append(columnCardList);
      return column;
    }
  }
  Column.prototype = {
    createCard: function(card) {
      this.element.children('ul').append(card.element);
    },
    deleteColumn: function() {
      this.element.remove();
    }
  };

  // KLASA KANBAN CARD
  function Card(id, name) {
    var self = this;

    this.id = id;
    this.description = name;
    this.element = createCard();

    function createCard() {
      var card = $('<li class="card"></li>');
      var cardDeleteBtn = $('<button class="btn-delete">x</button>');
      var cardDescription = $('<p class="card-description"></p>');
      cardDeleteBtn.click(function(){
        self.removeCard();
      });
      card.append(cardDeleteBtn);
      cardDescription.text(self.description);
      card.append(cardDescription)
      return card;
    }
  }
  Card.prototype = {
    removeCard: function() {
      this.element.remove();
    }
  }


