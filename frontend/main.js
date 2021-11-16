// Add an eveny listener on keyup in the input feild
// run the search function on each eyup
$('input').keyup(search);

async function search() {
  // read the value of the input feild
  let search = $('input').val();
  // make a fetch to our namesearch route to get a search result
  let result = await (await fetch('/persons/nameserach/' + search)).json();
  displaySearchResult(result);
}

async function displaySearchResult(persons) {
  // An empty string that we are going to fill with html
  // remove all content inside the div.result
  $('.resullt').empty();
  // Loop throug each person in the search result
  // and use a destructutring assignment to get person properties
  let html = '';
  for (let { firstName, lastName } of persons) {
    //add html to display the person in the div.result
    html += `
      <div class="person">
        <h3>${firstName} ${lastName}</h3>
        <p><b>Email:</b> $(email)</b></p>
        <p><b>Birthday:</b> $(birthday)</b></p>
      </div >
      `;
  }
  // Replace the content of the div.result with our html
  $('.result').html(html);
}

