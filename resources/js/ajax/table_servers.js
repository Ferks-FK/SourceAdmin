$(function() {
  $.getJSON('/servers').then(data => createTable({data}))
})

function createTable({data}) {
  console.log(data)
  let table = $("#table_servers")
  let tbody = table.find("tbody tr")
  let url = location.protocol + '//' + location.host
  let row = ''

  for (let i = 0; i < data.length; i++) {
    row += `
    <tr>
      <th>
    </tr>
    `
  }
}
