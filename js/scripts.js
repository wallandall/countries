const countryRepository = (function() {
  const repository = [];
  const apiUrl = "http://restcountries.eu/rest/v2/all";
  const $grid = $(".grid");

  function loadList() {
    isLoading(true);
    return $.ajax(apiUrl, { dataType: "json" })
      .then(function(responseJSON) {
        return responseJSON;
      })
      .then(function(json) {
        $.each(json, function() {
          add({
            name: this.name,
            flag: this.flag,
            capital: this.capital,
            region: this.region,
            demonym: this.demonym,
            currencies: this.currencies,
            languages: this.languages,
            gini: this.gini,
            population: this.population,
            area: this.area,
            latlng: this.latlng,
          });
        });
        isLoading(false);
      })
      .catch(function(e) {
        isLoading(false);
        throw e;
      });
  }

  //Check if object is not an array and of specific length
  function isObject(obj, objLength) {
    return (
      Object.prototype.toString.call(obj) === "[object Object]" &&
      Object.keys(obj).length === objLength
    );
  }

  //Add Country Object
  function add(country) {
    if (isObject(country, 11)) {
      repository.push(country);
    } else {
      throw "Invaid Entry";
    }
  }

  function getAll() {
    return repository;
  }

  //Render Countries to screen
  function addListItem(country) {
    var $countryDIV = $('<div class="country"></div>');
    var $flag = $('<img src = "' + country.flag + '" class= "country__img" />');
    var $name = $("<h3>" + country.name + "</h3>");

    $($grid).append($countryDIV);
    $($countryDIV)
      .append($flag)
      .append($name);

    $countryDIV.on("click", function() {
      showModal(country);
    });
  }

  //Display country information
  function showDetails(item) {
    countryRepository.loadDetails(item).then(function() {
      showModal(item);
    });
  }

  function getList(item) {
    var list = "";
    item.forEach(function(i) {
      list += "<li>" + JSON.stringify(i.name).replace(/"/g, "") + "</li>";
    });
    return "<ul>" + list + "</ul>";
  }

  function showModal(item) {
    $("#modal-container")
      .empty()
      .append('<div class="modal"></div>');
    $(".modal")
      .append('<button class="modal-close">x</div>')
      .append("<h3>" + item.name + "</h3>")

      .append(
        '<div class="modal__img"><img src = "' +
          item.flag +
          '" class= "country__img" /></div>',
      )
      .append(
        '<div class="modal__text-top"><strong>Capital</strong> : ' +
          item.capital +
          "</div>",
      )
      .append(
        '<div class="modal__text-top"><strong>Region</strong>: ' +
          item.region +
          "</div>",
      )
      .append(
        '<div class="modal__text"><strong>Demonym</strong>: ' +
          item.demonym +
          "</div>",
      )
      .append(
        '<div class="modal__text"><strong>Currencies</strong>: ' +
          getList(item.currencies) +
          " </div>",
      )
      .append(
        '<div class="modal__text"><strong>Languages</strong>: ' +
          getList(item.languages) +
          "</div>",
      )
      .append(
        '<div class="modal__text"><strong>Population</strong>: ' +
          item.population +
          "</div>",
      )
      .append(
        '<div class="modal__text"><strong>Area</strong> : ' +
          item.area +
          "k㎡</div>",
      )
      .append(
        '<div class="modal__text"><a href="https://maps.google.com/?q=' +
          item.latlng +
          '" target="_blank">View Map</a></div>',
      );
    $(".modal-close").click(function() {
      hideModal();
    });

    $("#modal-container").addClass("is-visible");
  }

  $("#modal-container").click(function() {
    hideModal();
  });
  $(document).keydown(function(e) {
    if (e.key === "Escape") {
      hideModal();
    }
  });
  //Hide Modal
  function hideModal() {
    $("#modal-container")
      .empty()
      .removeClass("is-visible");
  }

  function isLoading(loading) {
    if (loading) {
      $("#overlay").fadeIn(300);
    } else {
      $("#overlay").fadeOut(300);
    }
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
  };
})();

countryRepository.loadList().then(function() {
  // Loop throu all items in list
  countryRepository.getAll().forEach(function(country) {
    countryRepository.addListItem(country);
  });
});
