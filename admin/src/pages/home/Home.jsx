import Chart from "../../components/chart/Chart";
import "./home.css";
// import { userData } from "../../dummyData";
// import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
// import WidgetSm from "../../components/widgetSm/WidgetSm";
// import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

export default function Home() {
  //this array is for UI, how we want to display the month names
  //useMemo is used so that the array never changes
    const MONTHS = useMemo(
			() => [
				"Jan",
				"Feb",
				"Mar",
				"Apr",
				"May",
				"Jun",
				"Jul",
				"Agu",
				"Sep",
				"Oct",
				"Nov",
				"Dec",
			],
			[]
		);

	const [userStats, setUserStats] = useState([]);
    useEffect(() => {
      //fetches user stats
			const getStats = async () => {
				try {
					const res = await axios.get("/users/stats", {
						headers: {
							token:
								"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTZmYzQ2NDk0Mjc3MTYwNDg4MmMxNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYyNTgzMjMxMSwiZXhwIjoxNjI2MjY0MzExfQ.ATXV-1TTWIGyVBttTQSf0erRWjsgZ8jHQv1ZsUixbng",
						},
					});
          //sorted so that data is displayed jan, feb, march order
					const statsList = res.data.sort(function (a, b) {
						return a._id - b._id;
					});
					statsList.map((item) =>
						setUserStats((prev) => [
							...prev,
							{ name: MONTHS[item._id - 1], "New User": item.total },
						])
					);
				} catch (err) {
					console.log(err);
				}
			};
			getStats();
		}, [MONTHS]);

  return (
		<div className="home">
			{/* <FeaturedInfo /> */}
			<Chart
				data={userStats}
				title="User Analytics"
				grid
				dataKey="New User"
			/>
			{/* <div className="homeWidgets">
				<WidgetSm />
				<WidgetLg />
			</div> */}
		</div>
	);
}
