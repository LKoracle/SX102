interface NearbyCustomersCardProps {
  data: Record<string, unknown>;
}

interface NearbyCustomer {
  name: string;
  distance: string;
  address: string;
  tag: string;
  lastContact: string;
  note: string;
}

export function NearbyCustomersCard({ data }: NearbyCustomersCardProps) {
  const customers = data.customers as NearbyCustomer[];

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">📍 附近客户推荐</h3>
      </div>
      <div className="p-2 space-y-2">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="border border-gray-100 rounded-lg p-3 flex items-start gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-[15px] flex-shrink-0">
              {customer.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-[15px]">{customer.name}</span>
                <span className="text-[13px] text-primary font-medium flex items-center gap-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                  {customer.distance}
                </span>
              </div>
              <p className="text-[13px] text-text-secondary">{customer.address}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[13px] bg-gray-50 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">
                  {customer.tag}
                </span>
                <span className="text-[13px] text-text-secondary">
                  {customer.lastContact}联系
                </span>
              </div>
              <p className="text-[13px] text-text-secondary mt-1">💡 {customer.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
