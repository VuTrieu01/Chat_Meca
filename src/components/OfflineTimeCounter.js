import React, { useState, useEffect } from "react";

export default function OfflineTimeCounter(props) {
  const [offlineTime, setOfflineTime] = useState(0);
  const [offlineUnit, setOfflineUnit] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      // Tính thời gian offline tính đến thời điểm hiện tại và chuyển đổi sang phút, giờ, ngày, tuần hoặc tháng
      const now = new Date();
      const offlineDuration = now.getTime() - props.lastLoggedInTime;
      const offlineMinutes = Math.floor(offlineDuration / 60000);
      const offlineHours = Math.floor(offlineDuration / 3600000);
      const offlineDays = Math.floor(offlineDuration / 86400000);
      const offlineWeeks = Math.floor(offlineDuration / 604800000);
      const offlineMonths = Math.floor(offlineDuration / 2592000000);

      // Đặt giá trị offlineUnit tương ứng với thời gian offline
      if (offlineDuration < 3600000) {
        setOfflineUnit("phút");
        setOfflineTime(offlineMinutes);
      } else if (offlineDuration < 86400000) {
        setOfflineUnit("giờ");
        setOfflineTime(offlineHours);
      } else if (offlineDuration < 604800000) {
        setOfflineUnit("ngày");
        setOfflineTime(offlineDays);
      } else if (offlineDuration < 2592000000) {
        setOfflineUnit("tuần");
        setOfflineTime(offlineWeeks);
      } else if (offlineDuration < 7776000000) {
        setOfflineUnit("tháng");
        setOfflineTime(offlineMonths);
      } else {
        // Nếu thời gian offline quá 3 tháng, không hiển thị thông tin nữa
        setOfflineUnit("");
        setOfflineTime(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {offlineTime > 0 && (
        <div>
          {offlineTime} {offlineUnit}
          {offlineTime > 1}
        </div>
      )}
    </div>
  );
}
