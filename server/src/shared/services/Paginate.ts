export function Paginate({ page, perPage, list }) {
  const pageStart = (Number(page) - 1) * Number(perPage)
  const pageEnd = pageStart + Number(perPage)
  const result = list.slice(pageStart, pageEnd)

  return result
}
