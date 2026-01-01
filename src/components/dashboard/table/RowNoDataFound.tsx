import { LayoutList } from 'lucide-react';
import { memo } from 'react';

const RowNoDataFound = ({ cols }: { cols: number }) => {
    return (
        <tr>
            <td colSpan={cols}>
                <div className='flex items-center h-[70vh]  py-12 gap-3 justify-center flex-col'>
                    <LayoutList className='text-blue' size={'4rem'}/>
                    <h2 className='text-center pt-1 text-xl text-blue font-bold'>No Data Found</h2>
                </div>
            </td>
        </tr>
    );
};

export default memo(RowNoDataFound);