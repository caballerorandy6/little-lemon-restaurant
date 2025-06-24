const ReservationListSkeleton = () => (
  <tr className="animate-pulse">
    <td className="py-2 pr-3 pl-4 sm:pl-0">
      <div className="h-4 w-24 bg-gray-200 rounded" />
    </td>
    <td className="px-2 py-2">
      <div className="h-4 w-16 bg-gray-200 rounded" />
    </td>
    <td className="px-2 py-2">
      <div className="h-4 w-10 bg-gray-200 rounded" />
    </td>
    <td className="py-2 pr-4 pl-3 sm:pr-0">
      <div className="flex gap-2 justify-end">
        <div className="h-8 w-16 bg-gray-200 rounded" />
        <div className="h-8 w-16 bg-gray-200 rounded" />
      </div>
    </td>
  </tr>
);

export default ReservationListSkeleton;
