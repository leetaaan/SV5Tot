import { useContext, useState } from "react";
import { UserContext } from "../App";
import { filterPaginationData } from "../common/filter-pagination-data";

const Notifications = () => {

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const [filter, setFilter] = useState("Tất cả");
  const [ notifications, setNotifications ] = useState(null)

  let filters = ["Tất cả", "Thích", "Bình luận", "Trả lời"];

  const fetchNotifications = ({ page, deletedDocCount = 0 }) => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/notifications",
        {
          page,
          filter,
          deletedDocCount,
        },
        {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          },
        }
      )
      .then(async ({ data: { notifications: data } }) => {

        let formatedData = await filterPaginationData({
          state: notifications,
          data,
          page,
          countRoute: "/all-notifications-count",
          data_to_send: { filter },
          user: access_token
        })
        setNotifications(formatedData)
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleFilter = (e) => {
    let btn = e.target;
    setFilter(btn.innerHTML);
  };
  return (
    <div>
      <h1 className="max-md:hidden">Thông báo gần đây</h1>
      <div className="my-8 flex gap-6">
        {filters.map((filterName, i) => {
          return (
            <button
              className={
                "py-2 " + (filter == filterName ? "btn-dark" : "btn-light")
              }
              key={i}
              onClick={handleFilter}
            >
              {filterName}
            </button>
          );
        })}
      </div>
    </div>
  );
};
export default Notifications;
