const RowLoader = ({ rows, cols }) => {
    return (
        Array.from({ length: rows }).map((_, i) => {
            return (
                <tr >
                    {Array.from({ length: cols }).map((_, i) => {
                        return (<td className="p-4 bg-gray">
                            <div className="animate-pulse bg-blue-light p-4 h-4 rounded"></div>
                        </td>)
                    })}
                </tr>
            )
        })
    )
}

export default RowLoader;