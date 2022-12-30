import { now } from "lodash"

$(async function() {
  if (location.pathname === "/bans") {
    await $.getJSON('/bans').then(data => createTable({data}))

    let table = $('#table_bans')
    let tbody = table.find('tbody tr')

    tbody.on('click', function() {
      window.location.href = $(this).data('href')
    })
  }
})

function createTable({data}) {
  let table = $('#table_bans')
  let tbody = table.find('tbody')
  let url = location.protocol + '//' + location.host
  let row = ''

  for (let i = 0; i < data.length; i++) {
    row +=
    `
      <tr data-href="/bans/${data[i].id}" class="cursor-pointer bg-[#1a1e22] border-b dark:border-gray-700 hover:bg-lightDark">
        <th class="flex py-3 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <img src="${url}/images/games/${data[i].mod_icon}.png" class="w-5 mr-1">
        </th>
        <td class="py-3 px-6">${data[i].created_at}</td>
        <td class="py-3 px-6">${data[i].player_name}</td>
        <td class="py-3 px-6">${data[i].admin_name}</td>
        <td class="${styleBanName(data[i])} py-3 px-6">${banName(data[i])}</td>
      </tr>
    `
  }

  tbody.html(row)
}

function banName(data) {
  let end_at = Date.parse(data.end_at)

  if (end_at < now() && data.time_ban_value != 0) {
    return data.time_ban_name + " (Expired)";
  }

  return data.time_ban_name;
}

function styleBanName(data) {
  let end_at = Date.parse(data.end_at)

  if (data.time_ban_value == 0) {
    return "text-red-700"
  }
  else if (end_at < now() && data.time_ban_value != 0) {
    return "text-green-700"
  }
  else {
    return "text-yellow-700"
  }
}
