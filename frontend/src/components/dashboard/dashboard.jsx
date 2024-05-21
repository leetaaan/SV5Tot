import BarChart from "../barChart/barChart";
import Information from "../infomationTable/informationTable";
import PieChart from "../pieChart/pieChart";

const DashBoard = () => {
  return (
    <div className="my-10 mx-10 overflow-visible">
      <div className="grid grid-cols-3 gap-x-8 h-full">
        <div className="min-h-24 border-r-4 rounded border-gray shadow-md">
          <div className="text-xl font-semibold p-2 mx-3">
            Tổng số người dùng
          </div>
          <div className="p-2 mx-3">200</div>
        </div>
        <div className="min-h-24 border-r-4 rounded border-red shadow-md">
          <div className="text-xl font-semibold p-2 mx-3">
            Tổng số người dùng
          </div>
          <div className="p-2 mx-3">200</div>
        </div>
        <div className="min-h-24 border-r-4 rounded border-purple shadow-md">
          <div className="text-xl font-semibold p-2 mx-3">
            Tổng số người dùng
          </div>
          <div className="p-2 mx-3">200</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-2 mt-3">
        <PieChart />
        <BarChart />
      </div>
      <div className="max-h-10 w-full mt-5 ">
        <div className="flex w-full justify-between mb-2 ">
          <div className="font-semibold">Thông tin sinh viên</div>
          <div className="text-blue">Xem tất cả</div>
        </div>
        <Information />
      </div>
    </div>
  );
};

export default DashBoard;
