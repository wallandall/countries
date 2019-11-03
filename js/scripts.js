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
          add({ name: this.name, flag: this.flag });
        });
        isLoading(false);
      })
      .catch(function(e) {
        isLoading(false);
        throw e;
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;

    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
      })
      .catch(function(e) {
        console.error(e);
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
    if (isObject(country, 2)) {
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
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();
var $spinner = $("#spinner");
countryRepository.loadList().then(function() {
  // Loop throu all items in list
  countryRepository.getAll().forEach(function(country) {
    countryRepository.addListItem(country);
  });
});
