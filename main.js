const url = 'https://swapi.co/api/species/1/?format=json';

function fetchData(url) {
  return fetch(url).then((resp) => resp.json());
}

function constructTableRow(data) {
  const row = document.createElement('tr');
  const { name, height, mass, hair_color } = data;
  row.appendChild(constructElement('td', name));
  row.appendChild(constructElement('td', height));
  row.appendChild(constructElement('td', mass));
  row.appendChild(constructElement('td', hair_color));
  return row;
}

function constructElement(tagName, text, cssClasses) {
  const el = document.createElement(tagName);
  const content = document.createTextNode(text);
  el.appendChild(content);
  if (cssClasses) {
    el.classList.add(...cssClasses);
  }
  return el;
}

const swTable = document.getElementById('sw-table').getElementsByTagName('tbody')[0];

fetchData('https://swapi.co/api/people/').then((data) => {
  //console.log(data);
  data.results.forEach(result => {
    const row = constructTableRow(result);
    swTable.appendChild(row);
  });
});

function filterName() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filter");
  filter = input.value.toUpperCase();
  table = document.getElementById("sw-table");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}