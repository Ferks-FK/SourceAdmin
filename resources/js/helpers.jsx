import { MD5 } from "crypto-js";
import { lowerCase } from "lodash";
import { useRef } from "react";

export function md5(string) {
  return MD5(lowerCase(string).trim())
}

export function useDebounce(fn, delay) {
  const timeoutRef = useRef(null)

  function debouncedFn(...args) {
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }

  return debouncedFn
}

export function getStyleAndName(props, t) {
  // TODO: Find a user-friendly way to translate the strings from the `time_bans` table.
  const now = Date.now();
  const end = new Date(props.end_at).getTime();
  const timeBanName = lowerCase(props.time_ban_name)

  if (props.removed_by) {
    return {
      style: 'bg-blue-500',
      name: `${t(timeBanName, { ns: 'table' })} (${t('unbanned', { ns: 'table' })})`
    };
  }

  if (props.time_ban_value === 0) {
    return {
      style: 'bg-red-500',
      name: t(timeBanName, { ns: 'table' })
    };
  }

  if (end > now) {
    return {
      style: 'bg-yellow-500',
      name: props.time_ban_name // The DB result is capitalized here.
    };
  }

  return {
    style: 'bg-green-500',
    name: `${timeBanName} (${t('expired', { ns: 'table' })})`
  };
};

export function getPercentage(props) {
  // Punishment removed or permanent.
  if (props.removed_by || props.time_ban_value == 0) {
    return 100;
  }

  const now = Date.now();
  const end = new Date(props.end_at).getTime();
  const difference = end - now;
  const percentage = 100 - (difference / (1000 * 60 * 60 * 24 * 365)) * 100;

  return percentage > 100 ? 100 : percentage;
};

export function filterData(data, keys, query) {
  return data.filter((item) => keys.some((key) => {
    if (item[key] == null) {
      return null
    }

    return item[key].toLowerCase().includes(query.toLowerCase())
  }))
}

export function separateInternalObjects(array) {
  return array.flatMap(object => Object.entries(object).map(([key, value]) => ({ [key]: value })));
}

export const paginationItems = (data) => ({
  currentPage: data.current_page,
  lastPage: data.last_page,
  perPage: data.per_page,
  total: data.total,
  from: data.from,
  to: data.to,
  nextPageUrl: data.next_page_url,
  prevPageUrl: data.prev_page_url,
  firstPageUrl: data.first_page_url,
  lastPageUrl: data.last_page_url,
})

export function formatSizeUnits(size) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let index = 0;

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024;
    index++;
  }

  return `${size.toFixed(2)} ${units[index]}`;
}
