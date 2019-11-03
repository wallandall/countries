const countryRepository = (function() {
  const repository = [];
  const apiURL = "https://restcountries.eu/rest/v2/all";

  function loadList() {}

  function loadDetails(item) {}

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

  function addListItem() {}

  function getAll() {
    return repository;
  }

  function showDetails() {}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

countryRepository.loadList().then(function() {});
