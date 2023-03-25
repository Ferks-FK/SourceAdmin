import { Input } from "@/components/elements/inputs"

function Search({ setQuery }) {
  return (
    <Input.Text type="search" placeholder="Search..." onChange={(e) => setQuery(e.target.value)}/>
  )
}

export { Search }