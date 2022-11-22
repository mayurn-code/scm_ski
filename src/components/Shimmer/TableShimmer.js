import Shimmer from 'react-js-loading-shimmer';


const TableShimmer = ({ columnCount, rowCount }) => {
    return (
        <>
            {Array.from(Array(rowCount), (e, i) => {
                return <TableShimmerRow columnCount={columnCount} />
            })}
        </>
    )
}
export default TableShimmer;


const TableShimmerRow = ({ columnCount }) => {
    return (
        <>
            <tr>
                {Array.from(Array(Number(columnCount)), (e, i) => {
                    return <td key={i}><Shimmer /> </td>
                })}
            </tr>
        </>
    )
}